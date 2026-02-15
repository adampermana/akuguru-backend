import { t } from "elysia";

const EnvModel = t.Object({
    // Node Environment
    NODE_ENV: t.Optional(
        t.Union([
            t.Literal("development"),
            t.Literal("staging"),
            t.Literal("production"),
            t.Literal("test")
        ]),
    ),

    // Server Configuration
    PORT: t.Optional(t.Number()),
    SERVER_PORT: t.Optional(t.Number()),

    // Database Configuration
    DB_HOST: t.String(),
    DB_PORT: t.String(),
    DB_USER: t.String(),
    DB_PASSWORD: t.Optional(t.String()),
    DB_NAME: t.String(),
    DATABASE_URL: t.Optional(t.String()),

    // JWT Configuration
    JWT_SECRET: t.Optional(t.String()),
    JWT_EXPIRES_IN: t.Optional(t.Union([t.String(), t.Number()]))
});

type ENV = typeof EnvModel.static;
const env = Bun.env as unknown as ENV;

export default env;
