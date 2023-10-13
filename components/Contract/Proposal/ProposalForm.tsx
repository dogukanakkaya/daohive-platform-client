'use client'
import Button, { Variant } from '@/components/Button'
import { useFormValidation } from '@/hooks'
import { useCallback, useMemo, useState } from 'react'
import LoadingOverlay from '@/components/LoadingOverlay'
import { DateTime } from 'luxon'
import { useDropzone } from 'react-dropzone'
import Image from 'next/image'
import { withLoading, withLoadingToastr } from '@/utils/hof'
import { useParams } from 'next/navigation'
import { ProposalSchema } from '@/modules/proposal'
import Editor from '@/components/Editor/Editor'
import { useRouter } from 'next/navigation'
import { useLazyQuery, useMutation } from '@apollo/client'
import { gql } from '@/__generated__/graphql'
import { generateFileHash } from '@/utils/file'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '@/supabase.types'
import Dialog from '@/components/Dialog'

const DEFAULT_START_TIME = DateTime.now().plus({ minutes: 5 }).toFormat('yyyy-MM-dd\'T\'T')
const DEFAULT_END_TIME = DateTime.now().plus({ days: 7, minutes: 5 }).toFormat('yyyy-MM-dd\'T\'T')

export default function ProposalForm() {
  const supabase = createClientComponentClient<Database>()
  const [loading, setLoading] = useState(false)
  const [isConfirmationDialogOpen, setIsConfirmationDialogOpen] = useState(false)
  const [file, setFile] = useState<File>()
  const imageSrc = useMemo(() => file ? URL.createObjectURL(file) : null, [file])
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

  const [execPreAdd, { data: preAdd }] = useLazyQuery(gql(`
    query PreAddProposal ($input: AddProposalInput!) {
      preAddProposal(input: $input) {
        transactionFee {
          usd
          matic
        }
      }
    }
  `))
  const transactionFee = preAdd?.preAddProposal.transactionFee

  const [addMutation] = useMutation(gql(`
    mutation AddProposal ($input: AddProposalInput!) {
      addProposal(input: $input) {
        id
      }
    }
  `))

  const getImageName = async () => {
    if (!file) throw new Error('Please upload a banner image and try again.')
    const fileHash = await generateFileHash(file)
    return `${fileHash}.${file.name.split('.').pop()}`
  }

  const handlePreSubmit = withLoading(async () => {
    const image = await getImageName()

    await execPreAdd({
      variables: { input: { address: params.address as string, name, description, content, startAt, endAt, image } }
    })
    setIsConfirmationDialogOpen(true)
  }, setLoading)

  const handleSubmit = withLoading(withLoadingToastr(async () => {
    const image = await getImageName()
    const { data: { user } } = await supabase.auth.getUser()
    const { error } = await supabase.storage.from('platform').upload(`${user?.id}/${image}`, file as File)
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
          className={`h-[400px] flex-center rounded-lg border bg-dropzone-stripe dark:border-gray-600 dark:bg-gray-700 cursor-pointer ${!file && 'hover:ring-2 ring-blue-600 hover:border-blue-600'}`}
          {...getRootProps()}
        >
          <input {...getInputProps()} />
          {
            imageSrc ? <Image src={imageSrc} width={720} height={720} className="max-h-full object-contain" alt="" /> : <p>Drag and drop some files here, or click to select files</p>
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
        <Button onClick={handlePreSubmit} isEnabled={isFormValid} className="flex items-center gap-2">Propose <i className="bi bi-journal-arrow-up text-lg"></i></Button>
      </div>
      {transactionFee && (
        <Dialog title="Confirm Transaction" isOpen={isConfirmationDialogOpen} setIsOpen={setIsConfirmationDialogOpen} className="relative">
          {loading && <LoadingOverlay />}
          <p>The transaction will cost <b>{transactionFee?.usd.toFixed(6)}$ ({transactionFee?.matic.toFixed(6)} MATIC)</b> approximately. Remember that the cost may vary a bit at the time of deployment depending on the network traffic.</p>
          <div className="flex items-center justify-end gap-4 mt-4">
            <Button onClick={() => setIsConfirmationDialogOpen(false)} variant={Variant.Secondary}>Cancel</Button>
            <Button onClick={handleSubmit}>Confirm <i className="bi bi-check-lg text-lg"></i></Button>
          </div>
        </Dialog>
      )}
    </div>
  )
}
