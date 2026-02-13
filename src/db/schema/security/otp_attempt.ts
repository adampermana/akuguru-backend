import { createId } from '@paralleldrive/cuid2';
import { boolean, index, int, mysqlTable, timestamp, varchar } from 'drizzle-orm/mysql-core';
import { users } from '../../schema/masterdata/users';

export const otpAttempts = mysqlTable(
    'otp_attempts',
    {
        id: varchar('id', { length: 36 })
            .primaryKey()
            .$defaultFn(() => createId()),
        userId: varchar('user_id', { length: 36 }).references(() => users.id, { onDelete: 'cascade' }),
        email: varchar('email', { length: 255 }).notNull(),
        phone: varchar('phone', { length: 20 }),
        attemptCount: int('attempt_count').default(0).notNull(),
        isBlocked: boolean('is_blocked').default(false).notNull(),
        lastAttemptAt: timestamp('last_attempt_at').defaultNow().notNull(),
        blockedUntil: timestamp('blocked_until'),
        createdAt: timestamp('created_at').defaultNow().notNull(),
    },
    (table) => ({
        userIdIdx: index('user_id_idx').on(table.userId),
        emailIdx: index('email_idx').on(table.email),
        phoneIdx: index('phone_idx').on(table.phone),
        lastAttemptAtIdx: index('last_attempt_at_idx').on(table.lastAttemptAt),
    })
);
