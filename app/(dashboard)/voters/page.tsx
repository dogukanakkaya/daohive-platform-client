import { cookies } from 'next/headers'
import Breadcrumb from '@/components/Breadcrumb'
import Button, { Variant } from '@/components/Button'
import { Table } from '@/components/Voters'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import Link from 'next/link'
import InfoCard from '@/components/InfoCard'
import Refresh from '@/components/Refresh'
import { VoterGroupSelect, VoterSelect } from './types'
import Group from '@/components/Voters/Group'

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
      {voterGroups && <Group data={voterGroups} />}
    </div>
  )
}
