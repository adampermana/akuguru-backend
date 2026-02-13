import { createId } from '@paralleldrive/cuid2';
import { boolean, index, mysqlEnum, mysqlTable, timestamp, varchar } from 'drizzle-orm/mysql-core';
import { roleNameEnum } from '../enums';

export const users = mysqlTable(
    'users',
    {
        id: varchar('id', { length: 36 })
            .primaryKey()
            .$defaultFn(() => createId()),
        name: varchar('name', { length: 255 }).notNull(),
        username: varchar('username', { length: 50 }).notNull().unique(),
        email: varchar('email', { length: 255 }).notNull().unique(),
        emailVerifiedAt: timestamp('email_verified_at'),
        phone: varchar('phone', { length: 20 }).notNull().unique(),
        phoneVerifiedAt: timestamp('phone_verified_at'),
        passwordHash: varchar('password_hash', { length: 255 }).notNull(),
        isActive: boolean('is_active').default(true).notNull(),
        lastLoginAt: timestamp('last_login_at'),
        createdAt: timestamp('created_at').defaultNow().notNull(),
        updatedAt: timestamp('updated_at')
            .defaultNow()
            .notNull()
            .$onUpdate(() => new Date()),
    },
    (table) => ({
        usernameIdx: index('username_idx').on(table.username),
        emailIdx: index('email_idx').on(table.email),
        phoneIdx: index('phone_idx').on(table.phone),
    })
);

export const roles = mysqlTable('roles', {
    id: varchar('id', { length: 36 })
        .primaryKey()
        .$defaultFn(() => createId()),
    name: mysqlEnum('name', roleNameEnum).notNull().unique(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const userRoles = mysqlTable(
    'user_roles',
    {
        id: varchar('id', { length: 36 })
            .primaryKey()
            .$defaultFn(() => createId()),
        userId: varchar('user_id', { length: 36 })
            .notNull()
            .references(() => users.id, { onDelete: 'cascade' }),
        roleId: varchar('role_id', { length: 36 })
            .notNull()
            .references(() => roles.id, { onDelete: 'cascade' }),
        isActive: boolean('is_active').default(true).notNull(),
        assignedAt: timestamp('assigned_at').defaultNow().notNull(),
    },
    (table) => ({
        userIdIdx: index('user_id_idx').on(table.userId),
        roleIdIdx: index('role_id_idx').on(table.roleId),
    })
);
