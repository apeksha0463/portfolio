# Portfolio — Plan & Spec

## Goal

A personal portfolio that lets recruiters and visitors quickly understand who
Apeksha is, what she has built, and how to reach her — plus a chatbot that
answers questions about her using only verified portfolio data.

## Audience

- Recruiters and hiring managers screening candidates
- Peers and collaborators curious about her projects

## Scope

### Sections

| Section | Content | Source |
|---|---|---|
| Home | Name, headline, intro, calls to action | `profile.js` |
| About | Short bio paragraphs and interests | `profile.js` |
| Education | BTech in Digital Transformation, Minor in Data Science; college and graduation year optional | `profile.education` |
| Skills | Grouped: Programming, Data Science & ML, Development, Tools | `profile.skills` |
| Projects | Cards with a detail view (overview, problem, solution, tech, features, GitHub) | `projects.js` |
| Experience | Title, organisation, period, summary, areas, related project | `profile.experience` |
| Contact | Email, LinkedIn, GitHub, resume | `profile.contact`, `profile.resumeUrl` |

### Featured projects

1. E-Commerce AI Chatbot — WhatsApp shopping bot (Spring Boot)
2. Vazraa Website — mobility / cab booking platform
3. Vazraa Chatbot — WhatsApp assistant for Vazraa
4. Fraud Detection — machine learning anomaly detection

## "Ask About Apeksha" chatbot

### Requirements

- Answer only from `profile.js` and `projects.js`; never invent facts.
- Unknown questions get a fixed reply: *"I don't have that information about
  Apeksha. You can explore the portfolio or contact her directly."*
- Short, friendly, professional answers; include GitHub links for projects.
- Suggested starter questions; clear-chat button; Esc closes the window.
- Works with zero setup and zero cost.

### Design

- **Local mode (default):** rule-based topic matching in
  `src/services/chatbot.js` (projects → resume/contact → education →
  experience → technologies → skills → projects list → interests → about).
- **AI mode (opt-in):** `VITE_AI_CHAT=true` routes to `api/chat.js`, which sends
  the sanitized data from `buildKnowledge()` to Claude with a strict system
  prompt. History is capped at 10 turns and 500 chars per message.
- **Fallback:** any AI error, missing key or refusal falls back to local mode or
  the unknown-answer reply.
- **Security:** the API key lives only on the server; `.env` is git-ignored.

## Non-functional requirements

- Responsive down to phone width; accessible (skip link, ARIA labels, keyboard use)
- Content edits require touching only `src/data/`
- Placeholder / empty fields stay hidden everywhere
- Deployable on Vercel (full) or any static host (local chatbot only)

## Tech stack

React 19, Vite 7, plain CSS, `@anthropic-ai/sdk` in a Vercel serverless function.

## Status & next steps

- [x] All sections and project detail views
- [x] Local chatbot and optional AI mode with fallback
- [ ] Add real email and LinkedIn in `profile.contact`
- [ ] Add resume PDF at `public/resume.pdf` and set `resumeUrl`
- [ ] Add college, graduation year and experience organisation/dates
- [ ] Deploy to Vercel and set environment variables for AI mode
