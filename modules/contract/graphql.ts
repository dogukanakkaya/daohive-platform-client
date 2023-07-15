import { gql } from '@apollo/client'

export const CONTRACT_QUERY = gql`
  query Contract($address: String!){
    contract(address: $address) {
      address
      name
      description
      totalVoters
    }
  }
`