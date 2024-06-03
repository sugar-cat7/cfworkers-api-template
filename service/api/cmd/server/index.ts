import { Env } from "@/pkg/env";
import { newApp } from "@/pkg/hono/app";
import { init } from "@/pkg/middleware";
import { registerUserPostApi } from "@/routes/user";

const app = newApp();
app.use("*", init())

registerUserPostApi(app);


export default {
    fetch(request: Request, env: Env, ctx: ExecutionContext) {

        return app.fetch(request, env, ctx)
    },
}
