import { SupabaseClient, createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '@/supabase.types'
import { VoterGroupPayload } from './types'

export function voterGroupQuery(supabaseClient?: SupabaseClient<Database>) {
  const supabase = supabaseClient ?? createClientComponentClient<Database>()

  const getVoterGroup = async <T extends string = '*'>(id: string, select: T = '*' as T) => {
    const { data: voterGroup, error } = await supabase.from('voter_groups').select(select).eq('id', id).throwOnError().single()

    // @todo(1)
    if (error) throw error

    return voterGroup
  }

  const createVoterGroup = async ({ name, voterIds }: VoterGroupPayload) => {
    const { data: voterGroup, error } = await supabase.from('voter_groups').insert({ name }).select('id').throwOnError().single()

    // @todo(1): find something about this and other throws `supabase.throwOnError` will always return non-nullable
    if (error) throw error

    // @todo(2): transaction & rollback with the above insert (seems like supabase does not directly supports this but i'll check postgres functions)
    const whitelistGroup = voterIds.map(voterId => ({ voter_group_id: voterGroup.id, voter_id: voterId }))
    await supabase.from('voter_group_voters').insert(whitelistGroup).throwOnError()

    return voterGroup
  }

  // @todo(2)
  const updateVoterGroup = async (id: string, { name, voterIds }: VoterGroupPayload) => {
    await supabase.from('voter_groups').update({ name }).eq('id', id).throwOnError()

    // @todo: 'if' performance problems occur, compare old and new whitelist and update only the difference
    await supabase.from('voter_group_voters').delete().eq('voter_group_id', id).throwOnError()
    const whitelistGroup = voterIds.map(voterId => ({ voter_group_id: id, voter_id: voterId }))
    await supabase.from('voter_group_voters').insert(whitelistGroup).throwOnError()
  }

  const deleteVoterGroup = async (id: string) => {
    await supabase.from('voter_group_voters').delete().eq('voter_group_id', id).throwOnError()
    return supabase.from('voter_groups').delete().eq('id', id).throwOnError()
  }

  return { getVoterGroup, createVoterGroup, updateVoterGroup, deleteVoterGroup }
}