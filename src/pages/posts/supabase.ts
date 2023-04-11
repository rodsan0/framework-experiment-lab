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
      posts: {
        Row: {
          author: string | null
          body: string | null
          created_at: string | null
          id: number
          title: string | null
        }
        Insert: {
          author?: string | null
          body?: string | null
          created_at?: string | null
          id?: number
          title?: string | null
        }
        Update: {
          author?: string | null
          body?: string | null
          created_at?: string | null
          id?: number
          title?: string | null
        }
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
