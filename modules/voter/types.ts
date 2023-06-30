import { Database } from '@/supabase.types'

export type VoterResponse<T extends keyof Database['public']['Tables']['voters']['Row']> = Pick<Database['public']['Tables']['voters']['Row'], T>

export type VoterPayload = Required<Pick<Database['public']['Tables']['voters']['Insert'], 'address' | 'name' | 'email'>>