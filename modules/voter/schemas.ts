import { z } from 'zod'

export const VoterSchema = z.object({
  address: z
    .string({
      required_error: 'Address is required'
    })
    .length(42, 'Address must contain exactly 42 character(s)'),
  name: z
    .string()
    .min(5, 'Name must contain at least 5 character(s)')
    .max(255, 'Name must contain at most 255 character(s)')
    .optional()
    .or(z.literal('')),
  email: z
    .string()
    .email()
    .min(10, 'Email must contain at least 10 character(s)')
    .max(255, 'Email must contain at most 255 character(s)')
    .optional()
    .or(z.literal(''))
})