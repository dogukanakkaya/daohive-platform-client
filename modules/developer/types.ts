import { Database } from '@/supabase.types'

export type ApiCredentialResponse<T extends keyof Database['public']['Tables']['api_credentials']['Row']> = Pick<Database['public']['Tables']['api_credentials']['Row'], T>