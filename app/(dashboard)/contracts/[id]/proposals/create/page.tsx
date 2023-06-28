import { cookies } from 'next/headers'
import Breadcrumb from '@/components/Breadcrumb'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import InfoCard from '@/components/InfoCard'
import { Database } from '@/types/supabase'
import { contractQuery } from '@/queries'
import ProposalForm from '@/components/Contracts/Proposals/ProposalForm'

interface Props {
  params: {
    id: string
  }
}

export default async function Create({ params }: Props) {
  const supabase = createServerComponentClient<Database>({ cookies })

  const contract = await contractQuery(supabase).getContract(params.id)

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Breadcrumb items={[
          { name: 'Contracts', href: '/contracts' },
          { name: contract.name, href: `/contracts/${params.id}` },
          { name: 'Proposals', href: `/contracts/${params.id}/proposals` },
          { name: 'Create', href: `/contracts/${params.id}/proposals/create` }
        ]} />
      </div>
      <InfoCard messages={[
        'Your proposals will be permanently saved to Arweave blockchain. So once you created it, you can\'t delete or edit it. So be careful when you create one. You can close it if you want to but it will still be visible to everyone.',
        'Be careful not to put sensitive information in your proposal!'
      ]} />
      <ProposalForm />
    </div>
  )
}
