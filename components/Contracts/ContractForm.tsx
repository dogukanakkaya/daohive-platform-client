'use client'
import Button from '@/components/Button'
import { useFormValidation } from '@/hooks'
import { useEffect, useState } from 'react'
import { Contract } from '@/utils/zod/contract'
import LoadingOverlay from '@/components/LoadingOverlay'
import { withLoading, withLoadingToastr } from '@/utils/hof'
import { api } from '@/utils/api'
import { useRouter } from 'next/navigation'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { voterGroupQuery } from '@/queries'
import { VoterGroupsResponse } from '@/types/voter-group'
import { Database } from '@/types/supabase'

export default function ContractForm() {
  const supabase = createClientComponentClient<Database>()
  const [voterGroups, setVoterGroups] = useState<VoterGroupsResponse>([])
  const [loading, setLoading] = useState(false)
  const { state: { name, description, voterGroup }, errors, handleChange, validateForm, isFormValid } = useFormValidation({ name: '', description: '', voterGroup: 0 }, Contract)
  const router = useRouter()

  useEffect(() => {
    !async function () {
      const { data, error } = await voterGroupQuery().getVoterGroups()
      if (error) return
      setVoterGroups(data)
    }()
  }, [])

  const handleSubmit = withLoading(withLoadingToastr(async () => {
    let whitelist: string[] = []

    if (voterGroup !== 0) {
      const { voter_group_voters } = await voterGroupQuery().getVoterGroup(voterGroup, `
        voter_group_voters (
          voters (address)
        )
      `)

      whitelist = voter_group_voters
        .filter((group): group is { voters: NonNullable<typeof group['voters']> } => group.voters !== null)
        .map(({ voters }) => voters?.address)
    }

    const { data: { session } } = await supabase.auth.getSession()
    await api.post<{ contractAddress: string }>('/deploy', { name, description, whitelist }, {
      headers: {
        Authorization: `Bearer ${session?.access_token}`
      }
    })

    router.replace('/contracts')
  }), setLoading)

  return (
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
  )
}
