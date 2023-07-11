import { cookies } from 'next/headers'
import Breadcrumb from '@/components/Breadcrumb'
import DeveloperForm from '@/components/Developer/DeveloperForm'
import Refresh from '@/components/Refresh'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '@/supabase.types'
import { ApiCredentialCard } from '@/components/Developer'
import Button, { Variant } from '@/components/Button'
import Link from 'next/link'

export default async function Api() {
  const supabase = createServerComponentClient<Database>({ cookies })
  const { data: apiCredentials } = await supabase.from('api_credentials')
    .select('id,name,expires_at,created_at')
    .order('created_at', { ascending: false })
    .throwOnError()

  console.log(apiCredentials)

  return (
    <div className="space-y-6">
      <div className="flex sm:items-center justify-between flex-col sm:flex-row gap-4">
        <Breadcrumb items={[{ name: 'API Settings', href: '/developer/api' }]} />
        <div className="flex justify-end gap-4">
          <Refresh key={Math.random()} />
          <Link href="/developer/api/create">
            <Button variant={Variant.Secondary} className="flex items-center">
              <i className="bi bi-plus text-lg"></i> <span className="border-l ml-2 pl-2 dark:border-gray-700">Create API Key</span>
            </Button>
          </Link>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {apiCredentials && <ApiCredentialCard apiCredentials={apiCredentials} />}
      </div>
    </div>
  )
}
