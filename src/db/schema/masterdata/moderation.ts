import { createId } from '@paralleldrive/cuid2';
import { boolean, index, mysqlEnum, mysqlTable, text, timestamp, varchar } from 'drizzle-orm/mysql-core';
import { moderationActionEnum } from '../enums';
import { users } from './users';

export const userModerationLog = mysqlTable(
    'user_moderation_log',
    {
        id: varchar('id', { length: 36 })
            .primaryKey()
            .$defaultFn(() => createId()),
        userId: varchar('user_id', { length: 36 })
            .notNull()
            .references(() => users.id, { onDelete: 'cascade' }),
        actionType: mysqlEnum('action_type', moderationActionEnum).notNull(),
        reason: text('reason').notNull(),
        notes: text('notes'),
        moderatedBy: varchar('moderated_by', { length: 36 }).references(() => users.id, {
            onDelete: 'set null',
        }),
        moderatedAt: timestamp('moderated_at').defaultNow().notNull(),
        expiresAt: timestamp('expires_at'),
        isActive: boolean('is_active').default(true).notNull(),
        createdAt: timestamp('created_at').defaultNow().notNull(),
        updatedAt: timestamp('updated_at')
            .defaultNow()
            .notNull()
            .$onUpdate(() => new Date()),
    },
    (table) => ({
        userIdIdx: index('user_id_idx').on(table.userId),
        moderatedByIdx: index('moderated_by_idx').on(table.moderatedBy),
    })
);
