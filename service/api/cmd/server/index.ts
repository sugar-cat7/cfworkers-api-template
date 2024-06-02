import { Env, zEnv } from "@/pkg/env";
import { newApp } from "@/pkg/hono/app";
import { registerUserPostApi } from "@/routes/user";

const app = newApp();

registerUserPostApi(app);


export default app.fetch;
