import { cookies } from 'next/headers'
import Breadcrumb from '@/components/Breadcrumb'
import ProfileSection from '@/components/Profile/ProfileSection'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'

export default async function Profile() {
  const supabase = createServerComponentClient({ cookies })

  const { data: { user } } = await supabase.auth.getUser()
  const { data: userExtended } = await supabase.from('users').select('balance').eq('id', user?.id).single()
  if (!user || !userExtended) throw new Error('Impossible since we have middleware not to allow unauthenticated users to view this page')

  return (
    <div className="space-y-6">
      <div className="flex sm:items-center justify-between flex-col sm:flex-row gap-4">
        <Breadcrumb items={[{ name: 'Profile', href: '/profile' }]} />
      </div>
      <ProfileSection user={{ ...user, ...userExtended }} />
    </div>
  )
}
