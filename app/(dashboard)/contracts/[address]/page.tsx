import { cookies } from 'next/headers'
import Breadcrumb from '@/components/Breadcrumb'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '@/supabase.types'
import Link from 'next/link'
import { contractQuery } from '@/modules/contract'
import Refresh from '@/components/Refresh'
import Button, { Variant } from '@/components/Button'
import { ProposalCard } from '@/components/Contract/Proposal'
import { services } from '@/utils/api'
import Whitelist from '@/components/Contract/Whitelist'
import InfoCard from '@/components/InfoCard'
import ZeroRecord from '@/components/ZeroRecord'

interface Props {
  params: {
    address: string
  }
}

export default async function Contract({ params }: Props) {
  const supabase = createServerComponentClient<Database>({ cookies })

  const contract = await contractQuery(supabase).getContractByAddress(params.address, `
    address,
    proposals (id)
  `)

  const { data: { name, whitelist } } = await services.blockchain.get(`/contracts/${contract.address}`, {
    headers: {
      Cookie: cookies().toString()
    }
  })

  return (
    <div className="space-y-6">
      <div className="flex sm:items-center justify-between flex-col sm:flex-row gap-4">
        <Breadcrumb items={[{ name: 'Contracts', href: '/contracts' }, { name, href: `/contracts/${params.address}` }]} />
        <div className="flex justify-end gap-4">
          <Refresh key={Math.random()} />
          <Link href={`/contracts/${params.address}/proposals/create`}>
            <Button variant={Variant.Secondary} className="flex items-center">
              <i className="bi bi-journal-arrow-up animate-bounce text-lg"></i> <span className="border-l ml-2 pl-2 dark:border-gray-700">New Proposal</span>
            </Button>
          </Link>
        </div>
      </div>
      <InfoCard messages={[
        <span key="delete-warning">Deleting any whitelisted voter from this page <span className="text-red-500">won&apos;t</span> be mirrored in voters or voter groups. It will also <span className="text-red-500">not</span> affect any other contract.</span>
      ]} />
      <div>
        <h1 className="section-title">Proposals</h1>
        {contract.proposals.length === 0 && <ZeroRecord />}
        <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-8">
          {contract.proposals.map(proposal => (
            <ProposalCard
              key={proposal.id}
              id={proposal.id}
            />
          ))}
        </div>
      </div>
      <Whitelist whitelist={whitelist} contractAddress={contract.address} />
    </div>
  )
}
