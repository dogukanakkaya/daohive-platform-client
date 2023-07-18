import Breadcrumb from '@/components/Breadcrumb'
import InfoCard from '@/components/InfoCard'
import { ContractForm } from '@/components/Contract'
import { getApolloClient } from '@/utils/apollo/client'
import { gql } from '@/__generated__/graphql'

export default async function Create() {
  const { data: { voterGroups } } = await getApolloClient().query({
    query: gql(`
      query GetVoterGroupList {
        voterGroups {
          id
          name
        }
      }
    `)
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Breadcrumb items={[{ name: 'Contracts', href: '/contracts' }, { name: 'Create', href: '/contracts/create' }]} />
      </div>
      <InfoCard messages={[
        'Be aware, to update contract name, description or whitelist you will need to pay transaction fees since these values will be stored in the blockchain.',
        'Updating the voters in a group will not update the whitelisted users in the contract. You can update the whitelist from the contract detail page.'
      ]} />
      <ContractForm voterGroups={voterGroups} />
    </div>
  )
}
