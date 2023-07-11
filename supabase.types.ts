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
      api_credentials: {
        Row: {
          active: boolean
          created_at: string | null
          expires_at: string | null
          id: number
          name: string
          permissions: string[]
          secret: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          active?: boolean
          created_at?: string | null
          expires_at?: string | null
          id?: number
          name: string
          permissions: string[]
          secret: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          active?: boolean
          created_at?: string | null
          expires_at?: string | null
          id?: number
          name?: string
          permissions?: string[]
          secret?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "api_credentials_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      contracts: {
        Row: {
          address: string
          created_at: string | null
          id: string
          user_id: string
        }
        Insert: {
          address: string
          created_at?: string | null
          id?: string
          user_id?: string
        }
        Update: {
          address?: string
          created_at?: string | null
          id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "contracts_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      proposals: {
        Row: {
          contract_id: string
          created_at: string | null
          id: string
        }
        Insert: {
          contract_id: string
          created_at?: string | null
          id?: string
        }
        Update: {
          contract_id?: string
          created_at?: string | null
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
      voter_group_voters: {
        Row: {
          created_at: string | null
          id: number
          voter_group_id: number
          voter_id: number
        }
        Insert: {
          created_at?: string | null
          id?: number
          voter_group_id: number
          voter_id: number
        }
        Update: {
          created_at?: string | null
          id?: number
          voter_group_id?: number
          voter_id?: number
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
          created_at: string | null
          id: number
          name: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: number
          name: string
          user_id?: string
        }
        Update: {
          created_at?: string | null
          id?: number
          name?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "voter_groups_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      voters: {
        Row: {
          address: string
          created_at: string | null
          email: string | null
          id: number
          name: string | null
          user_id: string | null
        }
        Insert: {
          address: string
          created_at?: string | null
          email?: string | null
          id?: number
          name?: string | null
          user_id?: string | null
        }
        Update: {
          address?: string
          created_at?: string | null
          email?: string | null
          id?: number
          name?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "voters_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
