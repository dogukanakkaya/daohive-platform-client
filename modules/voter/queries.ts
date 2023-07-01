import { SupabaseClient, createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '@/supabase.types'
import { VoterPayload } from './types'

export function voterQuery(supabaseClient?: SupabaseClient<Database>) {
  const supabase = supabaseClient ?? createClientComponentClient<Database>()

  const getVoters = <T extends string = '*'>(select: T = '*' as T) => {
    return supabase.from('voters').select(select).order('created_at', { ascending: false }).throwOnError()
  }

  const createVoter = ({ address, name, email }: VoterPayload) => {
    return supabase.from('voters').insert([{ address, name, email }]).throwOnError()
  }

  return { getVoters, createVoter }
}