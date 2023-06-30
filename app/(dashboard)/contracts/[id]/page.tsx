import { cookies } from 'next/headers'
import Breadcrumb from '@/components/Breadcrumb'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '@/supabase.types'
import Link from 'next/link'
import { contractQuery } from '@/modules/contract'
import Refresh from '@/components/Refresh'
import Button, { Variant } from '@/components/Button'
import { ProposalList } from '@/components/Contract/Proposal'

interface Props {
  params: {
    id: string
  }
}

export default async function Contract({ params }: Props) {
  const supabase = createServerComponentClient<Database>({ cookies })

  const contract = await contractQuery(supabase).getContract(params.id, `
    id,name,address,
    proposals (id)
  `)

  if (!contract.address) throw new Error('Contract is not yet deployed.')

  return (
    <div className="space-y-4">
      <div className="flex sm:items-center justify-between flex-col sm:flex-row gap-4">
        <Breadcrumb items={[{ name: 'Contracts', href: '/contracts' }, { name: contract.name, href: `/contracts/${params.id}` }]} />
        <div className="flex justify-end gap-4">
          <Refresh key={Math.random()} />
          <Link href={`/contracts/${params.id}/proposals/create`}>
            <Button variant={Variant.Secondary} className="flex items-center">
              <i className="bi bi-plus text-lg"></i> <span className="border-l ml-2 pl-2 dark:border-gray-700">Create New</span>
            </Button>
          </Link>
        </div>
      </div>
      <ProposalList proposals={contract.proposals} contractAddress={contract.address} />
    </div>
  )
}
