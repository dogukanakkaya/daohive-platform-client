'use client'
import ProposalCard from './ProposalCard'
import { useState } from 'react'
import { services } from '@/utils/api'
import { ethers } from 'ethers'
import { provider } from '@/utils/contract'
import { authQuery } from '@/modules/auth'
import { ProposalResponse } from '@/modules/proposal'
import useAbortableAsyncEffect from '@/hooks/useAbortableAsyncEffect'

interface Props {
  proposals: ProposalResponse<'id' | 'metadata_id'>[]
  contractAddress: string
}

export default function Proposal({ proposals, contractAddress }: Props) {
  const [deployedContract, setDeployedContract] = useState<ethers.Contract>()

  useAbortableAsyncEffect(async signal => {
    const { data: { session } } = await authQuery().getSession()
    const { data: abi } = await services.blockchain.get<ethers.InterfaceAbi>('/contracts/abi', {
      headers: {
        Authorization: `Bearer ${session?.access_token}`
      },
      signal
    })

    setDeployedContract(new ethers.Contract(contractAddress, abi, provider))
  }, [contractAddress])

  return (
    <div className="grid grid-cols-2 gap-4">
      {proposals.map(proposal => (
        <ProposalCard
          key={proposal.id}
          proposal={proposal}
          deployedContract={deployedContract}
        />
      ))}
    </div>
  )
}
