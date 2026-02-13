import { createId } from '@paralleldrive/cuid2';
import {
    boolean,
    decimal,
    index,
    int,
    mysqlEnum,
    mysqlTable,
    text,
    time,
    timestamp,
    unique,
    varchar,
} from 'drizzle-orm/mysql-core';
import {
    bookingStatusEnum,
    cancelledByEnum,
    modeEnum,
    participantPaymentStatusEnum,
    sessionTypeEnum,
} from '../enums';
import { studentProfiles, teacherProfiles } from '../masterdata/profiles';

export const bookings = mysqlTable(
    'bookings',
    {
        id: varchar('id', { length: 36 })
            .primaryKey()
            .$defaultFn(() => createId()),
        teacherId: varchar('teacher_id', { length: 36 })
            .notNull()
            .references(() => teacherProfiles.id, { onDelete: 'restrict' }),
        createdByStudentId: varchar('created_by_student_id', { length: 36 })
            .notNull()
            .references(() => studentProfiles.id, { onDelete: 'restrict' }),

        sessionType: mysqlEnum('session_type', sessionTypeEnum).notNull(),
        mode: mysqlEnum('mode', modeEnum).notNull(),

        scheduleDatetime: timestamp('schedule_datetime').notNull(),
        durationMinutes: int('duration_minutes').notNull(),

        // Offline meeting point (calculated by service layer)
        locationLat: decimal('location_lat', { precision: 10, scale: 8 }),
        locationLng: decimal('location_lng', { precision: 11, scale: 8 }),
        locationAddress: varchar('location_address', { length: 500 }),

        // Status machine
        status: mysqlEnum('status', bookingStatusEnum).default('pending_payment').notNull(),

        // Group class fields
        capacity: int('capacity'),
        currentParticipants: int('current_participants').default(0).notNull(),

        // Price snapshot (for historical record)
        priceSnapshot: decimal('price_snapshot', { precision: 10, scale: 2 }).notNull(),

        cancellationReason: text('cancellation_reason'),
        cancelledBy: mysqlEnum('cancelled_by', cancelledByEnum),

        createdAt: timestamp('created_at').defaultNow().notNull(),
        updatedAt: timestamp('updated_at')
            .defaultNow()
            .notNull()
            .$onUpdate(() => new Date()),
    },
    (table) => ({
        teacherIdIdx: index('teacher_id_idx').on(table.teacherId),
        studentIdIdx: index('student_id_idx').on(table.createdByStudentId),
        statusIdx: index('status_idx').on(table.status),
        scheduleDatetimeIdx: index('schedule_datetime_idx').on(table.scheduleDatetime),
        teacherScheduleIdx: index('teacher_schedule_idx').on(table.teacherId, table.scheduleDatetime),
    })
);

export const bookingParticipants = mysqlTable(
    'booking_participants',
    {
        id: varchar('id', { length: 36 })
            .primaryKey()
            .$defaultFn(() => createId()),
        bookingId: varchar('booking_id', { length: 36 })
            .notNull()
            .references(() => bookings.id, { onDelete: 'cascade' }),
        studentId: varchar('student_id', { length: 36 })
            .notNull()
            .references(() => studentProfiles.id, { onDelete: 'restrict' }),

        paymentStatus: mysqlEnum('payment_status', participantPaymentStatusEnum)
            .default('joined')
            .notNull(),

        joinedAt: timestamp('joined_at').defaultNow().notNull(),
        cancelledAt: timestamp('cancelled_at'),
    },
    (table) => ({
        bookingIdIdx: index('booking_id_idx').on(table.bookingId),
        studentIdIdx: index('student_id_idx').on(table.studentId),
        bookingStudentUnique: unique('booking_student_unique').on(table.bookingId, table.studentId),
    })
);

export const availabilitySlots = mysqlTable(
    'availability_slots',
    {
        id: varchar('id', { length: 36 })
            .primaryKey()
            .$defaultFn(() => createId()),
        teacherId: varchar('teacher_id', { length: 36 })
            .notNull()
            .references(() => teacherProfiles.id, { onDelete: 'cascade' }),
        dayOfWeek: int('day_of_week').notNull(), // 0=Sunday, 6=Saturday
        startTime: time('start_time').notNull(),
        endTime: time('end_time').notNull(),
        isActive: boolean('is_active').default(true).notNull(),
        createdAt: timestamp('created_at').defaultNow().notNull(),
    },
    (table) => ({
        teacherIdIdx: index('teacher_id_idx').on(table.teacherId),
        teacherDayActiveIdx: index('teacher_day_active_idx').on(
            table.teacherId,
            table.dayOfWeek,
            table.isActive
        ),
    })
);

export const reviews = mysqlTable(
    'reviews',
    {
        id: varchar('id', { length: 36 })
            .primaryKey()
            .$defaultFn(() => createId()),
        bookingId: varchar('booking_id', { length: 36 })
            .notNull()
            .unique()
            .references(() => bookings.id, { onDelete: 'cascade' }),
        teacherId: varchar('teacher_id', { length: 36 })
            .notNull()
            .references(() => teacherProfiles.id, { onDelete: 'restrict' }),
        studentId: varchar('student_id', { length: 36 })
            .notNull()
            .references(() => studentProfiles.id, { onDelete: 'restrict' }),

        rating: int('rating').notNull(), // 1-5
        comment: text('comment'),

        // Prevent fake reviews
        isVerifiedTransaction: boolean('is_verified_transaction').default(true).notNull(),

        createdAt: timestamp('created_at').defaultNow().notNull(),
        updatedAt: timestamp('updated_at')
            .defaultNow()
            .notNull()
            .$onUpdate(() => new Date()),
    },
    (table) => ({
        teacherIdIdx: index('teacher_id_idx').on(table.teacherId),
        bookingIdIdx: index('booking_id_idx').on(table.bookingId),
    })
);
