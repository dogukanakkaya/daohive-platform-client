'use client'
import Breadcrumb from '@/components/Breadcrumb'
import Button from '@/components/Button'
import { useFormValidation } from '@/hooks'
import { useEffect, useState } from 'react'
import { Contract } from '@/utils/zod/contract'
import LoadingOverlay from '@/components/LoadingOverlay'
import { withLoading, withLoadingToastr } from '@/utils/hof'
import { api } from '@/utils/api'
import { useRouter } from 'next/navigation'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import InfoCard from '@/components/InfoCard'
import { voterGroupQuery } from '@/queries'
import { VoterGroupsResponse } from '@/types/voter-group'
import { Database } from '@/types/supabase'

export default function Create() {
  const supabase = createClientComponentClient<Database>()
  const [voterGroups, setVoterGroups] = useState<VoterGroupsResponse>([])
  const [loading, setLoading] = useState(false)
  const { state: { name, description, voterGroup }, errors, handleChange, validateForm, isFormValid } = useFormValidation({ name: '', description: '', voterGroup: '0' }, Contract)
  const router = useRouter()

  useEffect(() => {
    !async function () {
      const { data, error } = await voterGroupQuery().getVoterGroups()
      if (error) return
      setVoterGroups(data)
    }()
  }, [])

  const handleSubmit = withLoading(withLoadingToastr(async () => {
    const { voter_group_voters } = await voterGroupQuery().getVoterGroup(voterGroup as unknown as number, `
      voter_group_voters (
        voters (address)
      )
    `)

    const whitelist = voter_group_voters.map(({ voters }) => voters?.address)

    const { data: { session } } = await supabase.auth.getSession()
    await api.post<{ contractAddress: string }>('/deploy', { name, description, whitelist }, {
      headers: {
        Authorization: `Bearer ${session?.access_token}`
      }
    })

    router.replace('/contracts')
  }), setLoading)

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Breadcrumb items={[{ name: 'Contracts', href: '/contracts' }, { name: 'Create', href: '/contracts/create' }]} />
      </div>
      <InfoCard messages={[
        'Be aware, to update contract name, description or whitelist you will need to pay transaction fees since these values will be stored in the blockchain.',
        'Updating the voters in a group will not update the whitelisted users in the contract. You can update the whitelist from the contract detail page.'
      ]} />
      <div className="relative bg-white dark:bg-gray-900 p-5 rounded-xl shadow">
        {loading && <LoadingOverlay />}
        <div className="mb-4">
          <label className="form-label">Contract Name <span className="text-xs text-red-500">*</span></label>
          <input value={name} onChange={handleChange} onBlur={validateForm} className="form-input" type="text" name="name" placeholder="Enter Contract Name" autoFocus />
          <small className="mt-2 text-xs text-red-600 dark:text-red-500">{errors.name}</small>
        </div>
        <div className="mb-4">
          <label className="form-label">Contract Description</label>
          <input value={description} onChange={handleChange} onBlur={validateForm} className="form-input" type="text" name="description" placeholder="Enter Contract Description" />
          <small className="mt-2 text-xs text-red-600 dark:text-red-500">{errors.description}</small>
        </div>
        <div className="mb-4">
          <label className="form-label">Whitelist Group</label>
          <select value={voterGroup} onChange={handleChange} className="form-input" name="voterGroup">
            <option value="">Select group</option>
            {voterGroups.map(voterGroup => <option key={voterGroup.id} value={voterGroup.id}>{voterGroup.name}</option>)}
          </select>
        </div>
        <div className="flex justify-end items-center">
          <Button onClick={handleSubmit} isEnabled={isFormValid} className="flex items-center gap-2">Deploy Contract <i className="bi bi-cloud-upload text-lg"></i></Button>
        </div>
      </div>
    </div>
  )
}
