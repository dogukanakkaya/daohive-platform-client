export interface Contract {
  id: string
  name: string
  description: string
  address: string
  totalProposals: number
  totalVoters: number
  activeProposals: number
}