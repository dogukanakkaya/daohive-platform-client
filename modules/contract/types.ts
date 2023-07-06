import { Database } from '@/supabase.types'

export type ContractResponse<T extends keyof Database['public']['Tables']['contracts']['Row']> = Pick<Database['public']['Tables']['contracts']['Row'], T>

export interface OnChainContract {
  name: string
  description: string
  totalVoters: number
}

export interface ContractWhitelist {
  address: string
  name: string
}[]

export type MergedContract<T extends keyof Database['public']['Tables']['contracts']['Row']> = ContractResponse<T> & OnChainContract & ContractWhitelist
  & { totalProposals: number, activeProposals: number } // @todo temp for now until i have the data