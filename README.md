# Apeksha — Portfolio

A personal portfolio built with React and Vite. It has sections for Home, About, Education, Skills, Projects (with detail views), Experience, Contact, and an **"Ask About Apeksha"** chatbot.

## Run it

Requires Node.js 18 or newer.

```bash
npm install        # first time only
npm run dev        # start at http://localhost:5173
npm run build      # production build into dist/
npm run preview    # serve the production build locally
```

## Edit your information

All personal content lives in `src/data/`. You don't need to touch the components.

| What | Where |
|---|---|
| Name, intro, About text, interests | `src/data/profile.js` |
| Education (add college / graduation year if you want them shown) | `profile.education` in `src/data/profile.js` |
| Skills | `profile.skills` in `src/data/profile.js` |
| Experience (add organisation and dates when ready) | `profile.experience` in `src/data/profile.js` |
| **Email** | `profile.contact.email` (replace `YOUR_EMAIL_HERE`) |
| **LinkedIn** | `profile.contact.linkedin` (replace `YOUR_LINKEDIN_URL_HERE`) |
| **Resume** | Put your PDF at `public/resume.pdf`, then set `resumeUrl: '/resume.pdf'` |
| Projects | `src/data/projects.js` |

Fields left empty or still set to `YOUR_..._HERE` stay hidden, both on the page and in the chatbot. The site and the chatbot read the same files, so an edit shows up in both.

## How the chatbot works

`src/services/chatbot.js` answers questions using only `profile.js` and `projects.js`.

- **Local mode (default, free, no setup).** The question is matched to a topic, such as education, skills, a specific project, contact or experience, and the answer is built from the data files. For example, "Does she know React?" is checked against the skills and project technologies. Anything not in the data gets: *"I don't have that information about Apeksha…"*
- **AI mode (optional).** Set `VITE_AI_CHAT=true` and questions go to `api/chat.js`, a server function that asks Claude. Claude receives your portfolio data and instructions not to invent anything. The API key stays on the server and is never sent to the browser. If the AI call fails for any reason, the local mode answers instead.

### Turn on AI mode

1. Copy `.env.example` to `.env`.
2. Set `VITE_AI_CHAT=true` and `ANTHROPIC_API_KEY=<your key>` (from https://console.anthropic.com/).
3. Restart `npm run dev`.

`.env` is in `.gitignore`, so never commit it. Every AI answer is a paid API call. The default model is `claude-opus-5`; you can change it with `CHAT_MODEL`.

## Deploy (Vercel, recommended)

1. Push this folder to a GitHub repository. `.env` is ignored automatically.
2. On https://vercel.com, choose **Add New → Project** and import the repo. Vercel detects Vite on its own.
3. *(Optional, for AI mode)* Under **Settings → Environment Variables**, add `ANTHROPIC_API_KEY` and `VITE_AI_CHAT=true`, then redeploy.

Vercel serves the site from `dist/` and runs `api/chat.js` as a serverless function.

**Netlify / GitHub Pages:** the static site works as-is (build command `npm run build`, output `dist`). The chatbot works in local mode. AI mode needs a host that runs `api/chat.js`, such as Vercel.

## Project structure

```
api/chat.js              Server function for the optional AI chatbot
src/
  data/profile.js        Your personal info (edit me)
  data/projects.js       Project details (edit me)
  data/knowledge.js      Packages the data for the AI chatbot
  services/chatbot.js    Chatbot logic (local answers + AI call)
  components/            Navbar, Home, About, Education, Skills, Projects,
                         ProjectCard, ProjectDetails, Experience, Contact,
                         Chatbot, Footer, Section, Icons
  index.css              All styles; theme colours at the top
```
