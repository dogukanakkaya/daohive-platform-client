import { z } from 'zod'

export const ProposalSchema = z.object({
  name: z
    .string({
      required_error: 'Name is required'
    })
    .min(5, 'Name must contain at least 5 character(s)')
    .max(255, 'Name must contain at most 255 character(s)'),
  description: z
    .string({
      required_error: 'Description is required'
    })
    .min(10, 'Description must contain at least 10 character(s)')
    .max(255, 'Description must contain at most 255 character(s)'),
  content: z
    .string({
      required_error: 'Content is required'
    })
    .min(50, 'Content must contain at least 50 character(s)'),
  startAt: z
    .coerce
    .date({
      required_error: 'Please select a start date'
    })
    .min(new Date(), 'Start date must be in the future'),
  endAt: z
    .coerce
    .date({
      required_error: 'Please select a start date'
    })
    .min(new Date(), 'End date must be in the future')
})