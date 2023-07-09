'use client'
import Button from '@/components/Button'
import { useFormValidation } from '@/hooks'
import { withLoadingToastr } from '@/utils/hof'
import { useRouter } from 'next/navigation'
import { nullifyEmpty } from '@/utils/parser'
import { VoterSchema, voterQuery } from '@/modules/voter'

export default function VoterForm() {
  const { state: { address, name, email }, errors, handleChange, validateForm, isFormValid } = useFormValidation({ address: '', name: '', email: '' }, VoterSchema)
  const router = useRouter()

  const handleSubmit = withLoadingToastr(async () => {
    await voterQuery().createVoter({ address, name: nullifyEmpty(name), email: nullifyEmpty(email) })
    router.refresh(); router.replace('/voters')
  })

  return (
    <div className="relative bg-white dark:bg-gray-900 p-5 rounded-xl shadow">
      <div className="mb-4">
        <label className="form-label">Voter Address <span className="text-xs text-red-500">*</span></label>
        <input value={address} onChange={handleChange} onBlur={validateForm} className="form-input" type="text" name="address" placeholder="Enter voter address" autoFocus />
        <small className="mt-2 text-xs text-red-600 dark:text-red-500">{errors.address}</small>
      </div>
      <div className="mb-4">
        <label className="form-label">Voter Name</label>
        <input value={name} onChange={handleChange} onBlur={validateForm} className="form-input" type="text" name="name" placeholder="Enter voter name" />
        <small className="mt-2 text-xs text-red-600 dark:text-red-500">{errors.name}</small>
      </div>
      <div className="mb-4">
        <label className="form-label">Voter Email</label>
        <input value={email} onChange={handleChange} onBlur={validateForm} className="form-input" type="text" name="email" placeholder="Enter voter email" />
        <small className="mt-2 text-xs text-red-600 dark:text-red-500">{errors.email}</small>
      </div>
      <div className="flex justify-end items-center">
        <Button onClick={handleSubmit} isEnabled={isFormValid} className="flex items-center gap-2">Add Voter <i className="bi bi-person-plus text-lg"></i></Button>
      </div>
    </div>
  )
}