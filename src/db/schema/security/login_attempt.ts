import { createId } from '@paralleldrive/cuid2';
import { boolean, index, mysqlTable, timestamp, varchar } from 'drizzle-orm/mysql-core';
import { users } from '../../schema/masterdata/users';

export const loginAttempts = mysqlTable(
    'login_attempts',
    {
        id: varchar('id', { length: 36 })
            .primaryKey()
            .$defaultFn(() => createId()),
        userId: varchar('user_id', { length: 36 }).references(() => users.id, { onDelete: 'cascade' }),
        usernameOrEmail: varchar('username_or_email', { length: 255 }).notNull(),
        ipAddress: varchar('ip_address', { length: 50 }),
        uuidDevice: varchar('uuid_device', { length: 255 }),
        latitude: varchar('latitude', { length: 50 }),
        longitude: varchar('longitude', { length: 50 }),
        isSuccessful: boolean('is_successful').default(false).notNull(),
        failureReason: varchar('failure_reason', { length: 500 }),
        attemptedAt: timestamp('attempted_at').defaultNow().notNull(),
    },
    (table) => ({
        userIdIdx: index('user_id_idx').on(table.userId),
        usernameOrEmailIdx: index('username_or_email_idx').on(table.usernameOrEmail),
        uuidDeviceIdx: index('uuid_device_idx').on(table.uuidDevice),
        attemptedAtIdx: index('attempted_at_idx').on(table.attemptedAt),
    })
);
