import { ExtraProposalProps, Metadata } from '@/modules/proposal'
import Image from 'next/image'

interface Props {
  proposal: { id: string } & ExtraProposalProps // @todo(3): instead of id, it'll be typeof joined contract query result 
}

export default function ProposalCard({ proposal }: Props) {
  return (
    <div className="shadow-lg bg-white dark:bg-gray-900 h-[350px]">
      <div className="flex">
        <Image src={proposal.metadata.image} width={300} height={350} className="h-[350px] object-cover" alt={proposal.metadata.name} />
        <div className="flex flex-col flex-grow gap-4 px-6 py-4">
          <ul className="flex justify-between gap-2 text-sm mb-4">
            <li><i className="bi bi-emoji-smile text-green-100"></i> <span className="font-bold">{Number(proposal.voteCount[0])}</span> approval</li>
            <li><i className="bi bi-emoji-frown text-red-100"></i> <span className="font-bold">{Number(proposal.voteCount[1])}</span> disapproval</li>
            <li><i className="bi bi-emoji-neutral"></i> {Number(proposal.voteCount[2])} neutral</li>
          </ul>
          <h1 className="text-2xl font-extrabold">{proposal.metadata.name}</h1>
          <p>{proposal.metadata.description}</p>
        </div>
      </div>
    </div>
  )
}
