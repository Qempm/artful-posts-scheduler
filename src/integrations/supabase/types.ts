export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      commandes: {
        Row: {
          adresse: string
          client: string
          created_at: string
          details_panier: Json | null
          id: number
          nom_client: string
          prenom_client: string
          produit_id: number | null
          reference: string
          status: string | null
          statut_paiement: string | null
        }
        Insert: {
          adresse: string
          client: string
          created_at?: string
          details_panier?: Json | null
          id?: number
          nom_client: string
          prenom_client: string
          produit_id?: number | null
          reference: string
          status?: string | null
          statut_paiement?: string | null
        }
        Update: {
          adresse?: string
          client?: string
          created_at?: string
          details_panier?: Json | null
          id?: number
          nom_client?: string
          prenom_client?: string
          produit_id?: number | null
          reference?: string
          status?: string | null
          statut_paiement?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "commandes_produit_id_fkey"
            columns: ["produit_id"]
            isOneToOne: false
            referencedRelation: "produits"
            referencedColumns: ["id"]
          },
        ]
      }
      email_logs: {
        Row: {
          clicked_at: string | null
          created_at: string | null
          id: string
          opened_at: string | null
          post_id: string
          sent_at: string | null
          status: Database["public"]["Enums"]["email_status"] | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          clicked_at?: string | null
          created_at?: string | null
          id?: string
          opened_at?: string | null
          post_id: string
          sent_at?: string | null
          status?: Database["public"]["Enums"]["email_status"] | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          clicked_at?: string | null
          created_at?: string | null
          id?: string
          opened_at?: string | null
          post_id?: string
          sent_at?: string | null
          status?: Database["public"]["Enums"]["email_status"] | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "email_logs_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
        ]
      }
      faq: {
        Row: {
          id: number
          ordre: number
          question: string
          reponse: string
        }
        Insert: {
          id?: number
          ordre?: number
          question: string
          reponse: string
        }
        Update: {
          id?: number
          ordre?: number
          question?: string
          reponse?: string
        }
        Relationships: []
      }
      posts: {
        Row: {
          body: string
          comments: number | null
          created_at: string | null
          engagement_score: number | null
          generated_at: string | null
          hook: string
          id: string
          likes: number | null
          published_at: string | null
          scheduled_at: string | null
          shares: number | null
          status: Database["public"]["Enums"]["post_status"] | null
          type: Database["public"]["Enums"]["post_type"]
          updated_at: string | null
          user_id: string
        }
        Insert: {
          body: string
          comments?: number | null
          created_at?: string | null
          engagement_score?: number | null
          generated_at?: string | null
          hook: string
          id?: string
          likes?: number | null
          published_at?: string | null
          scheduled_at?: string | null
          shares?: number | null
          status?: Database["public"]["Enums"]["post_status"] | null
          type: Database["public"]["Enums"]["post_type"]
          updated_at?: string | null
          user_id: string
        }
        Update: {
          body?: string
          comments?: number | null
          created_at?: string | null
          engagement_score?: number | null
          generated_at?: string | null
          hook?: string
          id?: string
          likes?: number | null
          published_at?: string | null
          scheduled_at?: string | null
          shares?: number | null
          status?: Database["public"]["Enums"]["post_status"] | null
          type?: Database["public"]["Enums"]["post_type"]
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      produits: {
        Row: {
          description: string | null
          id: number
          image: string | null
          nom: string
          prix: number
        }
        Insert: {
          description?: string | null
          id?: number
          image?: string | null
          nom: string
          prix: number
        }
        Update: {
          description?: string | null
          id?: number
          image?: string | null
          nom?: string
          prix?: number
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          email_notifications: boolean | null
          id: string
          name: string | null
          style_profile: Json | null
          timezone: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          email_notifications?: boolean | null
          id: string
          name?: string | null
          style_profile?: Json | null
          timezone?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          email_notifications?: boolean | null
          id?: string
          name?: string | null
          style_profile?: Json | null
          timezone?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      prompt_history: {
        Row: {
          content_type: string
          created_at: string
          generated_prompt: string
          id: string
          keyword: string
          user_id: string
        }
        Insert: {
          content_type: string
          created_at?: string
          generated_prompt: string
          id?: string
          keyword: string
          user_id: string
        }
        Update: {
          content_type?: string
          created_at?: string
          generated_prompt?: string
          id?: string
          keyword?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "prompt_history_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      settings: {
        Row: {
          auto_send_email: boolean | null
          created_at: string | null
          id: string
          reflection_schedule: string | null
          storytelling_schedule: string | null
          thread_schedule: string | null
          updated_at: string | null
        }
        Insert: {
          auto_send_email?: boolean | null
          created_at?: string | null
          id: string
          reflection_schedule?: string | null
          storytelling_schedule?: string | null
          thread_schedule?: string | null
          updated_at?: string | null
        }
        Update: {
          auto_send_email?: boolean | null
          created_at?: string | null
          id?: string
          reflection_schedule?: string | null
          storytelling_schedule?: string | null
          thread_schedule?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      email_status: "pending" | "delivered" | "opened" | "clicked"
      post_status: "draft" | "scheduled" | "published"
      post_type: "storytelling" | "reflection" | "thread"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
