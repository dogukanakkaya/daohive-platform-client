import { SupabaseClient, createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '@/supabase.types'
import { VoterPayload } from './types'

export function voterQuery(supabaseClient?: SupabaseClient<Database>) {
  const supabase = supabaseClient ?? createClientComponentClient<Database>()

  const createVoter = ({ address, name, email }: VoterPayload) => {
    return supabase.from('voters').insert([{ address, name, email }]).throwOnError()
  }

  return { createVoter }
}