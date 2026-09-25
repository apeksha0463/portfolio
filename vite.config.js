import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// Serves api/chat.js during `npm run dev`, the same way Vercel serves it in
// production. Server-only keys from .env (like ANTHROPIC_API_KEY) are loaded
// into process.env here and are never bundled into the frontend.
function devApi() {
  return {
    name: 'dev-api',
    configureServer(server) {
      Object.assign(process.env, loadEnv(server.config.mode, process.cwd(), ''))
      server.middlewares.use('/api/chat', async (req, res) => {
        let raw = ''
        for await (const chunk of req) raw += chunk
        try {
          req.body = raw ? JSON.parse(raw) : {}
        } catch {
          req.body = {}
        }
        const { default: handler } = await server.ssrLoadModule('/api/chat.js')
        await handler(req, res)
      })
    },
  }
}

export default defineConfig({
  plugins: [react(), devApi()],
})
