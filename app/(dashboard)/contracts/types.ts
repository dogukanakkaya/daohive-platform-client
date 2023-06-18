export interface Contract {
  name: string
  description: string
  slug: string
  address: string
  totalProposals: number
  totalVoters: number
  activeProposals: number
}