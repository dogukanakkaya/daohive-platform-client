'use client'
import Button from '@/components/Button'
import { useFormValidation } from '@/hooks'
import { useCallback, useState } from 'react'
import LoadingOverlay from '@/components/LoadingOverlay'
import { Proposal } from '@/utils/zod/proposal'
import { DateTime } from 'luxon'
import { useDropzone } from 'react-dropzone'
import Image from 'next/image'
import { toast } from 'react-toastify'
import { api } from '@/utils/api'
import { withLoading, withLoadingToastr } from '@/utils/hof'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '@/types/supabase'
import { useParams } from 'next/navigation'

const DEFAULT_START_TIME = DateTime.now().plus({ minutes: 5 }).toFormat('yyyy-MM-dd\'T\'T')
const DEFAULT_END_TIME = DateTime.now().plus({ days: 7, minutes: 5 }).toFormat('yyyy-MM-dd\'T\'T')

export default function ProposalForm() {
  const supabase = createClientComponentClient<Database>()
  const [loading, setLoading] = useState(false)
  const [file, setFile] = useState<File & { preview: string }>()
  const {
    state: { name, description, content, startAt, endAt },
    errors,
    handleChange,
    validateForm,
    isFormValid
  } = useFormValidation({ name: '', description: '', content: '', startAt: DEFAULT_START_TIME, endAt: DEFAULT_END_TIME }, Proposal)
  const params = useParams()

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const acceptedFile = Object.assign(acceptedFiles[0], {
      preview: URL.createObjectURL(acceptedFiles[0])
    })

    setFile(acceptedFile)
  }, [])
  const { getRootProps, getInputProps } = useDropzone({ onDrop, maxFiles: 1, accept: { 'image/*': [] } })

  const handleSubmit = withLoading(withLoadingToastr(async () => {
    if (!file) {
      toast.error('Please upload a banner image and try again.')
      return
    }

    const formData = new FormData()
    formData.set('contractId', params.id)
    formData.set('name', name)
    formData.set('description', description)
    formData.set('content', content)
    formData.set('startAt', startAt)
    formData.set('endAt', endAt)
    formData.set('banner', file)

    const { data: { session } } = await supabase.auth.getSession()
    await api.post('/proposals', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${session?.access_token}`
      }
    })
  }), setLoading)

  return (
    <div className="relative bg-white dark:bg-gray-900 p-5 rounded-xl shadow">
      {loading && <LoadingOverlay />}
      <div className="mb-4">
        <label className="form-label">Proposal Banner Image <span className="text-xs text-red-500">*</span></label>
        <div className="h-72 flex-center dark:bg-gray-800" {...getRootProps()}>
          <input {...getInputProps()} />
          {
            file ? <Image src={file.preview} width={720} height={720} className="max-h-full object-contain" alt="" /> : <p>Drag drop some files here, or click to select files</p>
          }
        </div>
        <small className="mt-2 text-xs text-red-600 dark:text-red-500">{errors.name}</small>
      </div>
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
