import { Database } from '@/supabase.types'

export type ProposalResponse<T extends keyof Database['public']['Tables']['proposals']['Row']> = Pick<Database['public']['Tables']['proposals']['Row'], T>

export interface Metadata {
  name: string
  description: string
  content: string
  image: string
}

export interface ExtraProposalProps {
  metadata: Metadata
  voteCount: [number, number, number]
}

export enum MetadataProvider {
  Arweave = 1
}