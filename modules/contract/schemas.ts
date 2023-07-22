import { z } from 'zod'

export const ContractSchema = z.object({
  name: z
    .string({
      required_error: 'Name is required'
    })
    .nonempty('Name is required')
    .max(255, 'Name must contain at most 255 character(s)'),
  description: z
    .string({
      required_error: 'Description is required'
    })
    .max(255, 'Description must contain at most 255 character(s)')
    .default(''),
  voterGroupId: z.string().optional().default('')
})