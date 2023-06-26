import { voterGroupQuery } from '@/queries/voter-group'
import { Database } from './supabase'

export type VoterGroupPayload = Required<Pick<Database['public']['Tables']['voter_groups']['Insert'], 'name'>> & {
  whitelist: string[]
}

type QueryWrapper = ReturnType<typeof voterGroupQuery>
export type VoterGroupsResponse = NonNullable<Awaited<ReturnType<QueryWrapper['getVoterGroups']>>['data']>
