import { cookies } from 'next/headers'
import Breadcrumb from '@/components/Breadcrumb'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '@/supabase.types'
import Link from 'next/link'
import { contractQuery } from '@/modules/contract'
import Refresh from '@/components/Refresh'
import Button, { Variant } from '@/components/Button'
import { ProposalList } from '@/components/Contract/Proposal'
import { authQuery } from '@/modules/auth'
import { services } from '@/utils/api'
import { ethers } from 'ethers'
import { provider } from '@/utils/contract'
import { VoterResponse, voterQuery } from '@/modules/voter'
import Whitelist from '@/components/Contract/Whitelist'
import InfoCard from '@/components/InfoCard'

interface Props {
  params: {
    id: string
  }
}

export default async function Contract({ params }: Props) {
  const supabase = createServerComponentClient<Database>({ cookies })

  const contract = await contractQuery(supabase).getContract(params.id, `
    name,address,
    proposals (id)
  `)

  const { data: { session } } = await authQuery(supabase).getSession()
  const { data: abi } = await services.blockchain.get<ethers.InterfaceAbi>('/contracts/abi', {
    headers: {
      Authorization: `Bearer ${session?.access_token}`
    }
  })

  if (!contract.address) throw new Error('Contract is not yet deployed.')

  const deployedContract = new ethers.Contract(contract.address, abi, provider)

  // pair whitelist on chain and whitelist on db to be able to show the names of the addresses
  const whitelistOnChain = await deployedContract.getWhitelist()
  const { data: voters } = await voterQuery(supabase).getVoters('address,name').in('address', whitelistOnChain)

  // @todo(1)
  if (!voters) throw new Error()

  const votersByAddress = Object.fromEntries(voters.map(voter => [voter.address, voter.name]))
  const whitelist: VoterResponse<'address' | 'name'>[] = whitelistOnChain.map((address: string) => ({
    address,
    name: votersByAddress[address]
  }))

  return (
    <div className="space-y-6">
      <div className="flex sm:items-center justify-between flex-col sm:flex-row gap-4">
        <Breadcrumb items={[{ name: 'Contracts', href: '/contracts' }, { name: contract.name, href: `/contracts/${params.id}` }]} />
        <div className="flex justify-end gap-4">
          <Refresh key={Math.random()} />
          <Link href={`/contracts/${params.id}/proposals/create`}>
            <Button variant={Variant.Secondary} className="flex items-center">
              <i className="bi bi-journal-arrow-up animate-bounce text-lg"></i> <span className="border-l ml-2 pl-2 dark:border-gray-700">New Proposal</span>
            </Button>
          </Link>
        </div>
      </div>
      <InfoCard messages={[
        <span key="delete-warning">Deleting any whitelisted voter from this page <span className="text-red-500">won&apos;t</span> be mirrored in voters or voter groups. It will also <span className="text-red-500">not</span> affect any other contract.</span>
      ]} />
      <Whitelist whitelist={whitelist} contractAddress={contract.address} />
      <ProposalList proposals={contract.proposals} contractAddress={contract.address} abi={abi} />
    </div>
  )
}
