import { cookies } from 'next/headers'
import Breadcrumb from '@/components/Breadcrumb'
import { DeveloperForm } from '@/components/Developer'
import { developerQuery } from '@/modules/developer'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '@/supabase.types'

export default async function Create() {
  const supabase = createServerComponentClient<Database>({ cookies })

  const { data: permissions } = await developerQuery(supabase).getApiPermissions('id,name,description')

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Breadcrumb items={[{ name: 'API Settings', href: '/developer/api' }, { name: 'Create', href: '/developer/api/create' }]} />
      </div>
      {permissions && <DeveloperForm permissions={permissions} />}
    </div>
  )
}
