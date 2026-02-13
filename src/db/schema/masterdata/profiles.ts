import { createId } from '@paralleldrive/cuid2';
import {
    boolean,
    date,
    decimal,
    index,
    int,
    mysqlEnum,
    mysqlTable,
    text,
    timestamp,
    varchar,
} from 'drizzle-orm/mysql-core';
import {
    documentTypeEnum,
    genderEnum,
    kycStatusEnum,
    modeSupportedEnum,
    userStatusEnum,
    verificationStatusEnum,
} from '../enums';
import { users } from './users';

export const studentProfiles = mysqlTable(
    'student_profiles',
    {
        id: varchar('id', { length: 36 })
            .primaryKey()
            .$defaultFn(() => createId()),
        userId: varchar('user_id', { length: 36 })
            .notNull()
            .unique()
            .references(() => users.id, { onDelete: 'cascade' }),

        // KYC Fields
        fullLegalName: varchar('full_legal_name', { length: 255 }).notNull(),
        dateOfBirth: date('date_of_birth').notNull(),
        gender: mysqlEnum('gender', genderEnum).notNull(),
        idCardNumber: varchar('id_card_number', { length: 50 }),
        kycStatus: mysqlEnum('kyc_status', kycStatusEnum).default('pending').notNull(),
        kycVerifiedAt: timestamp('kyc_verified_at'),

        // Status Fields
        currentStatus: mysqlEnum('current_status', userStatusEnum).notNull(),
        schoolName: varchar('school_name', { length: 255 }),
        universityName: varchar('university_name', { length: 255 }),
        jobTitle: varchar('job_title', { length: 255 }),
        companyName: varchar('company_name', { length: 255 }),

        // Profile
        imageProfile: varchar('image_profile', { length: 500 }),
        bio: text('bio'),

        createdAt: timestamp('created_at').defaultNow().notNull(),
        updatedAt: timestamp('updated_at')
            .defaultNow()
            .notNull()
            .$onUpdate(() => new Date()),
    },
    (table) => ({
        userIdIdx: index('user_id_idx').on(table.userId),
        kycStatusIdx: index('kyc_status_idx').on(table.kycStatus),
    })
);

export const teacherProfiles = mysqlTable(
    'teacher_profiles',
    {
        id: varchar('id', { length: 36 })
            .primaryKey()
            .$defaultFn(() => createId()),
        userId: varchar('user_id', { length: 36 })
            .notNull()
            .unique()
            .references(() => users.id, { onDelete: 'cascade' }),

        // KYC Fields
        fullLegalName: varchar('full_legal_name', { length: 255 }).notNull(),
        dateOfBirth: date('date_of_birth').notNull(),
        idCardNumber: varchar('id_card_number', { length: 50 }),
        kycStatus: mysqlEnum('kyc_status', kycStatusEnum).default('pending').notNull(),
        kycVerifiedAt: timestamp('kyc_verified_at'),

        // Status Fields
        currentStatus: mysqlEnum('current_status', userStatusEnum).notNull(),
        schoolName: varchar('school_name', { length: 255 }),
        universityName: varchar('university_name', { length: 255 }),
        jobTitle: varchar('job_title', { length: 255 }),
        companyName: varchar('company_name', { length: 255 }),

        // Teaching Profile
        headline: varchar('headline', { length: 255 }).notNull(),
        bio: text('bio').notNull(),
        pricePerHour: decimal('price_per_hour', { precision: 10, scale: 2 }).notNull(),
        modeSupported: mysqlEnum('mode_supported', modeSupportedEnum).notNull(),

        // Reputation
        ratingAvg: decimal('rating_avg', { precision: 3, scale: 2 }).default('0.00').notNull(),
        ratingCount: int('rating_count').default(0).notNull(),
        totalSessions: int('total_sessions').default(0).notNull(),

        // Profile
        imageProfile: varchar('image_profile', { length: 500 }),

        isAcceptingStudents: boolean('is_accepting_students').default(true).notNull(),
        createdAt: timestamp('created_at').defaultNow().notNull(),
        updatedAt: timestamp('updated_at')
            .defaultNow()
            .notNull()
            .$onUpdate(() => new Date()),
    },
    (table) => ({
        userIdIdx: index('user_id_idx').on(table.userId),
        kycStatusIdx: index('kyc_status_idx').on(table.kycStatus),
        ratingAvgIdx: index('rating_avg_idx').on(table.ratingAvg),
    })
);

export const kycDocuments = mysqlTable(
    'kyc_documents',
    {
        id: varchar('id', { length: 36 })
            .primaryKey()
            .$defaultFn(() => createId()),
        userId: varchar('user_id', { length: 36 })
            .notNull()
            .references(() => users.id, { onDelete: 'cascade' }),
        documentType: mysqlEnum('document_type', documentTypeEnum).notNull(),
        fileUrl: varchar('file_url', { length: 500 }).notNull(),
        verificationStatus: mysqlEnum('verification_status', verificationStatusEnum)
            .default('pending')
            .notNull(),
        rejectionReason: text('rejection_reason'),
        uploadedAt: timestamp('uploaded_at').defaultNow().notNull(),
        verifiedAt: timestamp('verified_at'),
    },
    (table) => ({
        userIdIdx: index('user_id_idx').on(table.userId),
        verificationStatusIdx: index('verification_status_idx').on(table.verificationStatus),
    })
);

export const userLocations = mysqlTable(
    'user_locations',
    {
        id: varchar('id', { length: 36 })
            .primaryKey()
            .$defaultFn(() => createId()),
        userId: varchar('user_id', { length: 36 })
            .notNull()
            .references(() => users.id, { onDelete: 'cascade' }),
        label: varchar('label', { length: 100 }).notNull(),
        latitude: decimal('latitude', { precision: 10, scale: 8 }).notNull(),
        longitude: decimal('longitude', { precision: 11, scale: 8 }).notNull(),
        address: varchar('address', { length: 500 }).notNull(),
        isPrimary: boolean('is_primary').default(false).notNull(),
        createdAt: timestamp('created_at').defaultNow().notNull(),
    },
    (table) => ({
        userIdIdx: index('user_id_idx').on(table.userId),
    })
);
