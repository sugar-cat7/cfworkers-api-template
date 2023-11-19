import { z } from '@hono/zod-openapi'

const UserSchema = z
  .object({
    id: z.string().openapi({
      example: '789',
    }),
    name: z.string().openapi({
      example: 'User Name',
    }),
    email: z.string().openapi({
      example: 'hoge@gmai.com',
    }),
  })
  .openapi('User')

export { UserSchema }
