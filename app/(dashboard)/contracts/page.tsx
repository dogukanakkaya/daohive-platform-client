import { cookies } from 'next/headers'
import Breadcrumb from '@/components/Breadcrumb'
import Button, { Variant } from '@/components/Button'
import { ContractCard } from '@/components/Contracts'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import Link from 'next/link'
import { ContractSelect } from './types'

export const CONTRACT_SELECT = 'id,name,description,address,deployment_status'

export default async function Contracts() {
  const supabase = createServerComponentClient({ cookies })

  const { data: contracts } = await supabase.from('contracts').select(CONTRACT_SELECT).order('created_at', { ascending: false })
    .returns<ContractSelect[]>()

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Breadcrumb items={[{ name: 'Contracts', href: '/contracts' }]} />
        <div className="flex gap-4">
          <Button variant={Variant.Secondary} className="flex items-center shadow-lg">
            <i className="bi bi-arrow-repeat text-lg"></i> <span className="border-l ml-2 pl-2 dark:border-gray-700">Refresh</span>
          </Button>
          <Link href="/contracts/create">
            <Button variant={Variant.Secondary} className="flex items-center">
              <i className="bi bi-cloud-upload animate-bounce text-lg"></i> <span className="border-l ml-2 pl-2 dark:border-gray-700">Deploy New</span>
            </Button>
          </Link>
        </div>
      </div>
      {contracts?.map(contract => (
        <ContractCard key={contract.id} contract={{
          ...contract,
          totalProposals: 17,
          totalVoters: 2366,
          activeProposals: 1
        }} />
      ))}
    </div>
  )
}
