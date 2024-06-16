import { v4 as uuidv4 } from 'uuid'
import { MiddlewareHandler } from "hono";
import { AppContext, HonoEnv } from "@/pkg/hono";
import { env } from 'hono/adapter'
import { type Env, zEnv } from '@/pkg/env'
import { AppLogger } from "@/pkg/logging";
import { createDB } from "../db";
import { trace } from '@opentelemetry/api';

export function init(): MiddlewareHandler<HonoEnv> {
    return async (c, next) => {
        const honoEnv = env<Env, AppContext>(c)
        const envResult = zEnv.safeParse(honoEnv)
        if (!envResult.success) {
            console.error('Failed to parse environment variables', envResult.error)
            process.exit(1)
            return
        }
        const requestId = uuidv4();
        c.set("requestId", requestId);
        const logger = new AppLogger({
            env: envResult.data,
            requestId: requestId,
        });

        const db = await createDB(
            {
                connectionString: envResult.data.HYPERDRIVE.connectionString,
                retry: 5,
            }
        )
        await envResult.data.LOG_QUEUE.send({
            queue: "log-queue",
            url: c.req.raw.url,
            method: c.req.raw.method,
            headers: Object.fromEntries(c.req.raw.headers),
        })
        c.set("services", {
            logger: logger,
            db: db,
            queue: envResult.data.APP_QUEUE,
            tracer: trace.getTracer('OTelCFWorkers:Fetcher')
        });

        logger.info("[Request started]");
        await next();
    };
}
