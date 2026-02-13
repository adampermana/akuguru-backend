import { createId } from '@paralleldrive/cuid2';
import { boolean, index, int, mysqlTable, timestamp, varchar } from 'drizzle-orm/mysql-core';

export const deviceRegistry = mysqlTable(
    'device_registry',
    {
        id: varchar('id', { length: 36 })
            .primaryKey()
            .$defaultFn(() => createId()),
        uuidDevice: varchar('uuid_device', { length: 255 }).notNull().unique(),
        latitude: varchar('latitude', { length: 50 }),
        longitude: varchar('longitude', { length: 50 }),
        registerCount: int('register_count').default(0).notNull(),
        isCaptchaRequired: boolean('is_captcha_required').default(false).notNull(),
        isPermanentlyBlocked: boolean('is_permanently_blocked').default(false).notNull(),
        lastAttemptAt: timestamp('last_attempt_at').defaultNow().notNull(),
        blockedUntil: timestamp('blocked_until'),
        createdAt: timestamp('created_at').defaultNow().notNull(),
    },
    (table) => ({
        uuidDeviceIdx: index('uuid_device_idx').on(table.uuidDevice),
        lastAttemptAtIdx: index('last_attempt_at_idx').on(table.lastAttemptAt),
    })
);
