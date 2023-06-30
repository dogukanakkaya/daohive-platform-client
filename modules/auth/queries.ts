import { SupabaseClient, createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '@/supabase.types'

export function authQuery(supabaseClient?: SupabaseClient<Database>) {
  const supabase = supabaseClient ?? createClientComponentClient<Database>()

  const getSession = () => supabase.auth.getSession()

  return { getSession }
}