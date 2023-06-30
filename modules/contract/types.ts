import { Database } from '@/supabase.types'

export type ContractResponse<T extends keyof Database['public']['Tables']['contracts']['Row']> = Pick<Database['public']['Tables']['contracts']['Row'], T>