import { cookies } from 'next/headers'
import Breadcrumb from '@/components/Breadcrumb'
import Button, { Variant } from '@/components/Button'
import { Table } from '@/components/Voters'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import Link from 'next/link'
import InfoCard from '@/components/InfoCard'
import Refresh from '@/components/Refresh'
import GroupCard from '@/components/Voters/GroupCard'
import GroupDialog from '@/components/Voters/GroupDialog'
import { VoterGroupSelect, VoterSelect } from './types'

export const VOTER_SELECT = 'id,address,name,email'
export const VOTER_GROUP_SELECT = 'id,name'

export default async function Voters() {
  const supabase = createServerComponentClient({ cookies })

  const { data: voters } = await supabase.from('voters').select(VOTER_SELECT).order('created_at', { ascending: false })
    .returns<VoterSelect[]>()
  const { data: voterGroups } = await supabase.from('voter_groups').select(VOTER_GROUP_SELECT).order('created_at', { ascending: false })
    .returns<VoterGroupSelect[]>()

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Breadcrumb items={[{ name: 'Voters', href: '/voters' }]} />
        <div className="flex gap-4">
          <Refresh />
          <Link href="/voters/create">
            <Button variant={Variant.Secondary} className="flex items-center">
              <i className="bi bi-person-plus text-lg"></i> <span className="border-l ml-2 pl-2 dark:border-gray-700">Add New</span>
            </Button>
          </Link>
        </div>
      </div>
      <InfoCard messages={[
        'You can click on and type to edit name and email fields.'
      ]} />
      {voters && <Table data={voters} />}
      <div className="border-t dark:border-gray-700">
        <h2 className="text-xl font-semibold my-4">Whitelist Groups</h2>
        <div className="flex items-center flex-wrap gap-4">
          {voterGroups?.map(group => <GroupCard key={group.id} group={group} />)}
        </div>
        <GroupDialog open={true} />
      </div>
    </div>
  )
}
