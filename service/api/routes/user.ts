import { ListUserInjector } from '@/internal/infra/http/injector/user/list'
import { ErrorSchema } from '@/schema/shared'
import { UserSchema } from '@/schema/shared/schema'
import { OpenAPIHono, createRoute, z } from '@hono/zod-openapi'
import { Bindings } from 'hono/types'

const listUsersRoute = createRoute({
  method: 'get',
  tags: ['user'],
  path: '/',
  responses: {
    200: {
      description: 'Users retrieved successfully',
      content: {
        'application/json': {
          schema: z.array(UserSchema),
        },
      },
    },
    400: {
      content: {
        'application/json': {
          schema: ErrorSchema,
        },
      },
      description: 'Returns an error',
    },
  },
})

const userApi = new OpenAPIHono<{ Bindings: Bindings }>()

const listUserInjector = new ListUserInjector()
userApi.openapi(listUsersRoute, (c) => listUserInjector.handler().listUser(c))

export { userApi }
