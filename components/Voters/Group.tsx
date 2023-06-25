'use client'
import Button, { Variant } from '../Button'
import { VoterGroupSelect, VoterSelect } from '@/app/(dashboard)/voters/types'
import GroupCard from './GroupCard'
import { useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useFormValidation, useEffectState } from '@/hooks'
import { VoterGroup } from '@/utils/zod/voter-group'
import Dialog from '../Dialog'
import { withLoadingToastr } from '@/utils/hof'

interface Props {
  data: VoterGroupSelect[]
  voters: VoterSelect[]
}

export default function Group({ data: voterGroups, voters }: Props) {
  const supabase = createClientComponentClient()
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const { state: { name, initialWhitelist }, errors, handleChange, validateForm, isFormValid, reset } = useFormValidation({ name: '', initialWhitelist: [] }, VoterGroup)
  const [data, setData] = useEffectState(voterGroups)

  const handleSubmit = withLoadingToastr(async () => {
    const { data: voterGroup } = await supabase.from('voter_groups').insert({ name }).select('id')
      .returns<Pick<VoterGroupSelect, 'id'>[]>().throwOnError()

    // @todo: find something about this typing problem or maybe promisify supabase `.throwOnError` will always return non-nullable
    if (!voterGroup) return

    // @todo: transaction & rollback with the above insert (seems like supabase does not directly supports this but i'll check postgres functions)
    const whitelist = initialWhitelist.map(id => ({ voter_group_id: voterGroup[0].id, voter_id: id }))
    await supabase.from('voter_group_voters').insert(whitelist).throwOnError()

    setIsDialogOpen(false)
    reset()
    setData([...data, { id: voterGroup[0].id, name }])
  })

  const handleRemove = withLoadingToastr(async (id: number) => {
    await supabase.from('voter_groups').delete().eq('id', id).throwOnError()
    setData(data.filter(voter => voter.id !== id))
  })

  return (
    <div className="border-t-4 dark:border-gray-700">
      <div className="flex items-center gap-2">
        <h2 className="text-xl font-semibold my-4">Whitelist Groups</h2>
        <Button onClick={() => setIsDialogOpen(true)} variant={Variant.Secondary} className="!py-1 !px-2"><i className="bi bi-plus text-lg"></i></Button>
      </div>
      <div className="flex items-center flex-wrap gap-4">
        {data.map(group => <GroupCard handleRemove={handleRemove} key={group.id} group={group} />)}
      </div>
      <Dialog title="Create new whitelist group" isOpen={isDialogOpen}>
        <div className="mb-4">
          <label className="form-label">Group Name <span className="text-xs text-red-500">*</span></label>
          <input value={name} onChange={handleChange} onBlur={validateForm} className="form-input" type="text" name="name" placeholder="Enter Group Name" autoFocus />
          <small className="mt-2 text-xs text-red-600 dark:text-red-500">{errors.name}</small>
        </div>
        <div className="mb-4">
          <label className="form-label">Initial Voters</label>
          <select value={initialWhitelist} onChange={handleChange} className="form-input" multiple name="initialWhitelist">
            {voters.map(voter => <option key={voter.id} value={voter.id}>{voter.name}</option>)}
          </select>
          <small className="mt-2 text-xs text-red-600 dark:text-red-500">{errors.initialWhitelist}</small>
        </div>
        <div className="flex items-center justify-end gap-2">
          <Button onClick={() => setIsDialogOpen(false)} variant={Variant.Secondary}>Cancel</Button>
          <Button onClick={handleSubmit} isEnabled={isFormValid}>Create</Button>
        </div>
      </Dialog>
    </div>
  )
}
