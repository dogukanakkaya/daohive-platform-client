import { Database } from '@/supabase.types'

export type ApiCredentialResponse<T extends keyof Database['public']['Tables']['api_credentials']['Row']> = Pick<Database['public']['Tables']['api_credentials']['Row'], T>

export type ApiCredentialPayload = Required<Pick<Database['public']['Tables']['api_credentials']['Insert'], 'name' | 'expires_at'>> & {
  permissionIds: number[]
}

export type ApiPermissionResponse<T extends keyof Database['public']['Tables']['api_permissions']['Row']> = Pick<Database['public']['Tables']['api_permissions']['Row'], T>