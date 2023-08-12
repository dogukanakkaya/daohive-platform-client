import { z } from 'zod'

export const VoterGroupSchema = z.object({
  name: z
    .string()
    .min(3, 'Name must contain at least 3 character(s)')
    .max(255, 'Name must contain at most 255 character(s)'),
  voterIds: z
    .array(z.string())
    .optional()
    .default([])
})