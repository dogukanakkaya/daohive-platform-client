import { voterGroupQuery } from '@/queries/voter-group'
import { Database } from './supabase'

type QueryWrapper = ReturnType<typeof voterGroupQuery>
export type VoterGroupsResponse = NonNullable<Awaited<ReturnType<QueryWrapper['getVoterGroups']>>['data']>

export type VoterGroupPayload = Required<Pick<Database['public']['Tables']['voter_groups']['Insert'], 'name'>> & {
  voterIds: number[]
}