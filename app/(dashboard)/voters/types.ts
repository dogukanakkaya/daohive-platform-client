import { VOTER_GROUP_SELECT, VOTER_SELECT } from '@/config'

export interface Voter {
  id: number
  user_id: number
  address: string
  name?: string
  email?: string
  created_at?: string
}

export interface VoterGroup {
  id: number
  user_id: number
  name: string
  created_at?: string
}

export type VoterSelect = Pick<Voter, StringToUnion<typeof VOTER_SELECT>>

export type VoterGroupSelect = Pick<VoterGroup, StringToUnion<typeof VOTER_GROUP_SELECT>>