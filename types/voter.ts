import { voterQuery } from '@/queries/voter'
import { Database } from './supabase'

type QueryWrapper = ReturnType<typeof voterQuery>
export type VotersResponse = NonNullable<Awaited<ReturnType<QueryWrapper['getVoters']>>['data']>

export type VoterPayload = Required<Pick<Database['public']['Tables']['voters']['Insert'], 'address' | 'name' | 'email'>>