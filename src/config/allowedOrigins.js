const allowedOrigins = process.env.ALLOWED_ORIGINS || ''

export const allowedOriginsArray = allowedOrigins.split(',').map(item => item.trim())
