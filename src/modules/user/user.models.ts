import { t } from "elysia";

const ProfileResponse = t.Object({
    id: t.Number(),
    name: t.String(),
    email: t.String(),
    phone: t.String(),
    image_profile: t.String(),
    role: t.Boolean(),
    is_email_verified: t.Boolean(),
    is_active: t.Boolean(),
    is_login: t.Boolean(),
    is_suspend: t.Boolean(),
    created_at: t.String(),
    updated_at: t.String() || null,
})