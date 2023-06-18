import Breadcrumb from '@/components/Breadcrumb'

export default function Create() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Breadcrumb items={[{ name: 'Contracts', href: '/contracts' }, { name: 'Create', href: '/contracts/create' }]} />
      </div>
      <div>form</div>
    </div>
  )
}
