import Breadcrumb from '@/components/Breadcrumb'
import Button, { Variant } from '@/components/Button'
import { ContractCard } from '@/components/Contracts'
import Link from 'next/link'

export default function Contracts() {
  const mockContract = {
    name: 'Tesla Digital Screen',
    description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eius, autem laboriosam natus, voluptas doloremque quae voluptatem maxime quis atque earum obcaecati repudiandae fugit ab commodi ducimus ipsam eaque veniam nulla.',
    slug: 'tesla-digital-screen',
    address: '0x26c80cc193b27d73d2c40943acec77f4da2c5bd8',
    totalProposals: 17,
    totalVoters: 2366,
    activeProposals: 1
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Breadcrumb items={[{ name: 'Contracts', href: '/contracts' }]} />
        <div className="flex gap-4">
          <Button variant={Variant.Secondary} className="flex items-center shadow-lg">
            <i className="bi bi-arrow-clockwise text-lg"></i> <span className="border-l ml-2 pl-2 dark:border-gray-700">Reload</span>
          </Button>
          <Link href="/contracts/create">
            <Button variant={Variant.Secondary} className="flex items-center">
              <i className="bi bi-cloud-upload animate-bounce text-lg"></i> <span className="border-l ml-2 pl-2 dark:border-gray-700">Deploy New</span>
            </Button>
          </Link>
        </div>
      </div>
      <ContractCard contract={mockContract} />
      <ContractCard contract={mockContract} />
    </div>
  )
}
