export const NODE_ENV = process.env.NODE_ENV!

export const API_URL = process.env.NEXT_PUBLIC_API_URL!

export const WEB_URL = process.env.NEXT_PUBLIC_WEB_URL!

export const CHAIN_ID = process.env.NEXT_PUBLIC_CHAIN_ID!

export const HCAPTCHA_SITEKEY = process.env.NEXT_PUBLIC_HCAPTCHA_SITEKEY!

export const TOAST_AUTO_CLOSE = 3000

export const cookieOptions = {
  domain: NODE_ENV === 'development' ? 'localhost' : '.daohive.io',
  sameSite: 'lax',
  secure: NODE_ENV !== 'development',
  path: '/'
} as const