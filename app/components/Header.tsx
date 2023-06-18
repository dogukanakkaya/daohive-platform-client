import { cookies } from 'next/headers'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import Image from 'next/image'
import Link from 'next/link'

export default async function Header() {
  const supabase = createServerComponentClient({ cookies })
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <div className="border-l w-full h-16 px-4 flex items-center justify-between gap-5 shadow-lg bg-white dark:bg-gray-900 border-b dark:border-gray-700">
      <div className="grow">
        <input className="form-input w-full" type="search" placeholder="Search..." />
      </div>
      <div>
        <span className="relative block w-12 h-12 rounded-full flex-center shadow cursor-pointer bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-700">
          <i className="bi bi-bell"></i>
          <span className="absolute right-0.5 top-0.5 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
          </span>
        </span>
      </div>
      <div className="relative group/profile" tabIndex={1}>
        <div className="flex items-center gap-4 cursor-pointer group/picture">
          <Image src={user?.user_metadata.picture} width={48} height={48} className="rounded-full transition group-hover/picture:ring-2 ring-primary ring-offset-2 ring-offset-white dark:ring-offset-gray-900" alt="Avatar" />
          <h3>{user?.user_metadata.name || user?.email} <i className="bi bi-chevron-down text-sm"></i></h3>
        </div>
        <ul className="absolute right-0 top-16 w-full rounded-xl shadow bg-white dark:bg-gray-900 hidden group-focus-within/profile:block">
          <li>
            <Link href="/profile" className="profile-link rounded-t-xl"><i className="bi bi-person-gear"></i> Profile</Link>
          </li>
          <li>
            <Link href="#" className="profile-link"><i className="bi bi-gear"></i> Settings</Link>
          </li>
          <li>
            <Link href="/auth/logout" prefetch={false} replace className="profile-link rounded-b-xl border-t dark:border-gray-700"><i className="bi bi-box-arrow-right text-red-500"></i> Sign Out</Link>
          </li>
        </ul>
      </div>
    </div>
  )
}
