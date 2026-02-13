import { Elysia } from 'elysia';

export const authRoutes = new Elysia({ prefix: '/auth' })
    .post('/login', async ({ body }) => {
        // TODO: Implement login logic
        return {
            message: 'Login endpoint - to be implemented',
        };
    })
    .post('/register', async ({ body }) => {
        // TODO: Implement register logic
        return {
            message: 'Register endpoint - to be implemented',
        };
    });
