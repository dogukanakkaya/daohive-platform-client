'use client'
import { MergedContract } from '@/modules/contract'
import Image from 'next/image'
import Link from 'next/link'
import Tooltip from '../Tooltip'
import { useInView } from 'react-intersection-observer'
import { useAbortableAsyncEffect } from '@/hooks'
import { useState } from 'react'
import { services } from '@/utils/api'
import { authQuery } from '@/modules/auth'

interface Props {
  address: string
}

type ContractData = { address: string } & Partial<MergedContract<'address'>>

export default function ContractCard({ address }: Props) {
  const [contract, setContract] = useState<ContractData>({ address })
  const { ref, inView } = useInView({ threshold: 0 })

  useAbortableAsyncEffect(async signal => {
    if (inView && !contract.name) {
      const { data: { session } } = await authQuery().getSession()
      const { data } = await services.blockchain.get<ContractData>(`/contracts/${contract.address}`, {
        headers: {
          Authorization: `Bearer ${session?.access_token}`
        },
        signal
      })

      setContract({
        ...data,
        totalProposals: 17,
        activeProposals: 1
      })
    }
  }, [inView, contract])

  return (
    <div ref={ref} className="bg-white dark:bg-gray-900 shadow-lg rounded-lg">
      <div className="p-5 flex items-center md:flex-row flex-col">
        <div className="h-26 w-26 md:w-52 md:h-52 md:mr-5">
          <Image src="/images/smart-contract.png" width={250} height={250} className="w-full h-full object-contain" alt="Smart Contract" />
        </div>
        {
          contract.name ? (
            <div className="flex-grow md:text-left text-center mt-6 md:mt-0">
              <h1 className="dark:text-gray-50 dark:hover:text-gray-200 text-2xl font-semibold mb-2">
                <Link href={`/contracts/${contract.address}`}>{contract.name}</Link>
              </h1>
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
                <div className="w-1/2 xl:w-1/4 mb-2 xl:mb-0">
                  <h2>Contract Address</h2>
                  <Tooltip text="Copy Address" textAfterClick={<>Copied <i className="bi bi-check"></i></>}>
                    <p onClick={() => navigator.clipboard.writeText(contract.address!)} className="cursor-pointer text-gray-700 dark:text-gray-200 text-sm bg-gray-300 dark:bg-gray-700 rounded-xl py-1 px-2 w-max">
                      {contract.address.slice(0, 6)}...{contract.address?.slice(contract.address.length - 4)}
                    </p>
                  </Tooltip>
                </div>
                <div className="w-1/2 xl:w-1/4 mb-2 xl:mb-0">
                  <h2>Total Proposals</h2>
                  <p className="text-sm bg-gray-300 dark:bg-gray-700 rounded-xl py-1 px-2 inline-block">
                    <span className="font-medium">{contract.totalProposals}</span> / <span className="text-green-500">12</span> / <span className="text-red-500">5</span>
                  </p>
                </div>
                <div className="w-1/2 xl:w-1/4 mb-2 xl:mb-0">
                  <h2>Total Voters <span className="text-xs">(Now)</span></h2>
                  <p className="text-sm bg-gray-300 dark:bg-gray-700 rounded-xl py-1 px-2 inline-block">{contract.totalVoters}</p>
                </div>
                <div className="w-1/2 xl:w-1/4 mb-2 xl:mb-0">
                  <h2>Active Proposals</h2>
                  <p className="text-sm bg-gray-300 dark:bg-gray-700 rounded-xl py-1 px-2 inline-block">{contract.activeProposals}</p>
                </div>
              </div>
              <Link href={`/contracts/${contract.address}`} className="mt-2 text-indigo-500 flex items-center gap-2">
                Show More
                <i className="bi bi-box-arrow-up-right"></i>
              </Link>
            </div>
          ) : <PlaceholderContent contract={contract} />
        }
      </div>
    </div>
  )
}

function PlaceholderContent({ contract }: { contract: ContractData }) {
  return (
    <div className="animate-pulse flex-grow md:text-left text-center mt-6 md:mt-0">
      <div className="md:w-72 h-5 bg-slate-500 dark:bg-slate-700 rounded mb-2"></div>
      <div className="h-3 bg-slate-500 dark:bg-slate-700 rounded mb-2"></div>
      <div className="md:w-72 h-5 bg-slate-500 dark:bg-slate-700 rounded my-2"></div>
      <div className="flex flex-wrap">
        <div className="w-1/2 xl:w-1/4 mb-2 xl:mb-0">
          <h2>Contract Address</h2>
          <Tooltip text="Copy Address" textAfterClick={<>Copied <i className="bi bi-check"></i></>}>
            <p onClick={() => navigator.clipboard.writeText(contract.address!)} className="cursor-pointer text-gray-700 dark:text-gray-200 text-sm bg-gray-300 dark:bg-gray-700 rounded-xl py-1 px-2 w-max">
              {contract.address.slice(0, 6)}...{contract.address?.slice(contract.address.length - 4)}
            </p>
          </Tooltip>
        </div>
        <div className="w-1/2 xl:w-1/4 mb-2 xl:mb-0">
          <h2>Total Proposals</h2>
          <div className="w-20 h-6 bg-slate-500 dark:bg-slate-700 rounded-xl py-1 px-2"></div>
        </div>
        <div className="w-1/2 xl:w-1/4 mb-2 xl:mb-0">
          <h2>Total Voters <span className="text-xs">(Now)</span></h2>
          <div className="w-12 h-6 bg-slate-500 dark:bg-slate-700 rounded-xl py-1 px-2"></div>
        </div>
        <div className="w-1/2 xl:w-1/4 mb-2 xl:mb-0">
          <h2>Active Proposals</h2>
          <div className="w-12 h-6 bg-slate-500 dark:bg-slate-700 rounded-xl py-1 px-2"></div>
        </div>
      </div>
      <Link href={`/contracts/${contract.address}`} className="mt-2 text-indigo-500 flex items-center gap-2">
        Show More
        <i className="bi bi-box-arrow-up-right"></i>
      </Link>
    </div>
  )
}