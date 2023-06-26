import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { VoterGroupSelect } from '@/app/(dashboard)/voters/types'
import { VOTER_GROUP_SELECT } from '@/config'

const TABLE_NAME = 'voter_groups'

const supabase = createClientComponentClient()

export const createVoterGroup = async ({ name, whitelist }: { name: string, whitelist: string[] }) => {
  const { data: voterGroup, error } = await supabase.from(TABLE_NAME).insert({ name }).select('id')
    .returns<Pick<VoterGroupSelect, 'id'>[]>().throwOnError().single()

  // @todo: find something about this typing problem or maybe promisify supabase `.throwOnError` will always return non-nullable
  if (error) throw error

  // @todo: transaction & rollback with the above insert (seems like supabase does not directly supports this but i'll check postgres functions)
  const whitelistGroup = whitelist.map(id => ({ voter_group_id: voterGroup.id, voter_id: id }))
  await supabase.from('voter_group_voters').insert(whitelistGroup).throwOnError()

  return voterGroup
}

export const getVoterGroup = async (id: number) => {
  const { data: voterGroup, error } = await supabase.from(TABLE_NAME).select(`
    ${VOTER_GROUP_SELECT},
    voter_group_voters (
      voter_id
    )
  `).eq('id', id).throwOnError().single()

  if (error) throw error

  const whitelist = voterGroup.voter_group_voters.map(v => v.voter_id.toString())

  return { ...voterGroup, whitelist }
}

export const updateVoterGroup = async (id: number, { name, whitelist }: { name: string, whitelist: string[] }) => {
  await supabase.from(TABLE_NAME).update({ name }).eq('id', id).throwOnError()

  // @todo: 'if' performance problems occur, compare old and new whitelist and update only the difference
  await supabase.from('voter_group_voters').delete().eq('voter_group_id', id).throwOnError()
  const whitelistGroup = whitelist.map(voter_id => ({ voter_group_id: id, voter_id }))
  await supabase.from('voter_group_voters').insert(whitelistGroup).throwOnError()
}

export const deleteVoterGroup = async (id: number) => {
  await supabase.from(TABLE_NAME).delete().eq('id', id).throwOnError()
}