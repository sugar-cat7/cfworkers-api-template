import { createOpenAI } from '@ai-sdk/openai'
import { streamText } from 'ai'
import { Hono } from 'hono'
import { stream } from 'hono/streaming'
import { handle } from 'hono/vercel'

export const runtime = 'edge'

const openai = createOpenAI({
  compatibility: 'strict',
  organization: process.env.OPENAI_ORG,
  project: process.env.OPENAI_PROJECT,
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: process.env.OPENAI_BASE_URL,
})

const app = new Hono().basePath('/api')

app.post('/stream', async (c) => {
  const r = await c.req.json()
  return stream(c, async (stream) => {
    const result = await streamText({
      model: openai('gpt-4o-mini'),
      messages: r.messages,
    })
    await stream.pipe(result.toDataStream())
  })
})

export const GET = handle(app)
export const POST = handle(app)
