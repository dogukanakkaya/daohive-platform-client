import { SupabaseClient, createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '@/supabase.types'

export function developerQuery(supabaseClient?: SupabaseClient<Database>) {
  const supabase = supabaseClient ?? createClientComponentClient<Database>()

  const getApiCredentials = <T extends string = '*'>(select: T = '*' as T) => {
    return supabase.from('api_credentials').select(select).order('created_at', { ascending: false }).throwOnError()
  }

  const getApiPermissions = <T extends string = '*'>(select: T = '*' as T) => {
    return supabase.from('api_permissions').select(select).order('created_at', { ascending: false }).throwOnError()
  }

  const deleteApiCredential = (id: number) => {
    return supabase.from('api_credentials').delete().eq('id', id).throwOnError()
  }

  return { getApiCredentials, deleteApiCredential, getApiPermissions }
}