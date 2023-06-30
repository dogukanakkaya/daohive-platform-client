'use client'
import ProposalCard from './ProposalCard'
import { useEffect, useState } from 'react'
import { services } from '@/utils/api'
import { ethers } from 'ethers'
import { provider } from '@/utils/contract'
import { authQuery } from '@/modules/auth'
import { ProposalResponse } from '@/modules/proposal'

interface Props {
  proposals: ProposalResponse<'id' | 'metadata_id'>[]
  contractAddress: string
}

export default function Proposal({ proposals, contractAddress }: Props) {
  const [deployedContract, setDeployedContract] = useState<ethers.Contract>()

  useEffect(() => {
    !async function () {
      const { data: { session } } = await authQuery().getSession()
      const { data: abi } = await services.blockchain.get('/contracts/abi', {
        headers: {
          Authorization: `Bearer ${session?.access_token}`
        }
      })

      setDeployedContract(new ethers.Contract(contractAddress, abi, provider))
    }()
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
