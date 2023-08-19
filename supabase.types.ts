export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      api_credential_api_permissions: {
        Row: {
          api_credential_id: string
          api_permission_id: number
          id: number
        }
        Insert: {
          api_credential_id: string
          api_permission_id: number
          id?: number
        }
        Update: {
          api_credential_id?: string
          api_permission_id?: number
          id?: number
        }
        Relationships: [
          {
            foreignKeyName: "api_credential_api_permissions_api_credential_id_fkey"
            columns: ["api_credential_id"]
            referencedRelation: "api_credentials"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "api_credential_api_permissions_api_credential_id_fkey"
            columns: ["api_credential_id"]
            referencedRelation: "decrypted_api_credentials"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "api_credential_api_permissions_api_permission_id_fkey"
            columns: ["api_permission_id"]
            referencedRelation: "api_permissions"
            referencedColumns: ["id"]
          }
        ]
      }
      api_credentials: {
        Row: {
          created_at: string | null
          deleted_at: string | null
          expires_at: string | null
          id: string
          name: string
          request_count: number
          secret: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          deleted_at?: string | null
          expires_at?: string | null
          id?: string
          name: string
          request_count?: number
          secret?: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          deleted_at?: string | null
          expires_at?: string | null
          id?: string
          name?: string
          request_count?: number
          secret?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "api_credentials_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "api_credentials_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "v_users"
            referencedColumns: ["id"]
          }
        ]
      }
      api_permissions: {
        Row: {
          created_at: string
          description: string | null
          id: number
          name: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: number
          name: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: number
          name?: string
        }
        Relationships: []
      }
      api_quotas: {
        Row: {
          current_request_count: number
          id: string
          max_request_count: number
          total_request_count: number
          user_id: string
        }
        Insert: {
          current_request_count?: number
          id?: string
          max_request_count?: number
          total_request_count?: number
          user_id: string
        }
        Update: {
          current_request_count?: number
          id?: string
          max_request_count?: number
          total_request_count?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "api_quotas_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "api_quotas_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "v_users"
            referencedColumns: ["id"]
          }
        ]
      }
      contracts: {
        Row: {
          address: string
          created_at: string
          id: string
          type: string
          user_id: string
        }
        Insert: {
          address: string
          created_at?: string
          id?: string
          type: string
          user_id?: string
        }
        Update: {
          address?: string
          created_at?: string
          id?: string
          type?: string
          user_id?: string
        }
        Relationships: []
      }
      proposals: {
        Row: {
          contract_id: string
          created_at: string
          id: string
        }
        Insert: {
          contract_id: string
          created_at?: string
          id?: string
        }
        Update: {
          contract_id?: string
          created_at?: string
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "proposals_contract_id_fkey"
            columns: ["contract_id"]
            referencedRelation: "contracts"
            referencedColumns: ["id"]
          }
        ]
      }
      users: {
        Row: {
          balance: number
          id: string
        }
        Insert: {
          balance: number
          id: string
        }
        Update: {
          balance?: number
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "users_id_fkey"
            columns: ["id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "users_id_fkey"
            columns: ["id"]
            referencedRelation: "v_users"
            referencedColumns: ["id"]
          }
        ]
      }
      voter_group_voters: {
        Row: {
          id: number
          voter_group_id: string
          voter_id: string
        }
        Insert: {
          id?: number
          voter_group_id: string
          voter_id: string
        }
        Update: {
          id?: number
          voter_group_id?: string
          voter_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "voter_group_voters_voter_group_id_fkey"
            columns: ["voter_group_id"]
            referencedRelation: "voter_groups"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "voter_group_voters_voter_id_fkey"
            columns: ["voter_id"]
            referencedRelation: "voters"
            referencedColumns: ["id"]
          }
        ]
      }
      voter_groups: {
        Row: {
          created_at: string
          id: string
          name: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "voter_groups_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "voter_groups_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "v_users"
            referencedColumns: ["id"]
          }
        ]
      }
      voters: {
        Row: {
          address: string
          created_at: string
          email: string | null
          id: string
          name: string | null
          user_id: string
        }
        Insert: {
          address: string
          created_at?: string
          email?: string | null
          id?: string
          name?: string | null
          user_id: string
        }
        Update: {
          address?: string
          created_at?: string
          email?: string | null
          id?: string
          name?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "voters_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "voters_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "v_users"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      decrypted_api_credentials: {
        Row: {
          created_at: string | null
          decrypted_secret: string | null
          deleted_at: string | null
          expires_at: string | null
          id: string | null
          name: string | null
          request_count: number | null
          secret: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          decrypted_secret?: never
          deleted_at?: string | null
          expires_at?: string | null
          id?: string | null
          name?: string | null
          request_count?: number | null
          secret?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          decrypted_secret?: never
          deleted_at?: string | null
          expires_at?: string | null
          id?: string | null
          name?: string | null
          request_count?: number | null
          secret?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "api_credentials_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "api_credentials_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "v_users"
            referencedColumns: ["id"]
          }
        ]
      }
      v_users: {
        Row: {
          email: string | null
          id: string | null
          raw_user_meta_data: Json | null
        }
        Insert: {
          email?: string | null
          id?: string | null
          raw_user_meta_data?: Json | null
        }
        Update: {
          email?: string | null
          id?: string | null
          raw_user_meta_data?: Json | null
        }
        Relationships: []
      }
    }
    Functions: {
      delete_user:
        | {
            Args: {
              current_password: string
            }
            Returns: undefined
          }
        | {
            Args: Record<PropertyKey, never>
            Returns: undefined
          }
      increment_request_count: {
        Args: {
          _user_id: string
          increment_by: number
        }
        Returns: undefined
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
