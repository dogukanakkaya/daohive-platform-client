import { cookies } from 'next/headers'
import Breadcrumb from '@/components/Breadcrumb'
import DeveloperForm from '@/components/Developer/DeveloperForm'
import Refresh from '@/components/Refresh'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '@/supabase.types'
import Table from '@/components/Developer/Table'

export default async function Api() {
  const supabase = createServerComponentClient<Database>({ cookies })
  const { data: apiCredentials } = await supabase.from('api_credentials')
    .select('id,name,permissions,active,expires_at,created_at')
    .order('created_at', { ascending: false })
    .throwOnError()

  return (
    <div className="space-y-6">
      <div className="flex sm:items-center justify-between flex-col sm:flex-row gap-4">
        <Breadcrumb items={[{ name: 'API Settings', href: '/developer/api' }]} />
        <div className="flex justify-end gap-4">
          <Refresh key={Math.random()} />
        </div>
      </div>
      {apiCredentials && <Table apiCredentials={apiCredentials} />}
    </div>
  )
}
