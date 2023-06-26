import { ContractsResponse } from '@/types/contract'
import Image from 'next/image'
import Link from 'next/link'

interface Props {
  contract: ContractsResponse[number] & { totalProposals: number, totalVoters: number, activeProposals: number } // @todo temporary until we have these values in database
}

export default function ContractCard({ contract }: Props) {
  return (
    <div className="bg-gray-200 dark:bg-gray-700 shadow-lg rounded-lg">
      <div className="p-5 flex items-center md:flex-row flex-col">
        <div className="h-26 w-26 md:w-52 md:h-52 md:mr-5">
          <Image src="/images/smart-contract.png" width={250} height={250} className="w-full h-full object-contain" alt="Smart Contract" />
        </div>
        <div className="flex-grow md:text-left text-center mt-6 md:mt-0">
          <h1 className="text-2xl font-semibold mb-2">{contract.name}</h1>
          <p>{contract.description}</p>
          <div className="flex items-center justify-center md:justify-start gap-4 my-2">
            <div className="flex gap-2 pr-2 h-full items-center">
              <i className="bi bi-check2-circle text-xl text-green-500"></i>
              <p className="font-medium">Python</p>
            </div>
            <div className="flex gap-2 pr-2 h-full items-center">
              <i className="bi bi-check2-circle text-xl text-green-500"></i>
              <p className="font-medium">Javascript</p>
            </div>
            <div className="flex gap-2 pr-2 h-full items-center">
              <i className="bi bi-x-circle text-xl text-red-500"></i>
              <p className="font-medium">Java</p>
            </div>
            <div className="flex gap-2 pr-2 h-full items-center">
              <i className="bi bi-x-circle text-xl text-red-500"></i>
              <p className="font-medium">C#</p>
            </div>
          </div>
          <div className="flex flex-wrap">
            <div className="w-1/2 lg:w-1/4 mb-2 lg:mb-0">
              <h2>Contract Address</h2>
              <p className="text-sm">{contract.address?.slice(0, 6)}...{contract.address?.slice(contract.address.length - 4)}</p>
            </div>
            <div className="w-1/2 lg:w-1/4 mb-2 lg:mb-0">
              <h2>Total Proposals</h2>
              <p className="text-sm"><span className="font-medium">{contract.totalProposals}</span> / <span className="text-green-500">12</span> / <span className="text-red-500">5</span></p>
            </div>
            <div className="w-1/2 lg:w-1/4 mb-2 lg:mb-0">
              <h2>Total Voters <span className="text-xs">(Now)</span></h2>
              <p className="text-sm">{contract.totalVoters}</p>
            </div>
            <div className="w-1/2 lg:w-1/4 mb-2 lg:mb-0">
              <h2>Active Proposals</h2>
              <p className="text-sm">{contract.activeProposals}</p>
            </div>
          </div>
          <Link href={`/contracts/${contract.id}`} className="mt-2 text-indigo-500 flex items-center gap-2">
            Show More
            <i className="bi bi-box-arrow-up-right"></i>
          </Link>
        </div>
      </div>
    </div>
  )
}
