import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const apiKey = env.GEMINI_API_KEY || env.VITE_GEMINI_API_KEY

  return {
    plugins: [
      react(),
      {
        name: 'dev-chat-proxy',
        configureServer(server) {
          server.middlewares.use('/api/chat', async (req, res) => {
            if (req.method !== 'POST') {
              res.statusCode = 405
              return res.end(JSON.stringify({ error: 'Method not allowed' }))
            }

            let bodyStr = ''
            req.on('data', chunk => { bodyStr += chunk })
            req.on('end', async () => {
              try {
                const body = JSON.parse(bodyStr)
                const keyToUse = apiKey || process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY

                if (!keyToUse) {
                  res.statusCode = 500
                  return res.end(JSON.stringify({ error: 'GEMINI_API_KEY not configured in environment' }))
                }

                const geminiRes = await fetch(
                  `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash-lite:generateContent?key=${keyToUse}`,
                  {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                      contents: body.contents,
                      systemInstruction: body.systemInstruction,
                      generationConfig: { maxOutputTokens: 500, temperature: 0.6 }
                    })
                  }
                )

                const data = await geminiRes.text()
                res.writeHead(geminiRes.status, { 'Content-Type': 'application/json' })
                res.end(data)
              } catch (err) {
                res.statusCode = 500
                res.end(JSON.stringify({ error: 'Internal server error', details: String(err) }))
              }
            })
          })
        }
      }
    ]
  }
})

