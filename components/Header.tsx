import { cookies } from 'next/headers'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import Image from 'next/image'
import Link from 'next/link'
import { cookieOptions } from '@/config'

export default async function Header() {
  const supabase = createServerComponentClient({ cookies }, { cookieOptions })

  const { data: { user } } = await supabase.auth.getUser()
  const profileImage = user?.user_metadata.picture || '/images/default-profile.png'
  const findUsername = () => {
    if (user?.user_metadata.address) {
      return `${user.user_metadata.address.slice(0, 6)}...${user.user_metadata.address?.slice(user.user_metadata.address.length - 4)}`
    } else if (user?.user_metadata.name) {
      return user.user_metadata.name
    }

    return user?.email
  }

  return (
    <div className="sticky z-20 top-0 md:border-l w-full h-16 px-4 flex items-center justify-between gap-2 sm:gap-4 shadow-lg bg-white dark:bg-gray-900 border-b dark:border-gray-700">
      <div className="block md:hidden">
        <label htmlFor="menu"><i className="bi bi-list text-4xl"></i></label>
      </div>
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
          <Image src={profileImage} width={48} height={48} className="rounded-full transition group-hover/picture:ring-2 ring-primary ring-offset-2 ring-offset-white dark:ring-offset-gray-900" alt="Avatar" />
          <h3 className="hidden sm:block">{findUsername()} <i className="bi bi-chevron-down text-sm"></i></h3>
        </div>
        <ul className="absolute right-0 top-16 w-full rounded-xl shadow bg-white dark:bg-gray-900 hidden group-focus-within/profile:block">
          <li>
            <Link href="/profile" className="profile-link justify-center sm:justify-start gap-0 sm:gap-2 rounded-t-xl"><i className="bi bi-person-gear"></i> <span className="text-[0px] sm:text-base">Profile</span></Link>
          </li>
          <li>
            <Link href="/auth/logout" prefetch={false} replace className="profile-link justify-center sm:justify-start gap-0 sm:gap-2 rounded-b-xl border-t dark:border-gray-700"><i className="bi bi-box-arrow-right text-red-500"></i> <span className="text-[0px] sm:text-base">Sign Out</span></Link>
          </li>
        </ul>
      </div>
    </div>
  )
}
