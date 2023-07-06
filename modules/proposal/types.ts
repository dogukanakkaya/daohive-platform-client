import { Database } from '@/supabase.types'

export type ProposalResponse<T extends keyof Database['public']['Tables']['proposals']['Row']> = Pick<Database['public']['Tables']['proposals']['Row'], T>

export interface Metadata {
  name: string
  description: string
  content: string
  image: string
}

export interface OnChainProposal {
  metadata: Metadata
  approvalCount: number
  disapprovalCount: number
  neutralCount: number
  startAt: number
  endAt: number
}

export type MergedProposal<T extends keyof Database['public']['Tables']['proposals']['Row']> = ProposalResponse<T> & OnChainProposal