import { CONTRACT_SELECT } from './page'

export interface Contract {
  id: string
  user_id: number
  name: string
  description?: string
  address?: string
  deployment_status: ContractDeploymentStatus
  totalProposals: number
  totalVoters: number
  activeProposals: number
  created_at?: string
}

export enum ContractDeploymentStatus {
  Pending = 1,
  Success,
  Failed
}

export type ContractSelect = Pick<Contract, StringToUnion<typeof CONTRACT_SELECT>>