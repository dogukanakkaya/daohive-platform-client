import { cookies } from 'next/headers'
import Breadcrumb from '@/components/Breadcrumb'
import Button, { Variant } from '@/components/Button'
import { Table } from '@/components/Voters'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import Link from 'next/link'
import InfoCard from '@/components/InfoCard'

export default async function Voters() {
  const supabase = createServerComponentClient({ cookies })
  const { data: voters } = await supabase.from('voters').select('*').order('created_at', { ascending: false })

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Breadcrumb items={[{ name: 'Voters', href: '/voters' }]} />
        <div className="flex gap-4">
          <Button variant={Variant.Secondary} className="flex items-center shadow-lg">
            <i className="bi bi-arrow-clockwise text-lg"></i> <span className="border-l ml-2 pl-2 dark:border-gray-700">Reload</span>
          </Button>
          <Link href="/voters/create">
            <Button variant={Variant.Secondary} className="flex items-center">
              <i className="bi bi-person-plus text-lg"></i> <span className="border-l ml-2 pl-2 dark:border-gray-700">Add New</span>
            </Button>
          </Link>
        </div>
      </div>
      <InfoCard messages={[
        'You can click on the address to copy it.',
        'You can click on and type to edit name and email fields.'
      ]} />
      {voters && <Table data={voters} />}
    </div>
  )
}
