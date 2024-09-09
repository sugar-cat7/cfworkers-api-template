import { instrument, ResolveConfigFn } from "@microlabs/otel-cf-workers"
import { Env } from "../env"
import { App } from "../hono";
import { trace } from "@opentelemetry/api";

const config: ResolveConfigFn = (env: Env, _trigger) => {
    return {
        exporter: {
            url: 'https://otel.baselime.io/v1',
            headers: { 'x-api-key': env.BASELIME_API_KEY },
        },
        service: { name: env.SERVICE_NAME },
    }
}

export const createHandler = (app: App) => {
    const handler = {
        fetch: async (req: Request, env: Env, executionCtx: ExecutionContext) => {
            const tracer = trace.getTracer('OTelCFWorkers:Fetcher')
            return await tracer.startActiveSpan('Exec', async (span) => {
                try {
                    const response = await app.fetch(req, env, executionCtx);
                    return response;
                } catch (error: unknown) {
                    if (error instanceof Error) {
                        span.recordException(error);
                    } else {
                        span.recordException(new Error(String(error)));
                    }
                    throw error;
                } finally {
                    span.end();
                }
            });
        },

        queue: async (
            batch: MessageBatch,
            env: Env,
            _executionContext: ExecutionContext,
        ) => {
            const tracer = trace.getTracer('OTelCFWorkers:Consumer')
            await tracer.startActiveSpan('Consume', async (span) => {
                try {
                    span.addEvent('Consume', { queue: batch.queue })
                    switch (batch.queue) {
                        case "log-queue":
                            console.log("log queue", batch);
                            await env.APP_BUCKET.put(`logs/${Date.now()}.log`, JSON.stringify(batch.messages));
                            break;
                        case "app-queue":
                            console.log("app queue", batch);
                            await fetch("https://example.com");
                            break;
                        default:
                            console.log("default queue", batch);
                            break;
                    }
                } catch (error: unknown) {
                    if (error instanceof Error) {
                        span.recordException(error);
                    } else {
                        span.recordException(new Error(String(error)));
                    }
                    throw error;
                } finally {
                    span.end();
                }
            });
        },
    } satisfies ExportedHandler<Env>;

    return instrument(handler, config);
};
