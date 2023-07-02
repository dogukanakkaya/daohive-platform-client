import Breadcrumb from '@/components/Breadcrumb'
import { VoterForm } from '@/components/Voter'

export default function Create() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Breadcrumb items={[{ name: 'Voters', href: '/voters' }, { name: 'Create', href: '/voters/create' }]} />
      </div>
      <VoterForm />
    </div>
  )
}