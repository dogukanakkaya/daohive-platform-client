'use client'
import { gql } from '@/__generated__/graphql'
import { ProposalQuery } from '@/__generated__/graphql/graphql'
import Tooltip from '@/components/Tooltip'
import { useQuery } from '@apollo/client'
import { DateTime } from 'luxon'
import Image from 'next/image'
import { useInView } from 'react-intersection-observer'

interface Props {
  id: string
}

export default function ProposalCard({ id }: Props) {
  const { ref, inView } = useInView({ threshold: 0 })

  const { data } = useQuery(gql(`
    query Proposal($id: ID!){
      proposal(id: $id) {
        approvalCount
        disapprovalCount
        neutralCount
        startAt
        endAt
        metadata {
          name
          description
          image
        }
      }
    }
  `), {
    variables: { id },
    skip: !inView
  })

  const proposal = data?.proposal

  const renderStatusComponent = (proposal: ProposalQuery['proposal']) => {
    const startAt = (proposal.startAt * 1000) || 0
    const endAt = (proposal.endAt * 1000) || 0

    if (Date.now() > endAt) {
      return (
        <Tooltip text={<>Ended at <span className="font-semibold">{DateTime.fromMillis(endAt).toFormat('yyyy-MM-dd T')}</span></>}>
          <span className="inline-flex gap-1 px-2 py-1 text-xs rounded-xl bg-gray-300 dark:bg-gray-700">
            Inactive
            <span className="absolute right-0 top-0 flex h-2 w-2">
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
            </span>
          </span>
        </Tooltip>
      )
    }

    if (Date.now() > startAt && Date.now() < endAt) {
      return (
        <Tooltip text={<>Ends at <span className="font-semibold">{DateTime.fromMillis(endAt).toFormat('yyyy-MM-dd T')}</span></>}>
          <span className="inline-flex gap-1 px-2 py-1 text-xs rounded-xl bg-gray-300 dark:bg-gray-700">
            Active
            <span className="absolute right-0 top-0 flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
          </span>
        </Tooltip>
      )
    }

    return (
      <Tooltip text={<>Starts at <span className="font-semibold">{DateTime.fromMillis(startAt).toFormat('yyyy-MM-dd T')}</span></>}>
        <span className="inline-flex gap-1 px-2 py-1 text-xs rounded-xl bg-gray-300 dark:bg-gray-700">
          Pending
          <span className="absolute right-0 top-0 flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
          </span>
        </span>
      </Tooltip>
    )
  }

  return (
    <div ref={ref} className="relative flex flex-col gap-4 p-4 shadow-lg bg-white dark:bg-gray-900 rounded-xl">
      {
        proposal ? (
          <>
            <Image src={proposal.metadata.image} width={500} height={350} className="w-full h-[350px] object-cover rounded-xl" alt={proposal.metadata.name} />
            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-center mb-2">
                <ul className="flex gap-4 text-sm">
                  <li><i className="bi bi-emoji-smile text-green-100"></i> <span className="font-bold">{proposal.approvalCount}</span></li>
                  <li><i className="bi bi-emoji-frown text-red-100"></i> <span className="font-bold">{proposal.disapprovalCount}</span></li>
                  <li><i className="bi bi-emoji-neutral"></i> {proposal.neutralCount}</li>
                </ul>
                {renderStatusComponent(proposal)}
              </div>
              <div className="break-all">
                <h1 className="text-xl md:text-2xl font-extrabold mb-2">{proposal.metadata.name}</h1>
                <p>{proposal.metadata.description}</p>
              </div>
            </div>
          </>
        ) : <PlaceholderContent />
      }
    </div>
  )
}

function PlaceholderContent() {
  return (
    <div className="relative flex flex-col gap-4 shadow-lg bg-white dark:bg-gray-900 rounded-xl animate-pulse">
      <div className="bg-slate-500 dark:bg-slate-700 w-full h-[350px] rounded-xl"></div>
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center mb-2">
          <div className="w-28 h-5 bg-slate-500 dark:bg-slate-700 rounded"></div>
          <div className="w-16 h-5 bg-slate-500 dark:bg-slate-700 rounded"></div>
        </div>
        <div>
          <div className="w-2/3 h-5 bg-slate-500 dark:bg-slate-700 rounded mb-2"></div>
          <div className="h-3 bg-slate-500 dark:bg-slate-700 rounded mb-2"></div>
          <div className="h-3 bg-slate-500 dark:bg-slate-700 rounded"></div>
        </div>
      </div>
    </div>
  )
}
