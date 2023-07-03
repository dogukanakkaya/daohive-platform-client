'use client'
import ProposalCard from './ProposalCard'
import { useMemo } from 'react'
import { ethers } from 'ethers'
import { provider } from '@/utils/contract'
import { ProposalResponse } from '@/modules/proposal'

interface Props {
  proposals: ProposalResponse<'id'>[]
  contractAddress: string
  abi: ethers.InterfaceAbi
}

export default function ProposalList({ proposals, contractAddress, abi }: Props) {
  const deployedContract = useMemo(() => new ethers.Contract(contractAddress, abi, provider), [contractAddress, abi])

  return (
    <div className="border-t-4 dark:border-gray-700">
      <h1 className="section-title">Proposals</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-8">
        {proposals.map(proposal => (
          <ProposalCard
            key={proposal.id}
            proposal={proposal}
            deployedContract={deployedContract}
          />
        ))}
      </div>
    </div>
  )
}
