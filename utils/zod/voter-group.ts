import { z } from 'zod'

export const VoterGroup = z.object({
  name: z
    .string()
    .min(5, 'Name must contain at least 5 character(s)')
    .max(255, 'Name must contain at most 255 character(s)'),
  initialWhitelist: z
    .array(z.string())
    .optional()
    .default([])
})