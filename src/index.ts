import cors from '@elysiajs/cors';
import serverTiming from '@elysiajs/server-timing';
import { env } from 'bun';
import { Elysia } from 'elysia';

console.time('⌛ Startup Time');

const app = new Elysia()
  .use(serverTiming())
  .use(cors({
    origin: true,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  }))
  .get('/', () => ({
    message: 'AKU GURU API is running!',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
  }))
  // TODO: Add route modules here
  // .use(authRoutes)
  // .use(userRoutes)
  // .use(bookingRoutes)
  .listen(env.SERVER_PORT || 3000, (server) => {
    console.timeEnd("⌛ Startup Time");
    console.log(`🌱 NODE_ENV: ${env.NODE_ENV || "development"}`);
    console.log(`🍙 Bun Version: ${Bun.version}`);
    console.log(
      `🦊 Elysia.js Version: ${require("elysia/package.json").version}`,
    );
    console.log(
      `🗃️  Drizzle ORM Version: ${require("drizzle-orm/package.json").version}`,
    );
    console.log(`🚀 Server is running at ${server.url}`);
    console.log("--------------------------------------------------");
  });
