import { SupabaseClient, createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '@/supabase.types'

export function contractQuery(supabaseClient?: SupabaseClient<Database>) {
  const supabase = supabaseClient ?? createClientComponentClient<Database>()

  const getContracts = <T extends string = '*'>(select: T = '*' as T) => {
    return supabase.from('contracts').select(select).order('created_at', { ascending: false }).throwOnError()
  }

  const getContract = async <T extends string = '*'>(id: string, select: T = '*' as T) => {
    const { data: contract, error } = await supabase.from('contracts')
      .select(select)
      .eq('id', id)
      .single()
      .throwOnError()

    // @todo(1)
    if (error) throw error

    return contract
  }

  return { getContracts, getContract }
}