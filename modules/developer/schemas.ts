import { z } from 'zod'

export const ApiCredentialSchema = z.object({
  name: z
    .string({
      required_error: 'Name is required'
    })
    .min(5, 'Name must contain at least 5 character(s)')
    .max(255, 'Name must contain at most 255 character(s)'),
  expiresAt: z
    .coerce
    .date()
    .min(new Date(), 'Expiry date must be in the future')
    .optional()
    .or(z.literal(''))
})