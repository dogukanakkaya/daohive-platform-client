'use client'
import Button, { Variant } from '@/components/Button'
import { useFormValidation } from '@/hooks'
import { useState } from 'react'
import LoadingOverlay from '@/components/LoadingOverlay'
import { withLoading, withLoadingToastr } from '@/utils/hof'
import { useRouter } from 'next/navigation'
import { VoterGroupResponse } from '@/modules/voter-group'
import { ContractSchema } from '@/modules/contract'
import { useLazyQuery, useMutation } from '@apollo/client'
import { gql } from '@/__generated__/graphql'
import Dialog from '../Dialog'

interface Props {
  voterGroups: VoterGroupResponse<'id' | 'name'>[]
}

export default function ContractForm({ voterGroups }: Props) {
  const {
    state: { name, description, voterGroupId, type },
    errors,
    handleChange,
    validateForm,
    isFormValid
  } = useFormValidation({ name: '', description: '', voterGroupId: '', type: 'VotingPrivate' }, ContractSchema)
  const [loading, setLoading] = useState(false)
  const [isConfirmationDialogOpen, setIsConfirmationDialogOpen] = useState(false)
  const router = useRouter()

  const [deployMutation] = useMutation(gql(`
    mutation DeployContract ($input: DeployContractInput!) {
      deployContract(input: $input) {
        address
      }
    }
  `))

  const [execPreDeploy, { data: preDeploy }] = useLazyQuery(gql(`
    query PreDeployContract ($input: DeployContractInput!) {
      preDeployContract(input: $input) {
        transactionFee {
          usd
          matic
        }
      }
    }
  `))
  const transactionFee = preDeploy?.preDeployContract.transactionFee

  const handlePreSubmit = withLoading(async () => {
    await execPreDeploy({
      variables: { input: { name, description, voterGroupId, type } }
    })
    setIsConfirmationDialogOpen(true)
  }, setLoading)

  const handleSubmit = withLoading(withLoadingToastr(async () => {
    await deployMutation({
      variables: { input: { name, description, voterGroupId, type } }
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
        <div className={`mb-4 ${type === 'private' ? 'col-span-1' : 'col-span-3'}`}>
          <label className="form-label">Voting Restriction</label>
          <select value={type} onChange={handleChange} onBlur={validateForm} className="form-input" name="restriction">
            <option value="private">Private</option>
            <option value="public">Public</option>
          </select>
          <small className="mt-2 text-xs text-red-600 dark:text-red-500">{errors.type}</small>
        </div>
        {
          type === 'VotingPrivate' && (
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
      <div className="flex items-center justify-end gap-4">
        <Button onClick={handlePreSubmit} isEnabled={isFormValid} className="flex items-center gap-2">Deploy Contract <i className="bi bi-cloud-upload text-lg"></i></Button>
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
