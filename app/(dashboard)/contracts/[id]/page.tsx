import { cookies } from 'next/headers'
import Breadcrumb from '@/components/Breadcrumb'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '@/supabase.types'
import Link from 'next/link'
import { contractQuery } from '@/modules/contract'

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
        <Link href={`/contracts/${params.id}/proposals/create`}>Create</Link>
      </div>
    </div>
  )
}
