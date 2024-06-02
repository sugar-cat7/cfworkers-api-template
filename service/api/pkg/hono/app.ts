import { OpenAPIHono } from "@hono/zod-openapi";
import { swaggerUI } from '@hono/swagger-ui'
import { prettyJSON } from "hono/pretty-json";
import { handleError, handleZodError } from "@/pkg/errors";
import type { HonoEnv } from "./env";
import type { Context, Input } from "hono";

export const newApp = () => {
    const app = new OpenAPIHono<HonoEnv>({
        defaultHook: handleZodError,
    });

    app.use(prettyJSON());
    app.onError(handleError);

    // app.use("*", (c, next) => {
    //     return next();
    // });

    app.use('/swagger-ui')
    app.use('/doc')
    app.doc('/doc', {
        openapi: '3.1.0',
        info: {
            version: '1.0.0',
            title: 'api',
            description: 'API',
        },
    })
    app.get('/swagger-ui', swaggerUI({ url: '/doc' }))

    app.openAPIRegistry.registerComponent("securitySchemes", "bearerAuth", {
        bearerFormat: "root key",
        type: "http",
        scheme: "bearer",
    });
    return app;
}

export type App = ReturnType<typeof newApp>;
export type AppContext<P extends string = '/', I extends Input = {}> = Context<HonoEnv, P, I>
