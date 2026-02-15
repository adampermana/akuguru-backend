import { t } from 'elysia'

// Payload Login
const LoginRequest = t.Object({
    username_or_email: t.String(),
    password: t.String(),
    latitude: t.Number(),
    longitude: t.Number(),
    uuid_device: t.String(),
    platform: t.String(),
    fcm_token: t.String()
})

// Response Login
const LoginResponse = t.Object({
    token: t.String(),
    user: t.Object({
        id: t.Number(),
        is_email_verified: t.Boolean(),
        is_active: t.Boolean(),
        is_login: t.Boolean(),
        is_suspend: t.Boolean(),
        fcm_token: t.String()
    })
})

const RegisterRequest = t.Object({
    name: t.String(),
    email: t.String(),
    password: t.String(),
    password_confirmation: t.String(),
    role: t.Boolean(),
    platform: t.String(),
    uuid_device: t.String(),
    latitude: t.Number(),
    longitude: t.Number(),
    fcm_token: t.String(),
})

const ResponseRegister = t.Object({
    id: t.Number(),
    is_email_verified: t.Boolean(),
    is_active: t.Boolean(),
    is_login: t.Boolean(),
    is_suspend: t.Boolean(),
    fcm_token: t.String(),
    created_at: t.String(),
    updated_at: t.String() || null,
    image_profile: t.String() || null,
})

const VerifyAccountRequest = t.Object({
    email: t.String(),
    otp: t.String()
})

const VerifyAccountResponse = t.Object({
    is_email_verified: t.Boolean(),
    is_active: t.Boolean(),
    is_suspend: t.Boolean(),
    created_at: t.String(),
    updated_at: t.String()
})

const ResendOtpRequest = t.Object({
    email: t.String(),
})

const ResendOtpResponse = t.Object({
    is_email_verified: t.Boolean(),
    is_active: t.Boolean(),
    is_suspend: t.Boolean(),
    created_at: t.String(),
    updated_at: t.String()
})


// const models = AuthModel.sign.merge(AuthModel.login)

