import { cookies } from 'next/headers'
import Breadcrumb from '@/components/Breadcrumb'
import ProfileSection from '@/components/Profile/ProfileSection'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'

export default async function Profile() {
  const supabase = createServerComponentClient({ cookies })

  const { data: { user }, error } = await supabase.auth.getUser()
  if (!user) throw error

  return (
    <div className="space-y-6">
      <div className="flex sm:items-center justify-between flex-col sm:flex-row gap-4">
        <Breadcrumb items={[{ name: 'Profile', href: '/profile' }]} />
      </div>
      <ProfileSection user={user} />
    </div>
  )
}
