'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface Props {
  items: {
    name: string
    href: string
  }[]
}

export default function Breadcrumb({ items }: Props) {
  const path = usePathname()

  return (
    <nav className="inline-block bg-gray-50 text-gray-700 border border-gray-200 py-3 px-5 rounded-lg dark:bg-gray-800 dark:border-gray-700" aria-label="Breadcrumb">
      <ul className="flex items-center space-x-1 md:space-x-3">
        <li className="flex items-center">
          <Link href="/" className="text-sm text-gray-700 hover:text-gray-900 inline-flex items-center dark:text-gray-400 dark:hover:text-white">
            <i className="bi bi-grid mr-2"></i> Dashboard
          </Link>
        </li>
        {
          items.map(item => (
            <li key={item.href} className="flex items-center">
              <i className="bi bi-chevron-right text-gray-400"></i>
              {
                item.href !== path ? <Link href={item.href} className="text-gray-700 hover:text-gray-900 ml-1 md:ml-2 text-sm font-medium dark:text-gray-400 dark:hover:text-white">{item.name}</Link> : <span className="text-gray-400 ml-1 md:ml-2 text-sm font-medium dark:text-gray-500">{item.name}</span>
              }
            </li>
          ))
        }
      </ul>
    </nav>
  )
}
