'use client'
import Dialog from '../Dialog'
import { useFormValidation } from '@/hooks'
import { VoterGroup } from '@/utils/zod/voter-group'
import Button, { Variant } from '../Button'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { toast } from 'react-toastify'

interface Props {
  open: boolean
}

export default function GroupDialog({ open }: Props) {
  const supabase = createClientComponentClient()
  const { state: { name }, errors, handleChange, validateForm, isFormValid } = useFormValidation({ name: '' }, VoterGroup)

  const handleSubmit = async () => {
    const { error } = await supabase.from('voter_groups').insert({ name })
    if (error) toast.error(error.message)
    else toast.success('Group created successfully')
  }

  return (
    <Dialog title="Create new whitelist group" open={open}>
      <div>
        <label className="form-label">Voter Address <span className="text-xs text-red-500">*</span></label>
        <input value={name} onChange={handleChange} onBlur={validateForm} className="form-input" type="text" name="name" placeholder="Enter Group Name" autoFocus />
        <small className="mt-2 text-xs text-red-600 dark:text-red-500">{errors.name}</small>
      </div>
      <div className="flex items-center justify-end gap-2">
        <Button variant={Variant.Secondary}>Cancel</Button>
        <Button onClick={handleSubmit} isEnabled={isFormValid}>Create</Button>
      </div>
    </Dialog>
  )
}
