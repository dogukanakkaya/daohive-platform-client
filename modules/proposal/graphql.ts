import { gql } from '@apollo/client'

export const proposalGql = (body: string) => gql`
  query Proposal($id: String!){
    proposal(id: $id) {
      ${body}
    }
  }
`