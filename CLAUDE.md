# CLAUDE.md

Guidance for Claude Code when working in this repository.

## What this is

Apeksha's personal portfolio: a single-page React 19 + Vite 7 site with an
"Ask About Apeksha" chatbot. See `README.md` for user-facing setup and
`docs/SPEC.md` for the product spec and roadmap.

## Commands

```bash
npm install
npm run dev       # http://localhost:5173 (also serves /api/chat via vite.config.js)
npm run build     # outputs dist/
npm run preview   # serve the production build
```

There is no test runner or linter configured. Verify changes with
`npm run build` and by checking the page in `npm run dev`.

## Architecture

- `src/data/profile.js`, `src/data/projects.js` — the single source of truth for
  all personal content. Components and the chatbot both read from here.
- `src/data/knowledge.js` — `buildKnowledge()` packages the data for the AI
  chatbot, stripping placeholders and empty fields.
- `src/services/chatbot.js` — `askAssistant()` calls `/api/chat` when
  `VITE_AI_CHAT=true`, otherwise (or on any failure) uses the rule-based
  `answerLocally()`.
- `api/chat.js` — serverless handler (Vercel in prod; mounted by the `devApi`
  plugin in `vite.config.js` during dev). Calls Claude via `@anthropic-ai/sdk`.
- `src/components/` — one component per section; `Section.jsx` is the shared
  wrapper. All styles live in `src/index.css` (theme tokens at the top).

## Rules

- **Never invent facts about Apeksha.** Only state what is in `src/data/`. If the
  chatbot can't answer from the data it must return `UNKNOWN_ANSWER`.
- Her major is **Digital Transformation**, minor **Data Science** — never describe
  her as an AI/ML major.
- Values of `''` or `YOUR_..._HERE` mean "not set"; use `isSet()` from
  `profile.js` and keep them hidden on the page and in chatbot answers.
- `ANTHROPIC_API_KEY` is server-only. Never prefix it with `VITE_`, never import
  it in `src/`, and never commit `.env`.
- Keep `UNKNOWN_ANSWER` identical in `api/chat.js` and `src/services/chatbot.js`.
- When adding a project, fill every field in `projects.js` (including
  `keywords`, which the local chatbot uses to match questions).
- Match the existing style: plain JS/JSX (no TypeScript), no semicolons, single
  quotes, 2-space indent, short explanatory header comments.
