'use client'
import ProposalCard from './ProposalCard'
import { useEffect, useState } from 'react'
import { services } from '@/utils/api'
import { ethers } from 'ethers'
import { provider } from '@/utils/contract'
import { authQuery } from '@/modules/auth'

interface Props {
  proposals: { id: string, metadata_id: string }[] // @todo(3): instead of id, it'll be typeof joined contract query result 
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
