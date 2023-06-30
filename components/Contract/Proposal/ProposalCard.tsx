'use client'
import { useAbortableAsyncEffect } from '@/hooks'
import { ExtraProposalProps, Metadata, ProposalResponse } from '@/modules/proposal'
import { services } from '@/utils/api'
import { ethers } from 'ethers'
import Image from 'next/image'
import { useState } from 'react'
import { useInView } from 'react-intersection-observer'

interface Props {
  proposal: ProposalResponse<'id'>
  deployedContract?: ethers.Contract
}

export default function ProposalCard({ proposal: _proposal, deployedContract }: Props) {
  const [proposal, setProposal] = useState<ProposalResponse<'id'> & Partial<ExtraProposalProps>>(_proposal)
  const { ref, inView } = useInView({ threshold: 0 })

  useAbortableAsyncEffect(async signal => {
    if (inView && deployedContract && !proposal.metadata) {
      const proposalOnChain = await deployedContract.proposals(proposal.id)
      const { data: metadata } = await services.default.get<Metadata>(proposalOnChain.uri, { signal })

      setProposal({
        ...proposal,
        metadata,
        approvalCount: Number(proposalOnChain.approvalCount),
        disapprovalCount: Number(proposalOnChain.disapprovalCount),
        neutralCount: Number(proposalOnChain.neutralCount),
        startAt: Number(proposalOnChain.startAt),
        endAt: Number(proposalOnChain.endAt)
      })
    }
  }, [inView, proposal, deployedContract])

  return (
    <div ref={ref} className="shadow-lg bg-white dark:bg-gray-900">
      {
        proposal.metadata ? (
          <div className="flex">
            <Image src={proposal.metadata.image} width={300} height={350} className="h-[350px] object-cover" alt={proposal.metadata.name} />
            <div className="flex flex-col flex-grow gap-4 px-6 py-4">
              <ul className="flex justify-between gap-2 text-sm mb-4">
                <li><i className="bi bi-emoji-smile text-green-100"></i> <span className="font-bold">{Number(proposal.approvalCount)}</span> approval</li>
                <li><i className="bi bi-emoji-frown text-red-100"></i> <span className="font-bold">{Number(proposal.disapprovalCount)}</span> disapproval</li>
                <li><i className="bi bi-emoji-neutral"></i> {Number(proposal.neutralCount)} neutral</li>
              </ul>
              <h1 className="text-2xl font-extrabold">{proposal.metadata.name}</h1>
              <p>{proposal.metadata.description}</p>
            </div>
          </div>
        ) : (
          <div className="animate-pulse flex">
            <div className="bg-slate-700 w-[300px] h-[350px]"></div>
            <div className="flex-1 space-y-6 py-1">
              <div className="flex flex-col flex-grow gap-4 px-6 py-4">
                <div className="h-4 bg-slate-700 rounded mb-4"></div>
                <div className="w-2/3 h-4 bg-slate-700 rounded col-span-2"></div>
                <div className="h-4 bg-slate-700 rounded"></div>
                <div className="h-4 bg-slate-700 rounded"></div>
                <div className="h-4 bg-slate-700 rounded"></div>
              </div>
            </div>
          </div>
        )
      }
    </div>
  )
}
