import { z } from 'zod'

export const Contract = z.object({
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
  whitelist: z.array(z.string()).optional()
})