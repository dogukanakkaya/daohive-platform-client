'use client'
import Button from '@/components/Button'
import { useFormValidation } from '@/hooks'
import { useState } from 'react'
import LoadingOverlay from '@/components/LoadingOverlay'
import { Proposal } from '@/utils/zod/proposal'
import { DateTime } from 'luxon'

const DEFAULT_START_TIME = DateTime.now().plus({ minutes: 5 }).toFormat('yyyy-MM-dd\'T\'T')
const DEFAULT_END_TIME = DateTime.now().plus({ days: 7, minutes: 5 }).toFormat('yyyy-MM-dd\'T\'T')

export default function ProposalForm() {
  const [loading, setLoading] = useState(false)
  const {
    state: { name, description, content, startAt, endAt },
    errors,
    handleChange,
    validateForm,
    isFormValid
  } = useFormValidation({ name: '', description: '', content: '', startAt: DEFAULT_START_TIME, endAt: DEFAULT_END_TIME }, Proposal)

  const handleSubmit = () => {

  }

  return (
    <div className="relative bg-white dark:bg-gray-900 p-5 rounded-xl shadow">
      {loading && <LoadingOverlay />}
      <div className="mb-4">
        <label className="form-label">Proposal Name <span className="text-xs text-red-500">*</span></label>
        <input value={name} onChange={handleChange} onBlur={validateForm} className="form-input" type="text" name="name" placeholder="Enter Proposal Name" autoFocus />
        <small className="mt-2 text-xs text-red-600 dark:text-red-500">{errors.name}</small>
      </div>
      <div className="mb-4">
        <label className="form-label">Proposal Description <span className="text-xs text-red-500">*</span></label>
        <input value={description} onChange={handleChange} onBlur={validateForm} className="form-input" type="text" name="description" placeholder="Enter Proposal Description" />
        <small className="mt-2 text-xs text-red-600 dark:text-red-500">{errors.description}</small>
      </div>
      <div className="mb-4">
        <label className="form-label">Proposal Content <span className="text-xs text-red-500">*</span></label>
        <input value={content} onChange={handleChange} onBlur={validateForm} className="form-input" type="text" name="content" placeholder="Enter Proposal Content" />
        <small className="mt-2 text-xs text-red-600 dark:text-red-500">{errors.content}</small>
      </div>
      <div className="mb-4">
        <label className="form-label">Proposal Starts at <span className="text-xs text-red-500">*</span></label>
        <input value={startAt} onChange={handleChange} onBlur={validateForm} className="form-input" type="datetime-local" name="startAt" />
        <small className="mt-2 text-xs text-red-600 dark:text-red-500">{errors.startAt}</small>
      </div>
      <div className="mb-4">
        <label className="form-label">Proposal Ends at <span className="text-xs text-red-500">*</span></label>
        <input value={endAt} onChange={handleChange} onBlur={validateForm} className="form-input" type="datetime-local" name="endAt" />
        <small className="mt-2 text-xs text-red-600 dark:text-red-500">{errors.endAt}</small>
      </div>
      <div className="flex justify-end items-center">
        <Button onClick={handleSubmit} isEnabled={isFormValid} className="flex items-center gap-2">Propose <i className="bi bi-journal-arrow-up text-lg"></i></Button>
      </div>
    </div>
  )
}
