import { SupabaseClient, createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '@/types/supabase'
import { VoterPayload } from '@/types/voter'

export function voterQuery(supabaseClient?: SupabaseClient<Database>) {
  const supabase = supabaseClient ?? createClientComponentClient<Database>()

  const getVoters = () => {
    return supabase.from('voters').select('id,address,name,email').order('created_at', { ascending: false }).throwOnError()
  }

  const createVoter = ({ address, name, email }: VoterPayload) => {
    return supabase.from('voters').insert([{ address, name, email }]).throwOnError()
  }

  return { getVoters, createVoter }
}