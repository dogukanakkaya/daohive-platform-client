import Breadcrumb from '@/components/Breadcrumb'
import Button, { Variant } from '@/components/Button'
import Link from 'next/link'

export default function Voters() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Breadcrumb items={[{ name: 'Contracts', href: '/contracts' }]} />
        <div className="flex gap-4">
          <Button variant={Variant.Secondary} className="flex items-center shadow-lg">
            <i className="bi bi-arrow-clockwise text-lg"></i> <span className="border-l ml-2 pl-2 dark:border-gray-700">Reload</span>
          </Button>
          <Link href="/voters/create">
            <Button variant={Variant.Secondary} className="flex items-center">
              <i className="bi bi-person-plus text-lg"></i> <span className="border-l ml-2 pl-2 dark:border-gray-700">Add New</span>
            </Button>
          </Link>
        </div>
      </div>
      <></>
    </div>
  )
}
