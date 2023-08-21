'use client'
import Button from '@/components/Button'
import { useFormValidation } from '@/hooks'
import { useCallback, useState } from 'react'
import LoadingOverlay from '@/components/LoadingOverlay'
import { DateTime } from 'luxon'
import { useDropzone } from 'react-dropzone'
import Image from 'next/image'
import { withLoading, withLoadingToastr } from '@/utils/hof'
import { useParams } from 'next/navigation'
import { ProposalSchema } from '@/modules/proposal'
import Editor from '@/components/Editor/Editor'
import { useRouter } from 'next/navigation'
import { useMutation } from '@apollo/client'
import { gql } from '@/__generated__/graphql'
import { generateFileHash } from '@/utils/file'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '@/supabase.types'

const DEFAULT_START_TIME = DateTime.now().plus({ minutes: 5 }).toFormat('yyyy-MM-dd\'T\'T')
const DEFAULT_END_TIME = DateTime.now().plus({ days: 7, minutes: 5 }).toFormat('yyyy-MM-dd\'T\'T')

export default function ProposalForm() {
  const supabase = createClientComponentClient<Database>()
  const [loading, setLoading] = useState(false)
  const [file, setFile] = useState<File>()
  const {
    state: { name, description, content, startAt, endAt },
    setState: setProposalState,
    errors,
    handleChange,
    validateForm,
    isFormValid
  } = useFormValidation({ name: '', description: '', content: '', startAt: DEFAULT_START_TIME, endAt: DEFAULT_END_TIME }, ProposalSchema)
  const params = useParams()
  const router = useRouter()

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFile(acceptedFiles[0])
  }, [])
  const { getRootProps, getInputProps } = useDropzone({ onDrop, maxFiles: 1, accept: { 'image/*': [] } })

  const [addMutation] = useMutation(gql(`
    mutation AddProposal ($input: AddProposalInput!) {
      addProposal(input: $input) {
        id
      }
    }
  `))

  const handleSubmit = withLoading(withLoadingToastr(async () => {
    if (!file) throw new Error('Please upload a banner image and try again.')
    const fileHash = await generateFileHash(file)
    const image = `${fileHash}.${file.name.split('.').pop()}`
    const { data: { user } } = await supabase.auth.getUser()
    const { error } = await supabase.storage.from('platform').upload(`${user?.id}/${image}`, file)
    if (error && 'statusCode' in error && error.statusCode !== '409') throw new Error('An error occured while uploading the file.')

    await addMutation({
      variables: { input: { address: params.address as string, name, description, content, startAt, endAt, image } }
    })

    router.refresh(); router.replace(`/contracts/${params.address}`)
  }), setLoading)

  return (
    <div className="relative bg-white dark:bg-gray-900 p-5 rounded-xl shadow">
      {loading && <LoadingOverlay />}
      <div className="mb-4">
        <label className="form-label">Proposal Banner Image <span className="text-xs text-red-500">*</span></label>
        <div
          className={`h-[400px] flex-center rounded-lg border bg-dropzone-stripe dark:border-gray-600 dark:bg-gray-700 cursor-pointer ${!file && 'hover:ring-2 ring-primary hover:border-primary'}`}
          {...getRootProps()}
        >
          <input {...getInputProps()} />
          {
            file ? <Image src={URL.createObjectURL(file)} width={720} height={720} className="max-h-full object-contain" alt="" /> : <p>Drag and drop some files here, or click to select files</p>
          }
        </div>
      </div>
      <div className="mb-4">
        <label className="form-label">Proposal Name <span className="text-xs text-red-500">*</span></label>
        <input value={name} onChange={handleChange} onBlur={validateForm} className="form-input" type="text" name="name" placeholder="Enter proposal name" />
        <small className="mt-2 text-xs text-red-600 dark:text-red-500">{errors.name}</small>
      </div>
      <div className="mb-4">
        <label className="form-label">Proposal Description <span className="text-xs text-red-500">*</span></label>
        <textarea value={description} onChange={handleChange} onBlur={validateForm} className="form-input" rows={3} name="description" placeholder="Enter proposal description" />
        <small className="mt-2 text-xs text-red-600 dark:text-red-500">{errors.description}</small>
      </div>
      <div className="mb-4">
        <label className="form-label">Proposal Content&nbsp;
          <span className="text-xs text-red-500">*</span> &nbsp;
          <span className="text-xs text-gray-400">(<a href="https://www.markdownguide.org/basic-syntax/" target="_blank">Markdown</a> syntax is allowed)</span>
        </label>
        <Editor
          height={400}
          value={content}
          onChange={value => setProposalState(prevState => ({ ...prevState, content: value ?? '' }))}
          onBlur={() => validateForm({ target: { name: 'content' } } as React.ChangeEvent<any>)}
          textareaProps={{
            placeholder: 'Enter Proposal Content'
          }}
        />
        <small className="mt-2 text-xs text-red-600 dark:text-red-500">{errors.content}</small>
      </div>
      <div className="sm:grid grid-cols-2 gap-4">
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
      </div>
      <div className="flex justify-end items-center">
        <Button onClick={handleSubmit} isEnabled={isFormValid} className="flex items-center gap-2">Propose <i className="bi bi-journal-arrow-up text-lg"></i></Button>
      </div>
    </div>
  )
}
