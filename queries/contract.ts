import { SupabaseClient, createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '@/types/supabase'

export function contractQuery(supabaseClient?: SupabaseClient<Database>) {
  const supabase = supabaseClient ?? createClientComponentClient<Database>()

  const getContracts = () => {
    return supabase.from('contracts').select('id,name,description,address,deployment_status').order('created_at', { ascending: false })
  }

  return { getContracts }
}