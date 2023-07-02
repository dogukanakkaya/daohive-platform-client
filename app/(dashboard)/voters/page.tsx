import { cookies } from 'next/headers'
import Breadcrumb from '@/components/Breadcrumb'
import Button, { Variant } from '@/components/Button'
import { Table, Group } from '@/components/Voter'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import Link from 'next/link'
import InfoCard from '@/components/InfoCard'
import Refresh from '@/components/Refresh'
import { Database } from '@/supabase.types'
import { voterQuery } from '@/modules/voter'
import { voterGroupQuery } from '@/modules/voter-group'

export default async function Voters() {
  const supabase = createServerComponentClient<Database>({ cookies })

  const { data: voters } = await voterQuery(supabase).getVoters('id,address,name,email')
  const { data: voterGroups } = await voterGroupQuery(supabase).getVoterGroups('id,name')

  return (
    <div className="space-y-6">
      <div className="flex sm:items-center justify-between flex-col sm:flex-row gap-4">
        <Breadcrumb items={[{ name: 'Voters', href: '/voters' }]} />
        <div className="flex justify-end gap-4">
          <Refresh key={Math.random()} />
          <Link href="/voters/create">
            <Button variant={Variant.Secondary} className="flex items-center">
              <i className="bi bi-person-plus text-lg"></i> <span className="border-l ml-2 pl-2 dark:border-gray-700">Add New</span>
            </Button>
          </Link>
        </div>
      </div>
      <InfoCard messages={[
        'You can click on and type to edit name and email fields.',
        <span key="delete-warning">If you delete a voter, it will be removed from all groups but <span className="text-red-500">won&apos;t</span> be mirrored in contract.</span>,
        <span key="edit-warning">Editing the addresses of voters or editing the voters of a group (or deleting them) <span className="text-red-500">won&apos;t</span> be mirrored in the contracts. To update whitelist of a contract you need to do it from contracts page.</span>
      ]} />
      {voters && <Table data={voters} />}
      {voters && voterGroups && <Group data={voterGroups} voters={voters} />}
    </div>
  )
}
