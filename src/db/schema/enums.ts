export const roleNameEnum = ['student', 'teacher', 'admin'] as const;
export const genderEnum = ['male', 'female'] as const;
export const userStatusEnum = ['pelajar', 'mahasiswa', 'pekerja'] as const;
export const kycStatusEnum = ['pending', 'verified', 'rejected'] as const;
export const documentTypeEnum = ['id_card', 'certificate', 'diploma', 'other'] as const;
export const verificationStatusEnum = ['pending', 'approved', 'rejected'] as const;
export const sessionTypeEnum = ['private', 'group'] as const;
export const modeEnum = ['online', 'offline'] as const;
export const modeSupportedEnum = ['online', 'offline', 'both'] as const;
export const bookingStatusEnum = [
    'pending_payment',
    'paid',
    'confirmed',
    'ongoing',
    'completed',
    'cancelled',
    'refunded',
] as const;
export const participantPaymentStatusEnum = ['joined', 'paid', 'cancelled', 'refunded'] as const;
export const cancelledByEnum = ['student', 'teacher', 'admin'] as const;
export const paymentMethodEnum = ['ewallet', 'bank_transfer', 'credit_card', 'qris'] as const;
export const paymentStatusEnum = [
    'pending',
    'success',
    'failed',
    'refunded',
    'partial_refund',
] as const;
export const moderationActionEnum = ['suspended', 'banned', 'unbanned', 'unsuspended'] as const;

// Type exports
export type RoleName = (typeof roleNameEnum)[number];
export type Gender = (typeof genderEnum)[number];
export type UserStatus = (typeof userStatusEnum)[number];
export type KycStatus = (typeof kycStatusEnum)[number];
export type DocumentType = (typeof documentTypeEnum)[number];
export type VerificationStatus = (typeof verificationStatusEnum)[number];
export type SessionType = (typeof sessionTypeEnum)[number];
export type Mode = (typeof modeEnum)[number];
export type ModeSupported = (typeof modeSupportedEnum)[number];
export type BookingStatus = (typeof bookingStatusEnum)[number];
export type ParticipantPaymentStatus = (typeof participantPaymentStatusEnum)[number];
export type CancelledBy = (typeof cancelledByEnum)[number];
export type PaymentMethod = (typeof paymentMethodEnum)[number];
export type PaymentStatus = (typeof paymentStatusEnum)[number];
export type ModerationAction = (typeof moderationActionEnum)[number];
