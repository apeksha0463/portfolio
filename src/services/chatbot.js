// ---------------------------------------------------------------------------
// "Ask About Apeksha" chatbot service.
//
// Two ways to answer, both using ONLY the data in src/data:
//   1. Local mode (default, no API key): matches the question to a topic and
//      builds the answer from profile.js / projects.js.
//   2. AI mode (optional): when VITE_AI_CHAT=true, questions go to the
//      /api/chat server function, which asks Claude with the same data.
//      If that call fails for any reason, local mode answers instead.
// ---------------------------------------------------------------------------

import { profile, isSet } from '../data/profile.js'
import { projects } from '../data/projects.js'

export const UNKNOWN_ANSWER =
  "I don't have that information about Apeksha. You can explore the portfolio or contact her directly."

export const SUGGESTED_QUESTIONS = [
  'Tell me about Apeksha',
  'Show me her projects',
  'What are her skills?',
  'Tell me about the fraud detection project',
]

const AI_ENABLED = import.meta.env.VITE_AI_CHAT === 'true'

export async function askAssistant(question, history = []) {
  if (AI_ENABLED) {
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...history, { role: 'user', content: question }] }),
      })
      if (res.ok) {
        const data = await res.json()
        if (data.reply) return data.reply
      }
    } catch {
      // Network or server problem — fall through to the local answer.
    }
  }
  // Small delay so the typing indicator is visible in local mode.
  await new Promise((resolve) => setTimeout(resolve, 350))
  return answerLocally(question)
}

// ---------------------------------------------------------------------------
// Local answer engine
// ---------------------------------------------------------------------------

const has = (text, pattern) => pattern.test(text)
const list = (items) => items.map((item) => `• ${item}`).join('\n')

// Every skill and project technology, so "Does she know React?" can be checked.
function knownTechnologies() {
  const terms = new Map()
  const add = (label, source) => {
    // "TensorFlow / Keras" → also match "tensorflow" and "keras" on their own.
    const parts = [label, ...label.split(/\s*\/\s*|\s*\(\s*|\)\s*/)]
    for (const part of parts) {
      const key = part.toLowerCase().replace(/\s+\d+$/, '').trim()
      if (key.length < 2) continue
      if (!terms.has(key)) terms.set(key, { label: part.trim(), sources: new Set() })
      terms.get(key).sources.add(source)
    }
  }
  profile.skills.forEach((group) => group.items.forEach((item) => add(item, 'skills')))
  projects.forEach((p) => p.technologies.forEach((t) => add(t, p.name)))
  return terms
}
const TECH_TERMS = knownTechnologies()

function mentionedTechnologies(text) {
  const found = []
  for (const [key, info] of TECH_TERMS) {
    const escaped = key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    if (new RegExp(`(^|[^a-z])${escaped}([^a-z]|$)`).test(text)) found.push(info)
  }
  // Prefer the longest match ("node.js" over "js").
  return found.sort((a, b) => b.label.length - a.label.length)
}

function findProjects(text) {
  if (text.includes('vazraa')) {
    if (has(text, /chat|bot|whatsapp/)) return [byId('vazraa-chatbot')]
    if (has(text, /web|site/)) return [byId('vazraa-website')]
    return [byId('vazraa-website'), byId('vazraa-chatbot')]
  }
  return projects.filter(
    (p) => text.includes(p.name.toLowerCase()) || p.keywords.some((k) => text.includes(k)),
  )
}
const byId = (id) => projects.find((p) => p.id === id)

function describeProject(project, text) {
  if (has(text, /tech|stack|built with|language|framework|tools?\b/)) {
    return `${project.name} uses: ${project.technologies.join(', ')}.\n\nCode: ${project.github}`
  }
  if (has(text, /problem|why|solve|solution|approach/)) {
    return `Problem: ${project.problem}\n\nSolution: ${project.solution}`
  }
  if (has(text, /feature|do\b|does|function/)) {
    return `Main features of ${project.name}:\n${list(project.features)}\n\nCode: ${project.github}`
  }
  if (has(text, /github|repo|code|link|source/)) {
    return `The ${project.name} code is on GitHub: ${project.github}`
  }
  return `${project.name}: ${project.overview}\n\nTechnologies: ${project.technologies.join(', ')}.\n\nCode: ${project.github}`
}

function contactAnswer() {
  const { email, linkedin, github } = profile.contact
  const lines = []
  if (isSet(email)) lines.push(`Email: ${email}`)
  if (isSet(linkedin)) lines.push(`LinkedIn: ${linkedin}`)
  lines.push(`GitHub: ${github}`)
  return `You can reach Apeksha here:\n${lines.join('\n')}\n\nThe Contact section at the bottom of the page has the same links.`
}

function educationAnswer(text) {
  const { degree, major, minor, college, graduationYear } = profile.education
  if (has(text, /gpa|cgpa|grade|marks|score/)) return UNKNOWN_ANSWER
  if (has(text, /college|university|institute|school/)) {
    return isSet(college) ? `Apeksha studies at ${college}.` : UNKNOWN_ANSWER
  }
  if (has(text, /graduat|year|when/)) {
    return isSet(graduationYear) ? `Apeksha expects to graduate in ${graduationYear}.` : UNKNOWN_ANSWER
  }
  if (has(text, /minor/) && !has(text, /major/)) return `Apeksha's minor is ${minor}.`
  if (has(text, /major/) && !has(text, /minor/)) {
    return `Apeksha's major is ${major} — she is pursuing a ${degree} in ${major}.`
  }
  return `Apeksha is pursuing a ${degree} in ${major} with a Minor in ${minor}.`
}

function skillsAnswer(text) {
  const group = profile.skills.find((g) => {
    const name = g.category.toLowerCase()
    return (
      (has(text, /programming|languages?/) && name === 'programming') ||
      (has(text, /data|machine learning|\bml\b|\bai\b/) && name.startsWith('data')) ||
      (has(text, /develop|web|backend|frontend|framework/) && name === 'development') ||
      (has(text, /tool/) && name === 'tools')
    )
  })
  if (group) return `${group.category}: ${group.items.join(', ')}.`
  return (
    "Here are Apeksha's skills:\n\n" +
    profile.skills.map((g) => `${g.category}: ${g.items.join(', ')}`).join('\n\n')
  )
}

function techMentionAnswer(tech) {
  const sources = [...tech.sources]
  const inSkills = sources.includes('skills')
  const inProjects = sources.filter((s) => s !== 'skills')
  const parts = []
  if (inSkills) parts.push(`${tech.label} is listed in Apeksha's skills.`)
  if (inProjects.length) parts.push(`She used it in: ${inProjects.join(', ')}.`)
  return parts.join(' ')
}

function experienceAnswer() {
  return profile.experience
    .map((e) => {
      const heading = [e.title, e.organization, e.period].filter(isSet).join(' · ')
      const related = e.relatedProject && byId(e.relatedProject)
      return (
        `${heading}\n${e.summary}\n\nAreas covered:\n${list(e.areas)}` +
        (related ? `\n\nRelated project: ${related.name} (${related.github})` : '')
      )
    })
    .join('\n\n')
}

function projectsAnswer() {
  return (
    "Apeksha's main projects:\n\n" +
    projects.map((p) => `• ${p.name} — ${p.summary}`).join('\n') +
    '\n\nAsk me about any of them for more detail.'
  )
}

function aboutAnswer() {
  const { degree, major, minor } = profile.education
  return (
    `${profile.name} is a ${degree} ${major} student with a Minor in ${minor}. ` +
    `Her interests include ${profile.interests.slice(0, -2).join(', ').toLowerCase()} and ${profile.interests.at(-2).toLowerCase()}. ` +
    `She builds projects to gain practical technical experience — ${projects.length} of them are featured on this portfolio.\n\n` +
    'Ask me about her skills, projects or experience to learn more.'
  )
}

export function answerLocally(question) {
  const text = question.toLowerCase().replace(/[’']/g, "'").trim()
  if (!text) return UNKNOWN_ANSWER

  // A specific project always wins, e.g. "What tech does the Vazraa website use?"
  const matched = findProjects(text)
  if (matched.length === 1) return describeProject(matched[0], text)
  if (matched.length > 1) {
    return matched.map((p) => `• ${p.name} — ${p.summary}\n  ${p.github}`).join('\n\n')
  }

  if (has(text, /resume|\bcv\b/)) {
    return isSet(profile.resumeUrl)
      ? `You can download Apeksha's resume here: ${new URL(profile.resumeUrl, window.location.origin).href}`
      : "Apeksha's resume isn't on this site yet. You can contact her directly to request it."
  }
  const { email, linkedin } = profile.contact
  if (has(text, /linkedin/) && !isSet(linkedin)) {
    return `Apeksha's LinkedIn hasn't been added to this portfolio yet. ${contactAnswer()}`
  }
  if (has(text, /e-?mail/) && !isSet(email)) {
    return `Apeksha's email hasn't been added to this portfolio yet. ${contactAnswer()}`
  }
  if (has(text, /contact|reach|e-?mail|linkedin|hire|get in touch|connect with/)) return contactAnswer()
  if (has(text, /github|repositor|\brepos?\b|source code/)) {
    return `Apeksha's GitHub profile: ${profile.contact.github}`
  }
  if (has(text, /stud|education|degree|major|minor|college|university|btech|b\.tech|course|graduat|gpa|cgpa/)) {
    return educationAnswer(text)
  }
  if (has(text, /experience|intern|training|trained|worked|work history|job/)) return experienceAnswer()

  // "Does she know React?" / "Has she used Docker?"
  const techs = mentionedTechnologies(text)
  if (techs.length) return techMentionAnswer(techs[0])
  if (has(text, /skill|technolog|tech stack|stack|languages?|tools?\b|frameworks?|what .*(know|use)/)) {
    return skillsAnswer(text)
  }
  // Asking about a specific technology that isn't in her data.
  if (has(text, /does she (know|use)|has she used|can she|experience with|familiar with/)) {
    return UNKNOWN_ANSWER
  }
  if (has(text, /project|built|build|made|portfolio work/)) return projectsAnswer()
  if (has(text, /interest|passion|focus/)) {
    return `Apeksha is interested in: ${profile.interests.join(', ')}.`
  }
  if (has(text, /\bwho\b|introduc|background|about (apeksha|her|yourself)\s*[?.!]*$|^about\b/)) {
    return aboutAnswer()
  }
  if (has(text, /^(hi|hello|hey|good (morning|afternoon|evening))\b/)) {
    return "Hi! I can answer questions about Apeksha's education, skills, projects, experience and contact details. What would you like to know?"
  }
  if (has(text, /^(thanks|thank you|thx)/)) return "You're welcome! Feel free to ask anything else about Apeksha."

  return UNKNOWN_ANSWER
}
