import { Database } from '@/supabase.types'

export type VoterGroupResponse<T extends keyof Database['public']['Tables']['voter_groups']['Row']> = Pick<Database['public']['Tables']['voter_groups']['Row'], T>

export type VoterGroupPayload = Required<Pick<Database['public']['Tables']['voter_groups']['Insert'], 'name'>> & {
  voterIds: string[]
}