import { createRoute, z } from '@hono/zod-openapi'
import { streamText } from 'ai'
import { stream } from 'hono/streaming'
import { openApiErrorResponses } from '../pkg/errors'
import type { App, AppContext } from '../pkg/hono/app'
import { StreamRequestSchema } from './schema/http'

const postStreamRoute = createRoute({
  tags: ['stream'],
  operationId: 'streamKey',
  method: 'post' as const,
  path: '/stream',
  security: [{ bearerAuth: [] }],
  request: {
    body: {
      required: true,
      content: {
        'application/json': {
          schema: StreamRequestSchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: 'The configuration for an api',
      content: {
        'text/event-stream': {
          schema: z.any(),
        },
      },
    },
    ...openApiErrorResponses,
  },
})

export const registerStreamPostApi = (app: App) =>
  app.openapi(postStreamRoute, async (c: AppContext) => {
    const { tracer, logger, openai } = c.get('services')
    const req = StreamRequestSchema.safeParse(await c.req.json())
    if (!req.success) {
      return c.json({ error: req.error }, 400)
    }
    return tracer.startActiveSpan('postStreamRoute', async (span) => {
      return stream(
        c,
        async (stream) => {
          const result = await streamText({
            model: openai('gpt-4o-mini'),
            // prompt: 'You are AI Assistant.',
            messages: req.data.messages,
          })
          await stream.pipe(result.toDataStream())
        },
        async (err, _stream) => {
          logger.error('Error in stream', {
            error: err,
          })
        }
      ) as any
      // NOTE: as any is needed because the return type of stream is not compatible with the OpenAPI schema
      // See: https://github.com/honojs/middleware/issues/735
    })
  })
