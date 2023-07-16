import { gql } from '@apollo/client'

export const contractGql = (body: string) => gql`
  query Contract($address: String!){
    contract(address: $address) {
      ${body}
    }
  }
`