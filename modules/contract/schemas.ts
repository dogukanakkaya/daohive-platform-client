import { z } from 'zod'

export const ContractSchema = z.object({
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
    .max(255, 'Description must contain at most 255 character(s)')
    .default(''),
  voterGroup: z.string().optional().default('')
})