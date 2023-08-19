'use client'
import { useFormValidation } from '@/hooks'
import Button from '../Button'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '@/supabase.types'
import { useState } from 'react'
import { withLoading, withLoadingToastr } from '@/utils/hof'
import LoadingOverlay from '../LoadingOverlay'
import { PersonalInformationSchema, UserMerged } from '@/modules/auth'

export default function PersonalInformation({ user }: { user: UserMerged }) {
  const supabase = createClientComponentClient<Database>()
  const [loading, setLoading] = useState(false)
  const {
    state: { name, email },
    errors,
    handleChange,
    validateForm,
    isFormValid
  } = useFormValidation({ name: user.user_metadata.name, email: user.email }, PersonalInformationSchema)

  const handleSubmit = withLoading(withLoadingToastr(async () => {
    await supabase.auth.updateUser({ data: { name }, email })
  }), setLoading)

  return (
    <div>
      {loading && <LoadingOverlay />}
      <div className="mb-4">
        <label className="form-label">Name</label>
        <input value={name} onChange={handleChange} onBlur={validateForm} className="form-input" type="text" name="name" placeholder="Enter name" autoFocus />
        <small className="mt-2 text-xs text-red-600 dark:text-red-500">{errors.name}</small>
      </div>
      {
        !user.user_metadata.address && (
          <div className="mb-4">
            <label className="form-label">E-Mail <span className="text-xs text-red-500">*</span> <span className="text-xs">(Changing email will require verification)</span></label>
            <input value={email} onChange={handleChange} onBlur={validateForm} className="form-input" type="email" name="email" placeholder="Enter email" />
            <small className="mt-2 text-xs text-red-600 dark:text-red-500">{errors.email}</small>
          </div>
        )
      }
      <div className="flex justify-end items-center">
        <Button onClick={handleSubmit} isEnabled={isFormValid} className="flex items-center gap-2">Save <i className="bi bi-save text-lg"></i></Button>
      </div>
    </div>
  )
}
