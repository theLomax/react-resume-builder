export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      action_item_tags: {
        Row: {
          action_item_id: string
          tag_id: string
        }
        Insert: {
          action_item_id: string
          tag_id: string
        }
        Update: {
          action_item_id?: string
          tag_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "action_item_tags_action_item_id_fkey"
            columns: ["action_item_id"]
            isOneToOne: false
            referencedRelation: "action_items"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "action_item_tags_tag_id_fkey"
            columns: ["tag_id"]
            isOneToOne: false
            referencedRelation: "tags"
            referencedColumns: ["id"]
          },
        ]
      }
      action_item_variants: {
        Row: {
          action_item_id: string
          audience: string
          id: string
          text: string
        }
        Insert: {
          action_item_id: string
          audience: string
          id?: string
          text: string
        }
        Update: {
          action_item_id?: string
          audience?: string
          id?: string
          text?: string
        }
        Relationships: [
          {
            foreignKeyName: "action_item_variants_action_item_id_fkey"
            columns: ["action_item_id"]
            isOneToOne: false
            referencedRelation: "action_items"
            referencedColumns: ["id"]
          },
        ]
      }
      action_items: {
        Row: {
          default_text: string
          display_order: number
          id: string
          is_key_experience: boolean
          key_experience_text: string | null
          role_id: string
          weight: number
        }
        Insert: {
          default_text: string
          display_order: number
          id: string
          is_key_experience?: boolean
          key_experience_text?: string | null
          role_id: string
          weight?: number
        }
        Update: {
          default_text?: string
          display_order?: number
          id?: string
          is_key_experience?: boolean
          key_experience_text?: string | null
          role_id?: string
          weight?: number
        }
        Relationships: [
          {
            foreignKeyName: "action_items_role_id_fkey"
            columns: ["role_id"]
            isOneToOne: false
            referencedRelation: "roles"
            referencedColumns: ["id"]
          },
        ]
      }
      education: {
        Row: {
          degree: string
          field: string | null
          id: string
          institution: string
          profile_id: string
          year: string | null
        }
        Insert: {
          degree: string
          field?: string | null
          id?: string
          institution: string
          profile_id: string
          year?: string | null
        }
        Update: {
          degree?: string
          field?: string | null
          id?: string
          institution?: string
          profile_id?: string
          year?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "education_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profile_summary: {
        Row: {
          id: string
          order: number
          profile_id: string
          text: string
        }
        Insert: {
          id?: string
          order: number
          profile_id: string
          text: string
        }
        Update: {
          id?: string
          order?: number
          profile_id?: string
          text?: string
        }
        Relationships: [
          {
            foreignKeyName: "profile_summary_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string | null
          email: string
          first_name: string
          id: string
          last_name: string
          linkedin: string | null
          location: string | null
          phone: string | null
          site: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          first_name: string
          id?: string
          last_name: string
          linkedin?: string | null
          location?: string | null
          phone?: string | null
          site?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          first_name?: string
          id?: string
          last_name?: string
          linkedin?: string | null
          location?: string | null
          phone?: string | null
          site?: string | null
        }
        Relationships: []
      }
      role_key_tech: {
        Row: {
          display_order: number
          id: string
          name: string
          role_id: string
        }
        Insert: {
          display_order: number
          id?: string
          name: string
          role_id: string
        }
        Update: {
          display_order?: number
          id?: string
          name?: string
          role_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "role_key_tech_role_id_fkey"
            columns: ["role_id"]
            isOneToOne: false
            referencedRelation: "roles"
            referencedColumns: ["id"]
          },
        ]
      }
      roles: {
        Row: {
          city: string | null
          company: string
          company_em: string | null
          display_order: number
          end_month: string | null
          end_year: string
          id: string
          industry: string | null
          profile_id: string
          start_month: string | null
          start_year: string
          state: string | null
          title: string
          title_em: string | null
        }
        Insert: {
          city?: string | null
          company: string
          company_em?: string | null
          display_order: number
          end_month?: string | null
          end_year: string
          id: string
          industry?: string | null
          profile_id: string
          start_month?: string | null
          start_year: string
          state?: string | null
          title: string
          title_em?: string | null
        }
        Update: {
          city?: string | null
          company?: string
          company_em?: string | null
          display_order?: number
          end_month?: string | null
          end_year?: string
          id?: string
          industry?: string | null
          profile_id?: string
          start_month?: string | null
          start_year?: string
          state?: string | null
          title?: string
          title_em?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "roles_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      skill_groups: {
        Row: {
          display_order: number
          id: string
          label: string
        }
        Insert: {
          display_order?: number
          id: string
          label: string
        }
        Update: {
          display_order?: number
          id?: string
          label?: string
        }
        Relationships: []
      }
      skill_tags: {
        Row: {
          skill_id: string
          tag_id: string
        }
        Insert: {
          skill_id: string
          tag_id: string
        }
        Update: {
          skill_id?: string
          tag_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "skill_tags_tag_id_fkey"
            columns: ["tag_id"]
            isOneToOne: false
            referencedRelation: "tags"
            referencedColumns: ["id"]
          },
        ]
      }
      skills: {
        Row: {
          display_order: number
          id: string
          label: string
          skill_group_id: string | null
          tags: string[] | null
        }
        Insert: {
          display_order?: number
          id: string
          label: string
          skill_group_id?: string | null
          tags?: string[] | null
        }
        Update: {
          display_order?: number
          id?: string
          label?: string
          skill_group_id?: string | null
          tags?: string[] | null
        }
        Relationships: [
          {
            foreignKeyName: "skills_skill_group_id_fkey"
            columns: ["skill_group_id"]
            isOneToOne: false
            referencedRelation: "skill_groups"
            referencedColumns: ["id"]
          },
        ]
      }
      tags: {
        Row: {
          id: string
          name: string
        }
        Insert: {
          id?: string
          name: string
        }
        Update: {
          id?: string
          name?: string
        }
        Relationships: []
      }
      variant_action_items: {
        Row: {
          display_order: number
          id: number
          role_id: string | null
          text: string
          variant_id: string | null
        }
        Insert: {
          display_order: number
          id?: never
          role_id?: string | null
          text: string
          variant_id?: string | null
        }
        Update: {
          display_order?: number
          id?: never
          role_id?: string | null
          text?: string
          variant_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "variant_action_items_role_id_fkey"
            columns: ["role_id"]
            isOneToOne: false
            referencedRelation: "roles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "variant_action_items_variant_id_fkey"
            columns: ["variant_id"]
            isOneToOne: false
            referencedRelation: "variants"
            referencedColumns: ["id"]
          },
        ]
      }
      variant_key_tech: {
        Row: {
          display_order: number
          id: number
          name: string
          role_id: string | null
          variant_id: string | null
        }
        Insert: {
          display_order: number
          id?: never
          name: string
          role_id?: string | null
          variant_id?: string | null
        }
        Update: {
          display_order?: number
          id?: never
          name?: string
          role_id?: string | null
          variant_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "variant_key_tech_role_id_fkey"
            columns: ["role_id"]
            isOneToOne: false
            referencedRelation: "roles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "variant_key_tech_variant_id_fkey"
            columns: ["variant_id"]
            isOneToOne: false
            referencedRelation: "variants"
            referencedColumns: ["id"]
          },
        ]
      }
      variant_profile: {
        Row: {
          hide_education: boolean
          subtitle: string[] | null
          summary: string[] | null
          title: string | null
          variant_id: string
        }
        Insert: {
          hide_education?: boolean
          subtitle?: string[] | null
          summary?: string[] | null
          title?: string | null
          variant_id: string
        }
        Update: {
          hide_education?: boolean
          subtitle?: string[] | null
          summary?: string[] | null
          title?: string | null
          variant_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "variant_profile_variant_id_fkey"
            columns: ["variant_id"]
            isOneToOne: true
            referencedRelation: "variants"
            referencedColumns: ["id"]
          },
        ]
      }
      variant_roles: {
        Row: {
          display_order: number
          role_id: string
          show_key_tech: boolean | null
          title_override: string | null
          variant_id: string
        }
        Insert: {
          display_order: number
          role_id: string
          show_key_tech?: boolean | null
          title_override?: string | null
          variant_id: string
        }
        Update: {
          display_order?: number
          role_id?: string
          show_key_tech?: boolean | null
          title_override?: string | null
          variant_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "variant_roles_role_id_fkey"
            columns: ["role_id"]
            isOneToOne: false
            referencedRelation: "roles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "variant_roles_variant_id_fkey"
            columns: ["variant_id"]
            isOneToOne: false
            referencedRelation: "variants"
            referencedColumns: ["id"]
          },
        ]
      }
      variant_skill_groups: {
        Row: {
          display_order: number
          skill_group_id: string
          variant_id: string
        }
        Insert: {
          display_order: number
          skill_group_id: string
          variant_id: string
        }
        Update: {
          display_order?: number
          skill_group_id?: string
          variant_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "variant_skill_groups_skill_group_id_fkey"
            columns: ["skill_group_id"]
            isOneToOne: false
            referencedRelation: "skill_groups"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "variant_skill_groups_variant_id_fkey"
            columns: ["variant_id"]
            isOneToOne: false
            referencedRelation: "variants"
            referencedColumns: ["id"]
          },
        ]
      }
      variant_skills: {
        Row: {
          display_order: number
          label_override: string | null
          skill_id: string
          variant_id: string
        }
        Insert: {
          display_order: number
          label_override?: string | null
          skill_id: string
          variant_id: string
        }
        Update: {
          display_order?: number
          label_override?: string | null
          skill_id?: string
          variant_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "variant_skills_skill_id_fkey"
            columns: ["skill_id"]
            isOneToOne: false
            referencedRelation: "skills"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "variant_skills_variant_id_fkey"
            columns: ["variant_id"]
            isOneToOne: false
            referencedRelation: "variants"
            referencedColumns: ["id"]
          },
        ]
      }
      variants: {
        Row: {
          company: string | null
          id: string
          label: string | null
          name: string | null
          role_slug: string | null
        }
        Insert: {
          company?: string | null
          id: string
          label?: string | null
          name?: string | null
          role_slug?: string | null
        }
        Update: {
          company?: string | null
          id?: string
          label?: string | null
          name?: string | null
          role_slug?: string | null
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
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
