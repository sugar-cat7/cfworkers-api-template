import { CustomApiError, openApiErrorResponses } from "@/pkg/errors";
import type { App, AppContext } from "@/pkg/hono/app";
import { createRoute } from "@hono/zod-openapi";
import { UserPostBodySchema, UserResponseSchema } from "./schema/http";
import { InsertUserTable, UserTableSchema } from "./schema/db";
import { randomUUID } from "crypto";

const postUserRoute = createRoute({
    tags: ["user"],
    operationId: "userKey",
    method: "post" as const,
    path: "/users",
    security: [{ bearerAuth: [] }],
    request: {
        body: {
            required: true,
            content: {
                "application/json": {
                    schema: UserPostBodySchema,
                },
            },
        },
    },
    responses: {
        200: {
            description: "The configuration for an api",
            content: {
                "application/json": {
                    schema: UserResponseSchema,
                },
            },
        },
        ...openApiErrorResponses,
    },
});


export const registerUserPostApi = (app: App) =>
    app.openapi(postUserRoute, async (c: AppContext) => {
        const validBody = UserPostBodySchema.safeParse(await c.req.json())
        if (!validBody.success) {
            throw new CustomApiError({
                code: "BAD_REQUEST",
                message: `Invalid parameters ${validBody.error.flatten()}`,
            })
        }
        const { db } = c.get("services");

        const i: InsertUserTable = {
            id: randomUUID(),
            name: validBody.data.name ?? "",
            email: validBody.data.email ?? "",
        }

        const res = await db.transaction(async (tx) => {
            const q = await tx.insert(UserTableSchema).values(i).returning().execute();
            if (q.length < 1) {
                await tx.rollback();
                return
            }
            return q.at(0);
        });

        if (!res) {
            throw new CustomApiError({
                code: "INTERNAL_SERVER_ERROR",
                message: "Failed to insert user",
            })
        }

        return c.json({
            id: res.id,
            name: res.name,
            email: res.email,
        }, 200);
    });
