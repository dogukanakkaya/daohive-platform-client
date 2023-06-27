export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      contracts: {
        Row: {
          address: string | null
          created_at: string | null
          deployment_status: number | null
          description: string | null
          id: string
          name: string
          user_id: string
        }
        Insert: {
          address?: string | null
          created_at?: string | null
          deployment_status?: number | null
          description?: string | null
          id?: string
          name?: string
          user_id?: string
        }
        Update: {
          address?: string | null
          created_at?: string | null
          deployment_status?: number | null
          description?: string | null
          id?: string
          name?: string
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
        Relationships: []
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