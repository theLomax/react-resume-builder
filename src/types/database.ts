export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          first_name: string
          last_name: string
          email: string
          phone: string | null
          site: string | null
          linkedin: string | null
          location: string | null
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['profiles']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['profiles']['Insert']>
      }
      profile_summary: {
        Row: {
          id: string
          profile_id: string
          text: string
          order: number
        }
        Insert: Omit<Database['public']['Tables']['profile_summary']['Row'], 'id'>
        Update: Partial<Database['public']['Tables']['profile_summary']['Insert']>
      }
      education: {
        Row: {
          id: string
          profile_id: string
          institution: string
          degree: string
          field: string | null
          year: string | null
        }
        Insert: Omit<Database['public']['Tables']['education']['Row'], 'id'>
        Update: Partial<Database['public']['Tables']['education']['Insert']>
      }
      tags: {
        Row: {
          id: string
          name: string
        }
        Insert: Omit<Database['public']['Tables']['tags']['Row'], 'id'>
        Update: Partial<Database['public']['Tables']['tags']['Insert']>
      }
      roles: {
        Row: {
          id: string
          profile_id: string
          company: string
          company_em: string | null
          title: string
          title_em: string | null
          start_year: string
          start_month: string | null
          end_year: string
          end_month: string | null
          city: string | null
          state: string | null
          industry: string | null
          display_order: number
        }
        Insert: Database['public']['Tables']['roles']['Row']
        Update: Partial<Database['public']['Tables']['roles']['Insert']>
      }
      role_key_tech: {
        Row: {
          id: string
          role_id: string
          name: string
          display_order: number
        }
        Insert: Omit<Database['public']['Tables']['role_key_tech']['Row'], 'id'>
        Update: Partial<Database['public']['Tables']['role_key_tech']['Insert']>
      }
      action_items: {
        Row: {
          id: string
          role_id: string
          default_text: string
          key_experience_text: string | null
          is_key_experience: boolean
          weight: number
          display_order: number
        }
        Insert: Database['public']['Tables']['action_items']['Row']
        Update: Partial<Database['public']['Tables']['action_items']['Insert']>
      }
      action_item_variants: {
        Row: {
          id: string
          action_item_id: string
          audience: string
          text: string
        }
        Insert: Omit<Database['public']['Tables']['action_item_variants']['Row'], 'id'>
        Update: Partial<Database['public']['Tables']['action_item_variants']['Insert']>
      }
      action_item_tags: {
        Row: {
          action_item_id: string
          tag_id: string
        }
        Insert: Database['public']['Tables']['action_item_tags']['Row']
        Update: Partial<Database['public']['Tables']['action_item_tags']['Insert']>
      }
      skill_groups: {
        Row: {
          id: string
          label: string
          display_order: number
        }
        Insert: Omit<Database['public']['Tables']['skill_groups']['Row'], 'id'>
        Update: Partial<Database['public']['Tables']['skill_groups']['Insert']>
      }
      skills: {
        Row: {
          id: string
          skill_group_id: string
          label: string
          display_order: number
        }
        Insert: Omit<Database['public']['Tables']['skills']['Row'], 'id'>
        Update: Partial<Database['public']['Tables']['skills']['Insert']>
      }
      skill_tags: {
        Row: {
          skill_id: string
          tag_id: string
        }
        Insert: Database['public']['Tables']['skill_tags']['Row']
        Update: Partial<Database['public']['Tables']['skill_tags']['Insert']>
      }
      variants: {
        Row: {
          id: string
          label: string | null
          company: string | null
          role_slug: string | null
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['variants']['Row'], 'created_at'>
        Update: Partial<Database['public']['Tables']['variants']['Insert']>
      }
      variant_profile: {
        Row: {
          id: string
          variant_id: string
          title: string | null
          subtitle: string[] | null
          summary: string[] | null
          hide_education: boolean | null
        }
        Insert: Omit<Database['public']['Tables']['variant_profile']['Row'], 'id'>
        Update: Partial<Database['public']['Tables']['variant_profile']['Insert']>
      }
      variant_roles: {
        Row: {
          id: string
          variant_id: string
          role_id: string
          display_order: number
          title_override: string | null
          show_key_tech: boolean | null
        }
        Insert: Omit<Database['public']['Tables']['variant_roles']['Row'], 'id'>
        Update: Partial<Database['public']['Tables']['variant_roles']['Insert']>
      }
      variant_action_items: {
        Row: {
          id: string
          variant_id: string
          role_id: string
          text: string
          display_order: number
        }
        Insert: Omit<Database['public']['Tables']['variant_action_items']['Row'], 'id'>
        Update: Partial<Database['public']['Tables']['variant_action_items']['Insert']>
      }
      variant_key_tech: {
        Row: {
          id: string
          variant_id: string
          role_id: string
          name: string
          display_order: number
        }
        Insert: Omit<Database['public']['Tables']['variant_key_tech']['Row'], 'id'>
        Update: Partial<Database['public']['Tables']['variant_key_tech']['Insert']>
      }
      variant_skill_groups: {
        Row: {
          id: string
          variant_id: string
          skill_group_id: string
          display_order: number
        }
        Insert: Omit<Database['public']['Tables']['variant_skill_groups']['Row'], 'id'>
        Update: Partial<Database['public']['Tables']['variant_skill_groups']['Insert']>
      }
      variant_skills: {
        Row: {
          id: string
          variant_id: string
          skill_id: string
          display_order: number
          label_override: string | null
        }
        Insert: Omit<Database['public']['Tables']['variant_skills']['Row'], 'id'>
        Update: Partial<Database['public']['Tables']['variant_skills']['Insert']>
      }
    }
    Views: Record<string, never>
    Functions: Record<string, never>
    Enums: Record<string, never>
    CompositeTypes: Record<string, never>
  }
}

// Convenience row types
export type Profile       = Database['public']['Tables']['profiles']['Row']
export type ProfileSummary = Database['public']['Tables']['profile_summary']['Row']
export type Education     = Database['public']['Tables']['education']['Row']
export type Tag           = Database['public']['Tables']['tags']['Row']
export type Role          = Database['public']['Tables']['roles']['Row']
export type RoleKeyTech   = Database['public']['Tables']['role_key_tech']['Row']
export type ActionItem    = Database['public']['Tables']['action_items']['Row']
export type ActionItemVariant = Database['public']['Tables']['action_item_variants']['Row']
export type SkillGroups         = Database['public']['Tables']['skill_groups']['Row']
export type Skill               = Database['public']['Tables']['skills']['Row']
export type Variant             = Database['public']['Tables']['variants']['Row']
export type VariantProfile      = Database['public']['Tables']['variant_profile']['Row']
export type VariantRole         = Database['public']['Tables']['variant_roles']['Row']
export type VariantActionItem   = Database['public']['Tables']['variant_action_items']['Row']
export type VariantKeyTech      = Database['public']['Tables']['variant_key_tech']['Row']
export type VariantSkillGroup   = Database['public']['Tables']['variant_skill_groups']['Row']
export type VariantSkill        = Database['public']['Tables']['variant_skills']['Row']
