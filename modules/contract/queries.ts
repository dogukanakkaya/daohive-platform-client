import { SupabaseClient, createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '@/supabase.types'

export function contractQuery(supabaseClient?: SupabaseClient<Database>) {
  const supabase = supabaseClient ?? createClientComponentClient<Database>()

  const getContracts = () => {
    return supabase.from('contracts').select('id,name,description,address,deployment_status').order('created_at', { ascending: false }).throwOnError()
  }

  const getContract = async (id: string) => {
    const { data: contract, error } = await supabase.from('contracts').select('id,name,description,address,deployment_status').eq('id', id).single().throwOnError()

    // @todo(1):
    if (error) throw error

    return contract
  }

  return { getContracts, getContract }
}