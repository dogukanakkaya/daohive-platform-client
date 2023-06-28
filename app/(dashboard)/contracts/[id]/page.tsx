import { cookies } from 'next/headers'
import Breadcrumb from '@/components/Breadcrumb'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '@/types/supabase'
import { contractQuery } from '@/queries'

interface Props {
  params: {
    id: string
  }
}

export default async function Contract({ params }: Props) {
  const supabase = createServerComponentClient<Database>({ cookies })

  const contract = await contractQuery(supabase).getContract(params.id)

  return (
    <div className="space-y-4">
      <div className="flex sm:items-center justify-between flex-col sm:flex-row gap-4">
        <Breadcrumb items={[{ name: 'Contracts', href: '/contracts' }, { name: contract.name, href: `/contracts/${params.id}` }]} />
      </div>
      <div>
        todo list contract proposals
      </div>
    </div>
  )
}
