import { Database } from '@/supabase.types'

export type UserResponse<T extends keyof Database['public']['Tables']['users']['Row']> = Pick<Database['public']['Tables']['users']['Row'], T>