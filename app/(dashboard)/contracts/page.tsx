import { cookies } from 'next/headers'
import Breadcrumb from '@/components/Breadcrumb'
import Button, { Variant } from '@/components/Button'
import { ContractCard } from '@/components/Contract'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import Link from 'next/link'
import { Database } from '@/supabase.types'
import Refresh from '@/components/Refresh'
import { contractQuery } from '@/modules/contract'

export default async function Contracts() {
  const supabase = createServerComponentClient<Database>({ cookies })

  const { data: contracts } = await contractQuery(supabase).getContracts('address') // proposals(count)

  return (
    <div className="space-y-6">
      <div className="flex sm:items-center justify-between flex-col sm:flex-row gap-4">
        <Breadcrumb items={[{ name: 'Contracts', href: '/contracts' }]} />
        <div className="flex justify-end gap-4">
          <Refresh key={Math.random()} />
          <Link href="/contracts/create">
            <Button variant={Variant.Secondary} className="flex items-center">
              <i className="bi bi-cloud-upload animate-bounce text-lg"></i> <span className="border-l ml-2 pl-2 dark:border-gray-700">Deploy New</span>
            </Button>
          </Link>
        </div>
      </div>
      {contracts?.map(contract => (
        <ContractCard key={contract.address} address={contract.address} />
      ))}
    </div>
  )
}
