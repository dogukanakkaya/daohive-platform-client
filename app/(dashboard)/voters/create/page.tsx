'use client'
import Breadcrumb from '@/components/Breadcrumb'
import Button from '@/components/Button'
import { useFormValidation } from '@/hooks'
import { Voter } from '@/utils/zod/voter'
import { withLoadingToastr } from '@/utils/hof'
import { useRouter } from 'next/navigation'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export default function Create() {
  const supabase = createClientComponentClient()
  const { state: { address, name, email }, errors, handleChange, validateForm, isFormValid } = useFormValidation({ address: '', name: '', email: '' }, Voter)
  const router = useRouter()

  const handleSubmit = withLoadingToastr(async () => {
    // @todo: later change empties to be saved as null, check other places too
    await supabase.from('voters').insert([{ address, name, email: email || null }]).throwOnError()
    router.refresh(); router.replace('/voters')
  })

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Breadcrumb items={[{ name: 'Voters', href: '/voters' }, { name: 'Create', href: '/voters/create' }]} />
      </div>
      <div className="relative bg-gray-200 dark:bg-gray-900 p-5 rounded-xl shadow">
        <div className="mb-4">
          <label className="form-label">Voter Address <span className="text-xs text-red-500">*</span></label>
          <input value={address} onChange={handleChange} onBlur={validateForm} className="form-input" type="text" name="address" placeholder="Enter Voter Address" autoFocus />
          <small className="mt-2 text-xs text-red-600 dark:text-red-500">{errors.address}</small>
        </div>
        <div className="mb-4">
          <label className="form-label">Voter Name</label>
          <input value={name} onChange={handleChange} onBlur={validateForm} className="form-input" type="text" name="name" placeholder="Enter Voter Name" />
          <small className="mt-2 text-xs text-red-600 dark:text-red-500">{errors.name}</small>
        </div>
        <div className="mb-4">
          <label className="form-label">Voter Email</label>
          <input value={email} onChange={handleChange} onBlur={validateForm} className="form-input" type="text" name="email" placeholder="Enter Voter Email" />
          <small className="mt-2 text-xs text-red-600 dark:text-red-500">{errors.email}</small>
        </div>
        <div className="flex justify-end items-center">
          <Button onClick={handleSubmit} isEnabled={isFormValid} className="flex items-center gap-2">Add Voter <i className="bi bi-person-plus text-lg"></i></Button>
        </div>
      </div>
    </div>
  )
}
