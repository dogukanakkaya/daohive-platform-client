import Breadcrumb from '@/components/Breadcrumb'
import InfoCard from '@/components/InfoCard'
import { ContractForm } from '@/components/Contract'

export default function Create() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Breadcrumb items={[{ name: 'Contracts', href: '/contracts' }, { name: 'Create', href: '/contracts/create' }]} />
      </div>
      <InfoCard messages={[
        'Be aware, to update contract name, description or whitelist you will need to pay transaction fees since these values will be stored in the blockchain.',
        'Updating the voters in a group will not update the whitelisted users in the contract. You can update the whitelist from the contract detail page.'
      ]} />
      <ContractForm />
    </div>
  )
}
