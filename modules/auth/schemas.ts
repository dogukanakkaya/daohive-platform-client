import { z } from 'zod'

export const CredentialsSchema = z.object({
  email: z
    .string()
    .email()
    .min(5, 'E-Mail must contain at least 5 character(s)')
    .max(75, 'E-Mail must contain at most 255 character(s)'),
  password: z
    .string()
    .min(8, 'Password must contain at least 8 character(s)')
    .max(255, 'Password must contain at most 255 character(s)')
})