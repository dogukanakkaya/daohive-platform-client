import { cookies } from 'next/headers'
import Breadcrumb from '@/components/Breadcrumb'
import Button, { Variant } from '@/components/Button'
import { Table } from '@/components/Voters'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import Link from 'next/link'
import InfoCard from '@/components/InfoCard'
import Refresh from '@/components/Refresh'
import Group from '@/components/Voters/Group'
import { Database } from '@/types/supabase'
import { voterGroupQuery } from '@/queries/voter-group'
import { voterQuery } from '@/queries/voter'

export default async function Voters() {
  const supabase = createServerComponentClient<Database>({ cookies })

  const { data: voters } = await voterQuery(supabase).getVoters()
  const { data: voterGroups } = await voterGroupQuery(supabase).getVoterGroups()

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
        'You can click on and type to edit name and email fields.',
        'If you delete a voter, it will be removed from all groups and contract. Also won\'t be able to vote for future proposals.',
        'If you edit the address of a voter it will also be updated in the contracts.'
      ]} />
      {voters && <Table data={voters} />}
      {voters && voterGroups && <Group data={voterGroups} voters={voters} />}
    </div>
  )
}
