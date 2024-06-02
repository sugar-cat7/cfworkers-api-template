
import { z } from '@hono/zod-openapi'

const UserResponseSchema = z.object({
    id: z.string().uuid().openapi({
        example: '123e4567-e89b-12d3-a456-426614174000',
        description: 'User ID',
    }),
    name: z.string().openapi({
        example: 'User Name',
        description: 'User Name',
    }),
    email: z.string().email().openapi({
        example: 'example@example.com',
        description: 'User Email',
    }),
})

const UserGetParamSchema = z.object({
    id: z
        .string()
        .uuid()
        .openapi({
            description: 'User ID',
            example: '123e4567-e89b-12d3-a456-426614174000',
            param: {
                name: 'id',
                in: 'path',
            },
        }),
})

const UserPostBodySchema = z.object({
    name: z.string().openapi({
        description: 'User Name',
        example: '',
    }),
    email: z
        .string()
        .email()
        .openapi({
            description: 'User Email',
            example: '',
        }),
})

const UserPutBodySchema = z.object({
    email: z
        .string()
        .email()
        .openapi({
            description: 'User Email',
            example: '',
        }),
})

type UserResponse = z.infer<typeof UserResponseSchema>
type UserGetParam = z.infer<typeof UserGetParamSchema>
type UserPostBody = z.infer<typeof UserPostBodySchema>
type UserPutBody = z.infer<typeof UserPutBodySchema>

export { UserResponseSchema, UserGetParamSchema, UserPostBodySchema, UserPutBodySchema, UserResponse, UserGetParam, UserPostBody, UserPutBody }

