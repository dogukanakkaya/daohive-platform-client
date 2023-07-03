'use client'
import { VoterResponse } from '@/modules/voter'
import Tooltip from '../Tooltip'
import { useState } from 'react'
import { withLoadingToastr } from '@/utils/hof'
import { services } from '@/utils/api'
import { authQuery } from '@/modules/auth'

interface Props {
  whitelist: VoterResponse<'address' | 'name'>[]
  contractAddress: string
}

export default function Whitelist({ whitelist, contractAddress }: Props) {
  const [remove, setRemove] = useState('')

  const handleRemove = (address: string) => remove === address ? withLoadingToastr(async () => {
    const { data: { session } } = await authQuery().getSession()
    await services.blockchain.delete(`/contracts/${contractAddress}/whitelist/${address}`, {
      headers: {
        Authorization: `Bearer ${session?.access_token}`
      }
    })
    setRemove('')
  })() : setRemove(address)

  return (
    <div>
      <h1 className="section-title">Whitelisted Voters</h1>
      <ul className="flex flex-wrap gap-4">
        {whitelist.map(voter => (
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
    </div>
  )
}
