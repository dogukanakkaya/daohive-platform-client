import Breadcrumb from '@/components/Breadcrumb'
import InfoCard from '@/components/InfoCard'
import { ProposalForm } from '@/components/Contract/Proposal'
import { getApolloClient } from '@/utils/apollo/client'
import { gql } from '@/__generated__/graphql'

interface Props {
  params: {
    address: string
  }
}

export default async function Create({ params }: Props) {
  const { data: { contract } } = await getApolloClient().query({
    query: gql(`
      query GetContractName($address: String!) {
        contract(address: $address) {
          name
        }
      }
    `),
    variables: { address: params.address }
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Breadcrumb items={[
          { name: 'Contracts', href: '/contracts' },
          { name: contract.name, href: `/contracts/${params.address}` },
          { name: 'Proposals', href: `/contracts/${params.address}/proposals` },
          { name: 'Create', href: `/contracts/${params.address}/proposals/create` }
        ]} />
      </div>
      <InfoCard messages={[
        'Your proposals will be permanently saved to Arweave blockchain. So once you created it, you can\'t delete or edit it. So be careful when you create one. You can close it if you want to but it will still be visible to everyone.',
        'Do not to put any kind of sensitive/private information in your proposal!'
      ]} />
      <ProposalForm />
    </div>
  )
}
