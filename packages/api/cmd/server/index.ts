import { newApp } from "../../pkg/hono/app";
import { init } from "../../pkg/middleware";
import { createHandler } from "../../pkg/otel";
import { registerUserRandomPostApi } from "../../routes/user";

const app = newApp();
app.notFound((c) => {
    return c.text('Not Found', 404)
})
app.use("*", init())

registerUserRandomPostApi(app);



export default createHandler(app);
