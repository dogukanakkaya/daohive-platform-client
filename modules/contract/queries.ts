import { SupabaseClient, createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '@/supabase.types'
import { cookieOptions } from '@/config'

export function contractQuery(supabaseClient?: SupabaseClient<Database>) {
  const supabase = supabaseClient ?? createClientComponentClient<Database>({ cookieOptions })

  const getContracts = <T extends string = '*'>(select: T = '*' as T) => {
    return supabase.from('contracts').select(select).order('created_at', { ascending: false }).throwOnError()
  }

  return { getContracts }
}