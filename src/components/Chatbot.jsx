import { useEffect, useRef, useState } from 'react'
import { askAssistant, SUGGESTED_QUESTIONS } from '../services/chatbot.js'
import { ChatIcon, CloseIcon, SendIcon, TrashIcon } from './Icons.jsx'

const WELCOME = {
  role: 'assistant',
  content: "Hi! I'm Apeksha's portfolio assistant. Ask me about her education, skills, projects, experience or how to contact her.",
}

// Turns URLs in a message into clickable links.
function MessageText({ text }) {
  // Trailing punctuation (e.g. "…/repo.") is kept out of the link.
  const parts = text.split(/(https?:\/\/[^\s)]*[^\s).,])/g)
  return parts.map((part, i) =>
    /^https?:\/\//.test(part) ? (
      <a key={i} href={part} target="_blank" rel="noreferrer">
        {part}
      </a>
    ) : (
      part
    ),
  )
}

export default function Chatbot() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([WELCOME])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const listRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, typing])

  useEffect(() => {
    if (open) inputRef.current?.focus()
  }, [open])

  // Esc closes the chat window.
  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  async function send(question) {
    const text = question.trim()
    if (!text || typing) return
    // History sent to the AI mode: everything after the welcome message.
    const history = messages.slice(1)
    setMessages((m) => [...m, { role: 'user', content: text }])
    setInput('')
    setTyping(true)
    try {
      const reply = await askAssistant(text, history)
      setMessages((m) => [...m, { role: 'assistant', content: reply }])
    } finally {
      setTyping(false)
    }
  }

  const showSuggestions = messages.length === 1 && !typing

  return (
    <div className="chatbot">
      {open && (
        <div className="chat-window" role="dialog" aria-label="Ask About Apeksha chat">
          <div className="chat-header">
            <div>
              <p className="chat-title">Ask About Apeksha</p>
              <p className="chat-subtitle">Answers come from this portfolio</p>
            </div>
            <div className="chat-header-actions">
              <button
                className="icon-button"
                onClick={() => setMessages([WELCOME])}
                aria-label="Clear chat"
                title="Clear chat"
                disabled={typing}
              >
                <TrashIcon />
              </button>
              <button className="icon-button" onClick={() => setOpen(false)} aria-label="Close chat" title="Close">
                <CloseIcon />
              </button>
            </div>
          </div>

          <div className="chat-messages" ref={listRef} aria-live="polite">
            {messages.map((message, i) => (
              <div key={i} className={`chat-message ${message.role}`}>
                <MessageText text={message.content} />
              </div>
            ))}
            {typing && (
              <div className="chat-message assistant typing" aria-label="Assistant is typing">
                <span />
                <span />
                <span />
              </div>
            )}
            {showSuggestions && (
              <div className="chat-suggestions">
                {SUGGESTED_QUESTIONS.map((q) => (
                  <button key={q} className="suggestion" onClick={() => send(q)}>
                    {q}
                  </button>
                ))}
              </div>
            )}
          </div>

          <form
            className="chat-input"
            onSubmit={(e) => {
              e.preventDefault()
              send(input)
            }}
          >
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask a question…"
              aria-label="Your question"
              maxLength={500}
            />
            <button type="submit" className="icon-button send-button" aria-label="Send" disabled={!input.trim() || typing}>
              <SendIcon />
            </button>
          </form>
        </div>
      )}

      <button
        className={`chat-toggle ${open ? 'is-open' : ''}`}
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-label={open ? 'Close Ask About Apeksha chat' : 'Open Ask About Apeksha chat'}
      >
        {open ? <CloseIcon /> : <ChatIcon />}
        <span className="chat-toggle-label">Ask About Apeksha</span>
      </button>
    </div>
  )
}
