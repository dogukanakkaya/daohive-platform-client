'use client'
import Button, { Variant } from '@/components/Button'
import { useFormValidation } from '@/hooks'
import { useState } from 'react'
import LoadingOverlay from '@/components/LoadingOverlay'
import { withLoading, withLoadingToastr } from '@/utils/hof'
import { useRouter } from 'next/navigation'
import { VoterGroupResponse, voterGroupQuery } from '@/modules/voter-group'
import { ContractSchema } from '@/modules/contract'
import { useLazyQuery, useMutation } from '@apollo/client'
import { gql } from '@/__generated__/graphql'

interface Props {
  voterGroups: VoterGroupResponse<'id' | 'name'>[]
}

export default function ContractForm({ voterGroups }: Props) {
  const [loading, setLoading] = useState(false)
  const {
    state: { name, description, voterGroupId, restriction },
    errors,
    handleChange,
    validateForm,
    isFormValid
  } = useFormValidation({ name: '', description: '', voterGroupId: '', restriction: 'public' }, ContractSchema)
  const router = useRouter()

  const [deployMutation] = useMutation(gql(`
    mutation DeployContract ($input: DeployContractInput!) {
      deployContract(input: $input) {
        address
      }
    }
  `))

  const [execPreDeploy, { data: preDeployData, loading: preDeployLoading }] = useLazyQuery(gql(`
    query PreDeployContract ($input: DeployContractInput!) {
      preDeployContract(input: $input) {
        transactionFee {
          usd
          matic
        }
      }
    }
  `))
  const transactionFee = preDeployData?.preDeployContract.transactionFee

  const handleCalculateFee = () => {
    execPreDeploy({
      variables: { input: { name, description, voterGroupId, restriction } }
    })
  }

  const handleSubmit = withLoading(withLoadingToastr(async () => {
    await deployMutation({
      variables: { input: { name, description, voterGroupId, restriction } }
    })

    router.refresh(); router.replace('/contracts')
  }), setLoading)

  return (
    <div className="relative bg-white dark:bg-gray-900 p-5 rounded-xl shadow">
      {loading && <LoadingOverlay />}
      <div className="mb-4">
        <label className="form-label">Contract Name <span className="text-xs text-red-500">*</span></label>
        <input value={name} onChange={handleChange} onBlur={validateForm} className="form-input" type="text" name="name" placeholder="Enter contract name" autoFocus />
        <small className="mt-2 text-xs text-red-600 dark:text-red-500">{errors.name}</small>
      </div>
      <div className="mb-4">
        <label className="form-label">Contract Description</label>
        <textarea value={description} onChange={handleChange} onBlur={validateForm} className="form-input" rows={3} name="description" placeholder="Enter contract description" />
        <small className="mt-2 text-xs text-red-600 dark:text-red-500">{errors.description}</small>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div className={`mb-4 ${restriction === 'private' ? 'col-span-1' : 'col-span-3'}`}>
          <label className="form-label">Voting Restriction</label>
          <select value={restriction} onChange={handleChange} onBlur={validateForm} className="form-input" name="restriction">
            <option value="private">Private</option>
            <option value="public">Public</option>
          </select>
          <small className="mt-2 text-xs text-red-600 dark:text-red-500">{errors.restriction}</small>
        </div>
        {/* <div className="mb-4">
          <label className="form-label">Immutability</label>
          <select value={voterGroupId} onChange={handleChange} className="form-input" name="voterGroupId">
            <option value="Fuly ">Private</option>
            <option value="public">Private</option>
          </select>
        </div> */}
        {
          restriction === 'private' && (
            <div className="mb-4 col-span-2">
              <label className="form-label">Whitelist Group</label>
              <select value={voterGroupId} onChange={handleChange} onBlur={validateForm} className="form-input" name="voterGroupId">
                <option value="">Select group</option>
                {voterGroups.map(voterGroup => <option key={voterGroup.id} value={voterGroup.id}>{voterGroup.name}</option>)}
              </select>
              <small className="mt-2 text-xs text-red-600 dark:text-red-500">{errors.voterGroupId}</small>
            </div>
          )
        }
      </div>
      <div className="flex justify-between items-center">
        <div className="flex flex-col relative p-2">
          {preDeployLoading && <LoadingOverlay />}
          <span>
            Transaction fee:&nbsp;
            {transactionFee && <><b className="font-semibold">{transactionFee.usd.toFixed(6)}$</b> ({transactionFee.matic.toFixed(6)} MATIC)</>}
          </span>
          <span className="text-xs">(Remember that these numbers are approximate and may vary at the time of deployment.)</span>
        </div>
        <div className="flex gap-4">
          <Button onClick={handleCalculateFee} variant={Variant.Tertiary} className="flex items-center gap-2">Calculate Fee {preDeployLoading ? <i className="bi bi-arrow-repeat text-lg inline-block animate-spin"></i> : <i className="bi bi-calculator text-lg"></i>}</Button>
          <Button onClick={handleSubmit} isEnabled={isFormValid} className="flex items-center gap-2">Deploy Contract <i className="bi bi-cloud-upload text-lg"></i></Button>
        </div>
      </div>
    </div>
  )
}
