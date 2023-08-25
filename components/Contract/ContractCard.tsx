'use client'
import Image from 'next/image'
import Link from 'next/link'
import Tooltip from '../Tooltip'
import { useInView } from 'react-intersection-observer'
import { useQuery } from '@apollo/client'
import { gql } from '@/__generated__/graphql'
import { ContractResponse, ContractType } from '@/modules/contract'

interface Props {
  contract: ContractResponse<'address' | 'type'>
}

export default function ContractCard({ contract: _contract }: Props) {
  const { ref, inView } = useInView({ threshold: 0 })

  const { data } = useQuery(gql(`
    query GetContractCard($address: String!) {
        contract(address: $address) {
          name
          description
          voterCount
          proposalCount
          activeProposalCount
        }
      }
    `), {
    variables: { address: _contract.address },
    skip: !inView
  })

  const contract = data?.contract

  return (
    <div ref={ref} className="bg-white dark:bg-gray-900 shadow-lg rounded-lg">
      <div className="p-5 flex items-center md:flex-row flex-col relative">
        <div className="absolute right-5 top-5">
          <span className="inline-flex gap-1 px-2 py-1 text-xs rounded-xl bg-gray-300 dark:bg-gray-700">
            {_contract.type}
            <span className="absolute right-0 top-0 flex h-2 w-2">
              <span className={`relative inline-flex rounded-full h-2 w-2 ${_contract.type === ContractType.VotingPrivate ? 'bg-red-500' : 'bg-blue-500'}`}></span>
            </span>
          </span>
        </div>
        <div className="h-26 w-26 md:w-52 md:h-52 md:mr-5">
          <Image src="/images/smart-contract.png" width={250} height={250} className="w-full h-full object-contain" alt="Smart Contract" />
        </div>
        <div className="flex-grow md:text-left text-center mt-6 md:mt-0">
          {
            contract ? (
              <>
                <h1 className="dark:text-gray-50 dark:hover:text-gray-200 text-2xl font-semibold mb-2">
                  <Link href={`/contracts/${_contract.address}`}>{contract.name}</Link>
                </h1>
                <p>{contract.description}</p>
                <div className="flex items-center justify-center md:justify-start gap-4 my-2">
                  <div className="flex gap-2 pr-2 h-full items-center">
                    <i className="bi bi-check2-circle text-xl text-green-500"></i>
                    <p className="font-medium">Fully Immutable</p>
                  </div>
                  <div className="flex gap-2 pr-2 h-full items-center">
                    <i className="bi bi-x-circle text-xl text-red-500"></i>
                    <p className="font-medium">Queryable Whitelist</p>
                  </div>
                </div>
                <div className="flex flex-wrap">
                  <div className="w-1/2 xl:w-1/4 mb-2 xl:mb-0">
                    <h2>Contract Address</h2>
                    <Tooltip text="Copy Address" textAfterClick={<>Copied <i className="bi bi-check"></i></>}>
                      <p onClick={() => navigator.clipboard.writeText(_contract.address)} className="cursor-pointer text-gray-700 dark:text-gray-200 text-sm bg-gray-300 dark:bg-gray-700 rounded-xl py-1 px-2 w-max">
                        {_contract.address.slice(0, 6)}...{_contract.address?.slice(_contract.address.length - 4)}
                      </p>
                    </Tooltip>
                  </div>
                  <div className="w-1/2 xl:w-1/4 mb-2 xl:mb-0">
                    <h2>Total Proposals</h2>
                    <p className="text-sm bg-gray-300 dark:bg-gray-700 rounded-xl py-1 px-2 inline-block">{contract.proposalCount}</p>
                  </div>
                  <div className="w-1/2 xl:w-1/4 mb-2 xl:mb-0">
                    <h2>Active Proposals</h2>
                    <p className="text-sm bg-gray-300 dark:bg-gray-700 rounded-xl py-1 px-2 inline-block">{contract.activeProposalCount}</p>
                  </div>
                  <div className="w-1/2 xl:w-1/4 mb-2 xl:mb-0">
                    <h2>Total Voters</h2>
                    <p className="text-sm bg-gray-300 dark:bg-gray-700 rounded-xl py-1 px-2 inline-block">{contract.voterCount}</p>
                  </div>
                </div>
              </>
            ) : <PlaceholderContent contract={_contract} />
          }
          <Link href={`/contracts/${_contract.address}`} className="mt-2 text-indigo-500 flex items-center gap-2">
            Show More
            <i className="bi bi-box-arrow-up-right"></i>
          </Link>
        </div>
      </div>
    </div>
  )
}

function PlaceholderContent({ contract }: Props) {
  return (
    <div className="animate-pulse">
      <div className="md:w-72 h-5 bg-slate-500 dark:bg-slate-700 rounded mb-2"></div>
      <div className="h-3 bg-slate-500 dark:bg-slate-700 rounded mb-2"></div>
      <div className="md:w-72 h-5 bg-slate-500 dark:bg-slate-700 rounded my-2"></div>
      <div className="flex flex-wrap">
        <div className="w-1/2 xl:w-1/4 mb-2 xl:mb-0">
          <h2>Contract Address</h2>
          <Tooltip text="Copy Address" textAfterClick={<>Copied <i className="bi bi-check"></i></>}>
            <p onClick={() => navigator.clipboard.writeText(contract.address)} className="cursor-pointer text-gray-700 dark:text-gray-200 text-sm bg-gray-300 dark:bg-gray-700 rounded-xl py-1 px-2 w-max">
              {contract.address.slice(0, 6)}...{contract.address?.slice(contract.address.length - 4)}
            </p>
          </Tooltip>
        </div>
        <div className="w-1/2 xl:w-1/4 mb-2 xl:mb-0">
          <h2>Total Proposals</h2>
          <div className="w-12 h-6 bg-slate-500 dark:bg-slate-700 rounded-xl py-1 px-2"></div>
        </div>
        <div className="w-1/2 xl:w-1/4 mb-2 xl:mb-0">
          <h2>Active Proposals</h2>
          <div className="w-12 h-6 bg-slate-500 dark:bg-slate-700 rounded-xl py-1 px-2"></div>
        </div>
        <div className="w-1/2 xl:w-1/4 mb-2 xl:mb-0">
          <h2>Total Voters</h2>
          <div className="w-12 h-6 bg-slate-500 dark:bg-slate-700 rounded-xl py-1 px-2"></div>
        </div>
      </div>
    </div>
  )
}