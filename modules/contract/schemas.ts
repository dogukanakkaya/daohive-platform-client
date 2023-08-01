import { z } from 'zod'

export const ContractSchema = z.object({
  name: z
    .string()
    .min(3, 'Name must contain at least 3 character(s)')
    .max(75, 'Name must contain at most 75 character(s)'),
  description: z
    .string()
    .max(255, 'Description must contain at most 255 character(s)')
    .default(''),
  voterGroupId: z.string().optional().default(''),
  restriction: z.enum(['private', 'public']).default('private')
}).refine(input => !(input.restriction === 'private' && input.voterGroupId === ''), {
  message: 'You have to select a voter group if you want to make this contract private',
  path: ['voterGroupId']
})