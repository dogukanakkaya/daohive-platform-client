import { cookies } from 'next/headers'
import Breadcrumb from '@/components/Breadcrumb'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '@/supabase.types'
import Link from 'next/link'
import { contractQuery } from '@/modules/contract'
import { ExtraProposalProps, Metadata, MetadataProvider } from '@/modules/proposal'
import { services } from '@/utils/api'
import Refresh from '@/components/Refresh'
import Button, { Variant } from '@/components/Button'
import ProposalCard from '@/components/Contract/Proposal/ProposalCard'
import { ethers } from 'ethers'
import { provider } from '@/utils/contract'

interface Props {
  params: {
    id: string
  }
}

export default async function Contract({ params }: Props) {
  const supabase = createServerComponentClient<Database>({ cookies })

  const _contract = await contractQuery(supabase).getContract(params.id)

  // @todo(3): join this with above query when i fix the supabase types problem with dynamic selects
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

  const { data: { session } } = await supabase.auth.getSession()
  const { data: abi } = await services.blockchain.get('/contracts/abi', {
    headers: {
      Authorization: `Bearer ${session?.access_token}`
    }
  })

  const deployedContract = new ethers.Contract(contract.address as string, abi, provider)

  // show 8 proposals at max for performance reasons, lazy load the rest on demand/scroll
  const promises = contract.proposals
    .slice(0, 8)
    .map<Promise<[string, ExtraProposalProps]>>(async proposal => {
      const [{ data: metadata }, voteCount] = await Promise.all([
        services.arweave.get<Metadata>(`/${proposal.metadata_id}`),
        deployedContract.getVoteCount(proposal.id)
      ])

      return [proposal.id, { metadata, voteCount }]
    })

  const extraProposalMap = new Map(await Promise.all(promises))

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
          {contract.proposals.map(proposal => {
            const extraProposalData = extraProposalMap.get(proposal.id)
            if (!extraProposalData) return <></>

            return <ProposalCard key={proposal.id} proposal={{
              ...proposal,
              ...extraProposalData
            }} />
          })}
        </div>
      </div>
    </div>
  )
}
