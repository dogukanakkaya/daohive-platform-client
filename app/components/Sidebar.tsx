import Image from 'next/image'
import Link from 'next/link'

export default function Sidebar() {
  return (
    <div className="sticky left-0 top-0 w-[320px] h-screen shadow-lg bg-white dark:bg-gray-900">
      <div className="h-16 pl-8 flex items-center border-b dark:border-gray-700 gap-4">
        <Image
          src="/images/logo.png"
          alt="Logo"
          className="w-[50px] h-14 object-cover dark:invert"
          width={100}
          height={100}
          priority
        />
        <h1 className="text-3xl font-semibold">DaoV</h1>
      </div>
      <div>
        <div className="p-4">
          <h2 className="uppercase text-gray-800 dark:text-gray-400 ml-4 my-4 text-sm">Menu</h2>
          <ul className="flex flex-col">
            <li>
              <Link href="#" className="sidebar-link"><i className="bi bi-grid"></i> Dashboard</Link>
            </li>
            <li>
              <Link href="#" className="sidebar-link"><i className="bi bi-newspaper"></i> Contracts</Link>
            </li>
            <li>
              <Link href="#" className="sidebar-link"><i className="bi bi-people"></i> Voters</Link>
            </li>
            <li>
              <Link href="#" className="sidebar-link"><i className="bi bi-clipboard-check"></i> Proposals</Link>
            </li>
          </ul>
        </div>
        <div className="p-4">
          <h2 className="uppercase text-gray-800 dark:text-gray-400 ml-4 my-4 text-sm">Developer</h2>
          <ul className="flex flex-col">
            <li>
              <Link href="#" className="sidebar-link"><i className="bi bi-code"></i> API Settings</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
