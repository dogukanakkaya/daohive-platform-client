import Breadcrumb from '@/components/Breadcrumb'
import { VoterForm } from '@/components/Voters'

export default function Create() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Breadcrumb items={[{ name: 'Voters', href: '/voters' }, { name: 'Create', href: '/voters/create' }]} />
      </div>
      <VoterForm />
    </div>
  )
}