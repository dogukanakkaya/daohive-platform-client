import { SupabaseClient, createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '@/types/supabase'

export function voterQuery(supabaseClient?: SupabaseClient<Database>) {
  const supabase = supabaseClient ?? createClientComponentClient<Database>()

  const getVoters = () => {
    return supabase.from('voters').select('id,address,name,email').order('created_at', { ascending: false })
  }

  return { getVoters }
}