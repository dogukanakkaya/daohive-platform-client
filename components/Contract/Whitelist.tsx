'use client'
import { VoterResponse, VoterSchema, voterQuery } from '@/modules/voter'
import Tooltip from '../Tooltip'
import { useState } from 'react'
import { withLoading, withLoadingToastr } from '@/utils/hof'
import { services } from '@/utils/api'
import Button, { Variant } from '../Button'
import Dialog from '../Dialog'
import { useEffectState, useFormValidation } from '@/hooks'
import { nullifyEmpty } from '@/utils/parser'
import LoadingOverlay from '../LoadingOverlay'

interface Props {
  whitelist: VoterResponse<'address' | 'name'>[]
  contractAddress: string
}

export default function Whitelist({ whitelist, contractAddress }: Props) {
  const {
    state: { address, name, email },
    errors,
    handleChange,
    validateForm,
    isFormValid,
    reset
  } = useFormValidation({ address: '', name: '', email: '' }, VoterSchema)
  const [data, setData] = useEffectState(whitelist)
  const [addToVoters, setAddToVoters] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [remove, setRemove] = useState('')
  const [loading, setLoading] = useState(false)

  const handleRemove = (address: string) => remove === address ? withLoading(withLoadingToastr(async () => {
    setRemove('')
    await services.blockchain.delete(`/contracts/${contractAddress}/whitelist`, { data: { voterAddresses: [address] } })
    setData(data.filter(voter => voter.address !== address))
  }), setLoading)() : setRemove(address)

  const handleSubmit = withLoading(withLoadingToastr(async () => {
    await services.blockchain.post(`/contracts/${contractAddress}/whitelist`, { voterAddresses: [address] })

    if (addToVoters) {
      await voterQuery().createVoter({ address, name: nullifyEmpty(name), email: nullifyEmpty(email) })
    }

    setData([...data, { address, name }])
    setIsDialogOpen(false)
    reset()
  }), setLoading)

  return (
    <div className="border-t-4 dark:border-gray-700">
      <div className="flex items-center gap-2">
        <h1 className="section-title">Whitelisted Voters</h1>
        <Button onClick={() => setIsDialogOpen(true)} variant={Variant.Secondary} className="!py-1 !px-2"><i className="bi bi-plus text-lg"></i></Button>
      </div>
      <ul className="flex flex-wrap gap-4">
        {data.map(voter => (
          <li key={voter.address} className="bg-gray-300 dark:bg-gray-700 text-sm px-2 py-1 rounded-full">
            <span className="mr-2">{voter.address} {voter.name ? `- ${voter.name}` : ''}</span>
            <Tooltip text={remove === voter.address ? 'Confirm' : 'Delete'}>
              <span onClick={() => handleRemove(voter.address)} className="text-red-500 hover:text-red-600 cursor-pointer">
                {remove === voter.address ? <i className="bi bi-check-lg"></i> : <i className="bi bi-trash3"></i>}
              </span>
            </Tooltip>
          </li>
        ))}
      </ul>
      <Dialog title="Add new voter" isOpen={isDialogOpen} setIsOpen={setIsDialogOpen} className="relative">
        {loading && <LoadingOverlay />}
        <div className="mb-4">
          <label className="form-label">Voter Address <span className="text-xs text-red-500">*</span></label>
          <input value={address} onChange={handleChange} onBlur={validateForm} className="form-input" type="text" name="address" placeholder="Enter voter address" autoFocus />
          <small className="mt-2 text-xs text-red-600 dark:text-red-500">{errors.address}</small>
        </div>
        <div className="mb-4 flex items-center gap-2">
          <label className="form-label mb-0" htmlFor="addToVoters">Also add this to your voters if doesn&apos;t exists yet</label>
          <input value={String(addToVoters)} onChange={e => setAddToVoters(e.target.checked)} className="form-input" type="checkbox" name="addToVoters" id="addToVoters" />
        </div>
        {
          addToVoters && (
            <>
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
            </>
          )
        }
        <div className="flex items-center justify-end gap-2">
          <Button onClick={() => setIsDialogOpen(false)} variant={Variant.Secondary}>Cancel</Button>
          <Button onClick={handleSubmit} isEnabled={isFormValid}>Add</Button>
        </div>
      </Dialog>
    </div>
  )
}
