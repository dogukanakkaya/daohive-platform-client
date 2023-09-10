import { WEB_URL } from '@/config'
import Image from 'next/image'
import Link from 'next/link'

export default function Sidebar() {
  return (
    <>
      <input className="peer hidden" type="checkbox" id="menu" />
      <div className="hidden peer-checked:block md:block fixed z-20 md:sticky left-0 top-0 shadow-lg w-full h-screen bg-white dark:bg-gray-900 bg-opacity-25 dark:bg-opacity-25">
        <div className="h-full overflow-y-auto overflow-hidden bg-white dark:bg-gray-900 mr-48 md:mr-0">
          <div className="hidden md:flex h-16 pl-8 items-center border-b dark:border-gray-700 gap-4">
            <Image
              src="/images/logo.png"
              alt="Logo"
              className="w-[50px] h-14 object-cover dark:invert"
              width={100}
              height={100}
              priority
            />
            <h1 className="text-2xl font-semibold">DaoV</h1>
          </div>
          <div className="mt-16 md:mt-0">
            <div className="p-4">
              <h2 className="uppercase text-gray-800 dark:text-gray-400 ml-4 my-4 text-sm">Menu</h2>
              <ul className="flex flex-col">
                <li>
                  <Link href="/" className="sidebar-link"><i className="bi bi-grid"></i> Dashboard</Link>
                </li>
                <li>
                  <Link href="/contracts" className="sidebar-link"><i className="bi bi-newspaper"></i> Contracts</Link>
                </li>
                <li>
                  <Link href="/voters" className="sidebar-link"><i className="bi bi-people"></i> Voters</Link>
                </li>
              </ul>
            </div>
            <div className="p-4">
              <h2 className="uppercase text-gray-800 dark:text-gray-400 ml-4 my-4 text-sm">Developer</h2>
              <ul className="flex flex-col">
                <li>
                  <Link href={`${WEB_URL}/docs/introduction`} target="_blank" className="sidebar-link"><i className="bi bi-file-text"></i> Docs</Link>
                </li>
                <li>
                  <Link href="/developer/api" className="sidebar-link"><i className="bi bi-code"></i> API Settings</Link>
                </li>
                <li>
                  <Link href="#" className="sidebar-link cursor-not-allowed"><i className="bi bi-globe2"></i> Webhooks <span className="badge">Soon</span></Link>
                </li>
              </ul>
            </div>
            <div className="p-4">
              <h2 className="uppercase text-gray-800 dark:text-gray-400 ml-4 my-4 text-sm">Other</h2>
              <ul className="flex flex-col">
                <li>
                  <Link href="#" className="sidebar-link cursor-not-allowed"><i className="bi bi-journal-bookmark"></i> Usage Plan <span className="badge">Soon</span></Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
