import { Metadata } from '@/modules/proposal'
import Image from 'next/image'

export default function ProposalCard({ metadata }: { metadata: Metadata }) {
  return (
    <div className="shadow-lg bg-white dark:bg-gray-900 h-[350px]">
      <div className="flex">
        <Image src={metadata.image} width={300} height={350} className="h-[350px] object-cover" alt={metadata.name} />
        <div className="flex flex-col flex-grow gap-4 px-6 py-4">
          <ul className="flex justify-between gap-2 text-sm mb-4">
            <li><i className="bi bi-emoji-smile text-green-100"></i> <span className="font-bold">17</span> approval</li>
            <li><i className="bi bi-emoji-frown text-red-100"></i> <span className="font-bold">12</span> disapproval</li>
            <li><i className="bi bi-emoji-neutral"></i> 1 neutral</li>
          </ul>
          <h1 className="text-2xl font-extrabold">{metadata.name}</h1>
          <p>{metadata.description}</p>
        </div>
      </div>
    </div>
  )
}
