import { SupabaseClient, createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '@/supabase.types'
import { ApiCredentialPayload } from './types'

export function developerQuery(supabaseClient?: SupabaseClient<Database>) {
  const supabase = supabaseClient ?? createClientComponentClient<Database>()

  const getApiCredentials = <T extends string = '*'>(select: T = '*' as T) => {
    return supabase.from('decrypted_api_credentials')
      .select(select)
      .order('created_at', { ascending: false })
      .is('deleted_at', null)
      .throwOnError()
  }

  const createApiCredential = async ({ name, expires_at, permissionIds }: ApiCredentialPayload) => {
    const { data: apiCredential, error } = await supabase.from('api_credentials').insert({ name, expires_at }).select('id').throwOnError().single()

    // @todo(1)
    if (error) throw error

    // @todo(2)
    const apiPermissions = permissionIds.map(pId => ({ api_credential_id: apiCredential.id, api_permission_id: pId }))
    await supabase.from('api_credential_api_permissions').insert(apiPermissions).throwOnError()
  }

  const deleteApiCredential = (id: string) => {
    return supabase.from('api_credentials').update({ deleted_at: new Date().toISOString() }).eq('id', id).throwOnError()
  }

  const getApiPermissions = <T extends string = '*'>(select: T = '*' as T) => {
    return supabase.from('api_permissions').select(select).order('created_at', { ascending: false }).throwOnError()
  }

  return { getApiCredentials, createApiCredential, deleteApiCredential, getApiPermissions }
}