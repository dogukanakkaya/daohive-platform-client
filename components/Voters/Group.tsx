'use client'
import Button, { Variant } from '../Button'
import { VoterGroupSelect } from '@/app/(dashboard)/voters/types'
import GroupCard from './GroupCard'
import { useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useFormValidation } from '@/hooks'
import { VoterGroup } from '@/utils/zod/voter-group'
import { toast } from 'react-toastify'
import Dialog from '../Dialog'

interface Props {
  data: VoterGroupSelect[]
}

export default function Group({ data }: Props) {
  const supabase = createClientComponentClient()
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const { state: { name }, errors, handleChange, validateForm, isFormValid } = useFormValidation({ name: '' }, VoterGroup)

  const handleSubmit = async () => {
    const { error } = await supabase.from('voter_groups').insert({ name })
    if (error) toast.error(error.message)
    else toast.success('Group created successfully')
  }

  return (
    <div className="border-t-4 dark:border-gray-700">
      <div className="flex items-center gap-2">
        <h2 className="text-xl font-semibold my-4">Whitelist Groups</h2>
        <Button onClick={() => setIsDialogOpen(true)} variant={Variant.Secondary} className="!py-1 !px-2"><i className="bi bi-plus text-lg"></i></Button>
      </div>
      <div className="flex items-center flex-wrap gap-4">
        {data.map(group => <GroupCard key={group.id} group={group} />)}
      </div>
      <Dialog title="Create new whitelist group" isOpen={isDialogOpen}>
        <div>
          <label className="form-label">Voter Address <span className="text-xs text-red-500">*</span></label>
          <input value={name} onChange={handleChange} onBlur={validateForm} className="form-input" type="text" name="name" placeholder="Enter Group Name" autoFocus />
          <small className="mt-2 text-xs text-red-600 dark:text-red-500">{errors.name}</small>
        </div>
        <div className="flex items-center justify-end gap-2">
          <Button onClick={() => setIsDialogOpen(false)} variant={Variant.Secondary}>Cancel</Button>
          <Button onClick={handleSubmit} isEnabled={isFormValid}>Create</Button>
        </div>
      </Dialog>
    </div>
  )
}
