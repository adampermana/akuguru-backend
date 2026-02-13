import { createId } from '@paralleldrive/cuid2';
import { decimal, index, json, mysqlEnum, mysqlTable, timestamp, varchar } from 'drizzle-orm/mysql-core';
import { bookings } from '../bookings/bookings';
import { paymentMethodEnum, paymentStatusEnum } from '../enums';
import { studentProfiles } from '../masterdata/profiles';

export const payments = mysqlTable(
    'payments',
    {
        id: varchar('id', { length: 36 })
            .primaryKey()
            .$defaultFn(() => createId()),
        bookingId: varchar('booking_id', { length: 36 })
            .notNull()
            .references(() => bookings.id, { onDelete: 'restrict' }),
        studentId: varchar('student_id', { length: 36 })
            .notNull()
            .references(() => studentProfiles.id, { onDelete: 'restrict' }),

        amount: decimal('amount', { precision: 10, scale: 2 }).notNull(),
        platformFee: decimal('platform_fee', { precision: 10, scale: 2 }).notNull(),
        teacherAmount: decimal('teacher_amount', { precision: 10, scale: 2 }).notNull(),

        paymentMethod: mysqlEnum('payment_method', paymentMethodEnum).notNull(),
        paymentGateway: varchar('payment_gateway', { length: 50 }).notNull(),

        paymentStatus: mysqlEnum('payment_status', paymentStatusEnum).default('pending').notNull(),

        transactionRef: varchar('transaction_ref', { length: 255 }).unique(),
        gatewayResponse: json('gateway_response'),

        paidAt: timestamp('paid_at'),
        refundedAt: timestamp('refunded_at'),
        refundAmount: decimal('refund_amount', { precision: 10, scale: 2 }),

        createdAt: timestamp('created_at').defaultNow().notNull(),
    },
    (table) => ({
        bookingIdIdx: index('booking_id_idx').on(table.bookingId),
        studentIdIdx: index('student_id_idx').on(table.studentId),
        paymentStatusIdx: index('payment_status_idx').on(table.paymentStatus),
        transactionRefIdx: index('transaction_ref_idx').on(table.transactionRef),
    })
);
