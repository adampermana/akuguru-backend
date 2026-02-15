import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import env from '../helpers/env';
import * as schema from './schema';

// Create MySQL connection pool
const poolConnection = mysql.createPool({
    host: env.DB_HOST,
    port: Number(env.DB_PORT),
    user: env.DB_USER,
    password: env.DB_PASSWORD || '',
    database: env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});

// Create Drizzle instance with all schemas
export const db = drizzle(poolConnection, { schema, mode: 'default' });

// Test database connection
export async function testConnection() {
    try {
        const connection = await poolConnection.getConnection();
        console.log('=== Sukses Database connected successfully!');
        connection.release();
        return true;
    } catch (error) {
        console.error('=== Error Database connection failed:', error);
        return false;
    }
}

// Export pool for raw queries if needed
export { poolConnection };

