import { CustomApiError, openApiErrorResponses } from "@/pkg/errors";
import type { App, AppContext } from "@/pkg/hono/app";
import { createRoute } from "@hono/zod-openapi";
import { UserPostBodySchema, UserResponseSchema } from "./schema/http";
import { InsertUserTable, UserTableSchema } from "./schema/db";
import { v4 as uuidv4 } from 'uuid';
import { SpanStatusCode } from "@opentelemetry/api";

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

export const registerUserRandomPostApi = (app: App) =>
    app.openapi(postUserRoute, async (c: AppContext) => {
        const { db, queue, tracer } = c.get("services");
        return tracer.startActiveSpan('registerUserRandomPostApi', async (span) => {
            const validBody = UserPostBodySchema.safeParse(await c.req.json());
            if (!validBody.success) {
                throw new CustomApiError({
                    code: "BAD_REQUEST",
                    message: `Invalid parameters ${validBody.error.flatten()}`,
                });
            }

            const users: InsertUserTable[] = Array.from({ length: 10 }).map(() => ({
                id: uuidv4(),
                name: validBody.data.name ?? "",
                email: validBody.data.email ?? "",
            }));

            const dbSpan = tracer.startSpan('DB Transaction');
            const res = await db.query.transaction(async (tx) => {
                let insertedUsers: InsertUserTable[] = [];
                let i = 0;
                for (const user of users) {
                    i++;
                    const s = tracer.startSpan(`Insert User Count: ${i}`);
                    const u = await tx.insert(UserTableSchema).values(user).returning().execute();
                    if (u.length < 1) {
                        await tx.rollback();
                        return null;
                    }
                    insertedUsers.push(u[0]);
                    s.end();
                }
                return insertedUsers;
            });
            dbSpan.end();

            if (!res) {
                throw new CustomApiError({
                    code: "INTERNAL_SERVER_ERROR",
                    message: "Failed to insert users",
                });
            }

            await queue.send({ queue: "app-queue" });
            span.setStatus({ code: SpanStatusCode.OK });
            c.executionCtx.waitUntil(db.client.end());
            span.end();

            return c.json(res[0], 200);
        });
    });
