import { z } from 'zod'

export const ProposalSchema = z.object({
  name: z
    .string()
    .min(3, 'Name must contain at least 3 character(s)')
    .max(75, 'Name must contain at most 75 character(s)'),
  description: z
    .string()
    .min(10, 'Description must contain at least 10 character(s)')
    .max(255, 'Description must contain at most 255 character(s)'),
  content: z
    .string()
    .min(50, 'Content must contain at least 50 character(s)'),
  startAt: z
    .coerce
    .date()
    .min(new Date(), 'Start date must be in the future'),
  endAt: z
    .coerce
    .date()
    .min(new Date(), 'End date must be in the future')
})