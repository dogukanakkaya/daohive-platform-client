'use client'
import { VoterResponse, VoterSchema } from '@/modules/voter'
import Tooltip from '../Tooltip'
import { useState } from 'react'
import { withLoadingToastr } from '@/utils/hof'
import { services } from '@/utils/api'
import { authQuery } from '@/modules/auth'
import Button, { Variant } from '../Button'
import Dialog from '../Dialog'
import { useEffectState, useFormValidation } from '@/hooks'

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

  const handleRemove = (address: string) => remove === address ? withLoadingToastr(async () => {
    const { data: { session } } = await authQuery().getSession()
    await services.blockchain.delete(`/contracts/${contractAddress}/whitelist/${address}`, {
      headers: {
        Authorization: `Bearer ${session?.access_token}`
      }
    })
    setData(data.filter(voter => voter.address !== address))
    setRemove('')
  })() : setRemove(address)

  const handleSubmit = withLoadingToastr(async () => {
    const { data: { session } } = await authQuery().getSession()
    await services.blockchain.post(`/contracts/${contractAddress}/whitelist`, {
      addToVoters,
      name,
      email,
      voterAddress: address
    }, {
      headers: {
        Authorization: `Bearer ${session?.access_token}`
      }
    })

    setData([...data, { address, name }])
    setIsDialogOpen(false)
    reset()
  })

  return (
    <div>
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
      <Dialog title="Add new voter" isOpen={isDialogOpen} setIsOpen={setIsDialogOpen}>
        <div className="mb-4">
          <label className="form-label">Voter Address <span className="text-xs text-red-500">*</span></label>
          <input value={address} onChange={handleChange} onBlur={validateForm} className="form-input" type="text" name="address" placeholder="Enter Voter Address" autoFocus />
          <small className="mt-2 text-xs text-red-600 dark:text-red-500">{errors.address}</small>
        </div>
        <div className="mb-4 flex items-center gap-2">
          <label className="form-label mb-0">Also add this to your voters if doesn&apos;t exists yet</label>
          <input value={String(addToVoters)} onChange={e => setAddToVoters(e.target.checked)} className="form-input" type="checkbox" name="addToVoters" />
        </div>
        {
          addToVoters && (
            <>
              <div className="mb-4">
                <label className="form-label">Voter Name</label>
                <input value={name} onChange={handleChange} onBlur={validateForm} className="form-input" type="text" name="name" placeholder="Enter Voter Name" />
                <small className="mt-2 text-xs text-red-600 dark:text-red-500">{errors.name}</small>
              </div>
              <div className="mb-4">
                <label className="form-label">Voter Email</label>
                <input value={email} onChange={handleChange} onBlur={validateForm} className="form-input" type="text" name="email" placeholder="Enter Voter Email" />
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
