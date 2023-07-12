import { cookies } from 'next/headers'
import Breadcrumb from '@/components/Breadcrumb'
import InfoCard from '@/components/InfoCard'
import { ContractForm } from '@/components/Contract'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '@/supabase.types'
import { voterGroupQuery } from '@/modules/voter-group'

export default async function Create() {
  const supabase = createServerComponentClient<Database>({ cookies })

  const { data: voterGroups } = await voterGroupQuery(supabase).getVoterGroups('id,name')

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Breadcrumb items={[{ name: 'Contracts', href: '/contracts' }, { name: 'Create', href: '/contracts/create' }]} />
      </div>
      <InfoCard messages={[
        'Be aware, to update contract name, description or whitelist you will need to pay transaction fees since these values will be stored in the blockchain.',
        'Updating the voters in a group will not update the whitelisted users in the contract. You can update the whitelist from the contract detail page.'
      ]} />
      {voterGroups && <ContractForm voterGroups={voterGroups} />}
    </div>
  )
}
