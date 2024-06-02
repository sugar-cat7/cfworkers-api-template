import { randomUUID } from "crypto";
import { MiddlewareHandler } from "hono";
import { AppContext, HonoEnv } from "@/pkg/hono";
import { env } from 'hono/adapter'
import { type Env, zEnv } from '@/pkg/env'
import { AppLogger } from "@/pkg/logging";
import { createDB } from "../db";

export function init(): MiddlewareHandler<HonoEnv> {
    return async (c, next) => {
        const honoEnv = env<Env, AppContext>(c)
        const envResult = zEnv.safeParse(honoEnv)
        if (!envResult.success) {
            console.error('Failed to parse environment variables', envResult.error)
            process.exit(1)
        }
        const requestId = randomUUID();
        c.set("requestId", requestId);
        const logger = new AppLogger({
            env: envResult.data,
            requestId: requestId,
        });

        const { db, client } = await createDB(
            {
                host: envResult.data.DB_HOST,
                username: envResult.data.DB_USER,
                password: envResult.data.DB_PASS,
                retry: 5,
            }
        )
        c.executionCtx.waitUntil(client.end());
        c.set("services", {
            logger,
            db,
        });

        await next();
    };
}
