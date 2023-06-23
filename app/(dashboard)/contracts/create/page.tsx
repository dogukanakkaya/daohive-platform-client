'use client'
import Breadcrumb from '@/components/Breadcrumb'
import Button from '@/components/Button'
import TagInput from '@/components/TagInput'
import { useFormValidation } from '@/hooks'
import { useState } from 'react'
import { Contract } from './schema'
import LoadingOverlay from '@/components/LoadingOverlay'
import { withLoading } from '@/utils/hof'
import { api } from '@/utils/api'
import { useRouter } from 'next/navigation'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

enum WhitelistType {
  All = 'all',
  Manual = 'manual',
  Voters = 'voters',
  Contract = 'contract'
}

export default function Create() {
  const supabase = createClientComponentClient()
  const [whitelistType, setWhitelistType] = useState<WhitelistType>(WhitelistType.All)
  const [whitelist, setWhitelist] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const { state: { name, description }, errors, handleChange, validateForm, isFormValid } = useFormValidation({ name: '', description: '' }, Contract)
  const router = useRouter()

  const WHITELIST_TYPE_RENDER: Record<WhitelistType, JSX.Element> = Object.freeze({
    [WhitelistType.All]: <span className="block mt-8 text-sm font-medium"><i className="bi bi-info-circle"></i> All voters in your list will be whitelisted</span>,
    [WhitelistType.Manual]: (
      <>
        <label className="form-label">
          Addresses <span className="text-xs dark:text-gray-200">(Later you can relate your addresses with names from <span className="font-medium">Voters</span> menu to remember their belonging)</span>
        </label>
        <TagInput tags={whitelist} setTags={setWhitelist} type="text" name="whitelist" placeholder="Type and then press enter, comma or tab" />
      </>
    ),
    [WhitelistType.Voters]: <></>,
    [WhitelistType.Contract]: (
      <>
        <label className="form-label">Contract <span className="text-xs text-red-500">*</span></label>
        <select onChange={e => setWhitelistType(e.target.value as WhitelistType)} className="form-input" name="whitelistType" id="">
          <option value="">Select Contract</option>
          <option value="">Contract 1</option>
          <option value="">Contract 2</option>
          <option value="">Contract 3</option>
        </select>
      </>
    )
  })

  const handleSubmit = withLoading(async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession()
      await api.post<{ contractAddress: string }>('/deploy', { name, description, whitelist }, {
        headers: {
          Authorization: `Bearer ${session?.access_token}`
        }
      })
      router.push('/contracts')
    } catch (err) {
      console.log(err)
    }
  }, setLoading)

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Breadcrumb items={[{ name: 'Contracts', href: '/contracts' }, { name: 'Create', href: '/contracts/create' }]} />
      </div>
      <div className="relative bg-gray-200 dark:bg-gray-900 p-5 rounded-xl shadow">
        {loading && <LoadingOverlay />}
        <div className="mb-4">
          <label className="form-label">Contract Name <span className="text-xs text-red-500">*</span></label>
          <input value={name} onChange={handleChange} onBlur={validateForm} className="form-input" type="text" name="name" placeholder="Enter Contract Name" required autoFocus />
          <small className="mt-2 text-xs text-red-600 dark:text-red-500">{errors.name}</small>
        </div>
        <div className="mb-4">
          <label className="form-label">Contract Description</label>
          <input value={description} onChange={handleChange} onBlur={validateForm} className="form-input" type="text" name="description" placeholder="Enter Contract Description" />
          <small className="mt-2 text-xs text-red-600 dark:text-red-500">{errors.description}</small>
        </div>
        <div className="mb-4 grid grid-cols-4 gap-4">
          <div className="col-span-1">
            <label className="form-label">Whitelist</label>
            <select onChange={e => setWhitelistType(e.target.value as WhitelistType)} defaultValue={WhitelistType.All} className="form-input" name="whitelistType" id="">
              <option value={WhitelistType.All}>All voters</option>
              <option value={WhitelistType.Manual}>Enter manually</option>
              {/* <option value={WhitelistType.Voters}>Select from your voters</option> */}
              <option value={WhitelistType.Contract}>Copy from a contract</option>
            </select>
          </div>
          <div className="col-span-3">
            {WHITELIST_TYPE_RENDER[whitelistType]}
          </div>
        </div>
        <div className="flex justify-end items-center">
          <Button onClick={handleSubmit} isEnabled={isFormValid} className="flex items-center gap-2">Deploy Contract <i className="bi bi-cloud-upload text-lg"></i></Button>
        </div>
      </div>
    </div>
  )
}
