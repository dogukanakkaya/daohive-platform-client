import { cookies } from 'next/headers'
import Breadcrumb from '@/components/Breadcrumb'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import InfoCard from '@/components/InfoCard'
import { Database } from '@/supabase.types'
import { ProposalForm } from '@/components/Contract/Proposal'
import { contractQuery } from '@/modules/contract'

interface Props {
  params: {
    address: string
  }
}

export default async function Create({ params }: Props) {
  const supabase = createServerComponentClient<Database>({ cookies })

  const contract = await contractQuery(supabase).getContractByAddress(params.address)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Breadcrumb items={[
          { name: 'Contracts', href: '/contracts' },
          { name: contract.name, href: `/contracts/${params.address}` },
          { name: 'Proposals', href: `/contracts/${params.address}/proposals` },
          { name: 'Create', href: `/contracts/${params.address}/proposals/create` }
        ]} />
      </div>
      <InfoCard messages={[
        'Your proposals will be permanently saved to Arweave blockchain. So once you created it, you can\'t delete or edit it. So be careful when you create one. You can close it if you want to but it will still be visible to everyone.',
        'Do not to put any kind of sensitive/private information in your proposal!'
      ]} />
      <ProposalForm />
    </div>
  )
}
