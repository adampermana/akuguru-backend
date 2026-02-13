import { t } from "elysia";
const EnvModel = t.Object({
    // node env
    NODE_ENV: t.Optional(
        t.Union([
            t.Literal("development"),
            t.Literal("staging"),
            t.Literal("production"),
            t.Literal("test")
        ]),
    ),
    SERVER_PORT: t.Number(),
    DATABASE_URL: t.String(),
    JWT_SECRET: t.String(),
    JWT_EXPIRES_IN: t.Union([t.String(), t.Number()])


})
type ENV = typeof EnvModel.static;
const env = Bun.env as unknown as ENV;
export default env;
