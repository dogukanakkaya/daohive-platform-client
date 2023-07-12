import { cookies } from 'next/headers'
import Breadcrumb from '@/components/Breadcrumb'
import Refresh from '@/components/Refresh'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '@/supabase.types'
import { ApiCredentialCard } from '@/components/Developer'
import Button, { Variant } from '@/components/Button'
import Link from 'next/link'
import { developerQuery } from '@/modules/developer'
import ZeroRecord from '@/components/ZeroRecord'

export default async function Api() {
  const supabase = createServerComponentClient<Database>({ cookies })

  const { getApiCredentials, getApiPermissions } = developerQuery(supabase)

  const [{ data: credentials }, { data: permissions }] = await Promise.all([
    getApiCredentials(`
      id,secret,name,expires_at,created_at,
      api_credential_api_permissions (
        api_permissions (name,description)
      )
    `),
    getApiPermissions('name,description')
  ])

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
      {credentials?.length === 0 && (
        <ZeroRecord title="No api credential found" src="/images/api-credential-zero-record-icon.svg">
          <p>Seems like you don&apos;t have any api credential created yet. <Link href="/developer/api/create" className="underline text-primary">Click here</Link> to create one.</p>
        </ZeroRecord>
      )}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {credentials && permissions && credentials.map(credential => (
          <ApiCredentialCard
            key={credential.id}
            credential={credential}
            permissions={permissions}
          />
        ))}
      </div>
    </div>
  )
}
