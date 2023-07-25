import { z } from 'zod'

export const VoterSchema = z.object({
  address: z
    .string()
    .length(42, 'Address must contain exactly 42 character(s)'),
  name: z
    .string()
    .min(3, 'Name must contain at least 3 character(s)')
    .max(75, 'Name must contain at most 75 character(s)')
    .optional()
    .or(z.literal('')),
  email: z
    .string()
    .email()
    .min(5, 'Email must contain at least 5 character(s)')
    .max(75, 'Email must contain at most 75 character(s)')
    .optional()
    .or(z.literal(''))
})

export const AddToWhitelistSchema = z.object({
  addresses: z.array(z.string().length(42, 'Address must contain exactly 42 character(s)'))
})