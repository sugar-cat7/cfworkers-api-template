import { createRoute } from '@hono/zod-openapi'
import { CloudflareVectorizeStore, CloudflareWorkersAIEmbeddings } from '@langchain/cloudflare'
import { openApiErrorResponses } from '../pkg/errors'
import type { App } from '../pkg/hono/app'

const postExampleAIEmbeddingsRoute = createRoute({
  tags: ['example'],
  operationId: 'exampleAIKey',
  method: 'post' as const,
  path: '/example-ai/embeddings',
  security: [{ bearerAuth: [] }],
  request: {},
  responses: {
    200: {
      description: 'The configuration for an api',
      content: {},
    },
    ...openApiErrorResponses,
  },
})

const postExampleAIRetrieveRoute = createRoute({
  tags: ['example'],
  operationId: 'exampleAIRetrieveKey',
  method: 'post' as const,
  path: '/example-ai/retrieve',
  security: [{ bearerAuth: [] }],
  request: {},
  responses: {
    200: {
      description: 'The configuration for an api',
      content: {},
    },
    ...openApiErrorResponses,
  },
})

export const registerExampleAIEmbeddingsPostApi = (app: App) =>
  app.openapi(postExampleAIEmbeddingsRoute, async (c) => {
    const { tracer, db, logger } = c.get('services')
    return tracer.startActiveSpan('postExampleAIRoute', async (span) => {
      // LangChainとの統合
      // https://js.langchain.com/v0.1/docs/integrations/vectorstores/cloudflare_vectorize/
      const embeddings = new CloudflareWorkersAIEmbeddings({
        binding: c.env.APP_AI,
        model: '@cf/baai/bge-small-en-v1.5',
      })
      const store = new CloudflareVectorizeStore(embeddings, {
        index: c.env.APP_VECTORIZE_INDEX,
      })

      const results = await store.addDocuments(
        [
          {
            pageContent:
              'The government announced new economic measures aimed at reducing inflation.',
            metadata: { title: 'Economy Update', category: 'Economy' },
          },
          {
            pageContent:
              'A new tech startup has raised $10 million in funding to develop AI tools.',
            metadata: { title: 'Tech Startup', category: 'Technology' },
          },
          {
            pageContent: 'The football team secured a 3-2 victory in the finals.',
            metadata: { title: 'Sports News', category: 'Sports' },
          },
        ],
        { ids: ['id1', 'id2', 'id3'] }
      )

      console.info(results)
      return c.json({}, 200)
    })
  })

export const registerExampleAIRetrievePostApi = (app: App) =>
  app.openapi(postExampleAIRetrieveRoute, async (c) => {
    const { tracer, db, logger } = c.get('services')
    return tracer.startActiveSpan('postExampleAIRoute', async (span) => {
      // LangChainとの統合
      // https://js.langchain.com/v0.1/docs/integrations/vectorstores/cloudflare_vectorize/
      // localではVectorizeつかえない。実際にリソースの作成の必要あり
      const embeddings = new CloudflareWorkersAIEmbeddings({
        binding: c.env.APP_AI,
        model: '@cf/baai/bge-small-en-v1.5',
      })
      const store = new CloudflareVectorizeStore(embeddings, {
        index: c.env.APP_VECTORIZE_INDEX,
      })

      const results = await store.similaritySearch('economic', 1)

      console.info(JSON.stringify(results, null, 2))
      return c.json({}, 200)
    })
  })
