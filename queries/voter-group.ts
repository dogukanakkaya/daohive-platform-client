import { SupabaseClient, createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '@/types/supabase'
import { VoterGroupPayload } from '@/types/voter-group'

export function voterGroupQuery(supabaseClient?: SupabaseClient<Database>) {
  const supabase = supabaseClient ?? createClientComponentClient<Database>()

  const getVoterGroups = () => {
    return supabase.from('voter_groups').select('id,name').order('created_at', { ascending: false }).throwOnError()
  }

  const getVoterGroup = async <T extends string>(id: number, select: T = 'id,name' as T) => {
    const { data: voterGroup, error } = await supabase.from('voter_groups').select(select).eq('id', id).throwOnError().single()

    if (error) throw error

    return voterGroup
  }

  const createVoterGroup = async ({ name, voterIds }: VoterGroupPayload) => {
    const { data: voterGroup, error } = await supabase.from('voter_groups').insert({ name }).select('id').throwOnError().single()

    // @todo: find something about this and other throws `supabase.throwOnError` will always return non-nullable
    if (error) throw error

    // @todo: transaction & rollback with the above insert (seems like supabase does not directly supports this but i'll check postgres functions)
    const whitelistGroup = voterIds.map(voterId => ({ voter_group_id: voterGroup.id, voter_id: voterId }))
    await supabase.from('voter_group_voters').insert(whitelistGroup).throwOnError()

    return voterGroup
  }

  // @todo: transaction & rollback
  const updateVoterGroup = async (id: number, { name, voterIds }: VoterGroupPayload) => {
    await supabase.from('voter_groups').update({ name }).eq('id', id).throwOnError()

    // @todo: 'if' performance problems occur, compare old and new whitelist and update only the difference
    await supabase.from('voter_group_voters').delete().eq('voter_group_id', id).throwOnError()
    const whitelistGroup = voterIds.map(voterId => ({ voter_group_id: id, voter_id: voterId }))
    await supabase.from('voter_group_voters').insert(whitelistGroup).throwOnError()
  }

  const deleteVoterGroup = async (id: number) => {
    await supabase.from('voter_groups').delete().eq('id', id).throwOnError()
  }

  return { getVoterGroups, getVoterGroup, createVoterGroup, updateVoterGroup, deleteVoterGroup }
}