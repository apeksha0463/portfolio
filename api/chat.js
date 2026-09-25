// ---------------------------------------------------------------------------
// POST /api/chat — optional AI answers for the "Ask About Apeksha" chatbot.
//
// Runs on the server (a Vercel serverless function in production, and the
// Vite dev server locally), so ANTHROPIC_API_KEY never reaches the browser.
// The frontend only calls this when VITE_AI_CHAT=true, and falls back to the
// local answer engine if this returns an error.
// ---------------------------------------------------------------------------

import Anthropic from '@anthropic-ai/sdk'
import { buildKnowledge } from '../src/data/knowledge.js'

const MODEL = process.env.CHAT_MODEL || 'claude-opus-5'
const MAX_HISTORY = 10
const MAX_MESSAGE_LENGTH = 500

const UNKNOWN_ANSWER =
  "I don't have that information about Apeksha. You can explore the portfolio or contact her directly."

const SYSTEM_PROMPT = `You are Apeksha's portfolio assistant on her personal portfolio website. Visitors are mostly recruiters and people curious about her work.

Answer questions only using the information in the portfolio data below. Never invent projects, qualifications, technologies, companies, achievements, dates, grades or experience. If the answer is not in the data, reply exactly: "${UNKNOWN_ANSWER}"

Apeksha's major is Digital Transformation and her minor is Data Science. Never describe her as an AI/ML major.

Keep answers short (usually 2–5 sentences or a brief list), friendly and professional. Write plain text — no Markdown headings or tables. Include the relevant GitHub link when talking about a project. Politely decline requests unrelated to Apeksha.

<portfolio_data>
${JSON.stringify(buildKnowledge(), null, 2)}
</portfolio_data>`

// Keep only well-formed, alternating user/assistant turns, ending with the user.
function cleanMessages(raw) {
  if (!Array.isArray(raw)) return []
  const messages = raw
    .filter((m) => (m?.role === 'user' || m?.role === 'assistant') && typeof m.content === 'string' && m.content.trim())
    .slice(-MAX_HISTORY)
    .map((m) => ({ role: m.role, content: m.content.slice(0, MAX_MESSAGE_LENGTH) }))
  while (messages.length && messages[0].role !== 'user') messages.shift()
  const alternating = messages.filter((m, i) => i === 0 || m.role !== messages[i - 1].role)
  return alternating.at(-1)?.role === 'user' ? alternating : []
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.statusCode = 405
    return res.end(JSON.stringify({ error: 'Method not allowed' }))
  }
  res.setHeader('Content-Type', 'application/json')

  if (!process.env.ANTHROPIC_API_KEY) {
    res.statusCode = 503
    return res.end(JSON.stringify({ error: 'AI chat is not configured' }))
  }

  const messages = cleanMessages(req.body?.messages)
  if (!messages.length) {
    res.statusCode = 400
    return res.end(JSON.stringify({ error: 'Send at least one user message' }))
  }

  try {
    const client = new Anthropic()
    const response = await client.beta.messages.create({
      model: MODEL,
      max_tokens: 2000,
      output_config: { effort: 'low' },
      betas: ['server-side-fallback-2026-07-01'],
      fallbacks: 'default',
      system: SYSTEM_PROMPT,
      messages,
    })

    if (response.stop_reason === 'refusal') {
      return res.end(JSON.stringify({ reply: UNKNOWN_ANSWER }))
    }
    const reply = response.content
      .filter((block) => block.type === 'text')
      .map((block) => block.text)
      .join('')
      .trim()
    return res.end(JSON.stringify({ reply: reply || UNKNOWN_ANSWER }))
  } catch (error) {
    if (error instanceof Anthropic.AuthenticationError) {
      console.error('[api/chat] Invalid ANTHROPIC_API_KEY')
    } else if (error instanceof Anthropic.RateLimitError) {
      console.error('[api/chat] Rate limited by the Claude API')
    } else if (error instanceof Anthropic.APIError) {
      console.error(`[api/chat] Claude API error ${error.status}: ${error.message}`)
    } else {
      console.error('[api/chat] Unexpected error:', error)
    }
    res.statusCode = 502
    return res.end(JSON.stringify({ error: 'AI chat is unavailable right now' }))
  }
}
