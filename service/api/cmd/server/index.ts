import { swaggerUI } from '@hono/swagger-ui'
import { OpenAPIHono } from '@hono/zod-openapi'
import { userApi } from '@/routes'

type Bindings = {
  DB: D1Database
}

const app = new OpenAPIHono<{ Bindings: Bindings }>()

app.route('/users', userApi)
app.doc('/doc', {
  openapi: '3.0.0',
  info: {
    version: '1.0.0',
    title: 'app-api',
    description: 'App API',
  },
})
app.get('/swagger-ui', swaggerUI({ url: '/doc' }))

export default app
