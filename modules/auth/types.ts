import { Database } from '@/supabase.types'
import { User } from '@supabase/supabase-js'

export type UserResponse<
  T extends keyof Database['public']['Tables']['users']['Row'] = keyof Database['public']['Tables']['users']['Row']
> = Pick<Database['public']['Tables']['users']['Row'], T>

export type UserMerged = User & UserResponse