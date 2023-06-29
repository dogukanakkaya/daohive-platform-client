import { cookies } from 'next/headers'
import Breadcrumb from '@/components/Breadcrumb'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '@/supabase.types'
import Link from 'next/link'
import { contractQuery } from '@/modules/contract'
import { Metadata, MetadataProvider } from '@/modules/proposal'
import { ARWEAVE_URL } from '@/config'
import { services } from '@/utils/api'
import Refresh from '@/components/Refresh'
import Button, { Variant } from '@/components/Button'
import Image from 'next/image'
import ProposalCard from '@/components/Contract/Proposal/ProposalCard'

interface Props {
  params: {
    id: string
  }
}

export default async function Contract({ params }: Props) {
  const supabase = createServerComponentClient<Database>({ cookies })

  const _contract = await contractQuery(supabase).getContract(params.id)

  // @todo: join this with above query when i fix the supabase types problem with dynamic selects
  // after that these 3 things won't be needed
  const { data } = await supabase.from('contracts').select(`
    id,
    proposals (
      id,
      metadata_id,
      metadata_provider
    )
  `).eq('id', params.id).single().throwOnError()
  if (!data) throw new Error('Contract not found')
  const contract = { ..._contract, proposals: data.proposals }

  // fetch only last 8 proposal metadata for better performance and lazy load others on user action
  const metadataPromises = data.proposals
    .slice(0, 8)
    .map(async ({ id, metadata_id, metadata_provider }): Promise<[string, Metadata]> => {
      if (metadata_provider === MetadataProvider.Arweave) {
        const { data: metadata } = await services.arweave.get(`/${metadata_id}`)
        return [id, metadata]
      }

      return [id, {} as Metadata]
    })

  const metadataMap = new Map(await Promise.all(metadataPromises))

  return (
    <div className="space-y-4">
      <div className="flex sm:items-center justify-between flex-col sm:flex-row gap-4">
        <Breadcrumb items={[{ name: 'Contracts', href: '/contracts' }, { name: contract.name, href: `/contracts/${params.id}` }]} />
        <div className="flex justify-end gap-4">
          <Refresh key={Math.random()} />
          <Link href={`/contracts/${params.id}/proposals/create`}>
            <Button variant={Variant.Secondary} className="flex items-center">
              <i className="bi bi-plus text-lg"></i> <span className="border-l ml-2 pl-2 dark:border-gray-700">Create New</span>
            </Button>
          </Link>
        </div>
      </div>
      <div>
        <div className="grid grid-cols-2 gap-4">
          {contract.proposals.map(({ id }) => {
            const metadata = metadataMap.get(id)
            if (!metadata) return <></>

            return <ProposalCard key={id} metadata={metadata} />
          })}
        </div>
      </div>
    </div>
  )
}
