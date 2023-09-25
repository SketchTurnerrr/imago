export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          avatar_url: string | null;
          created_at: string;
          date_of_birth: Date;
          denomination: string;
          email: string;
          first_name: string | null;
          gender: string;
          id: string;
          location: Json;
          name: string | null;
          photos: Json | null;
        };
        Insert: {
          avatar_url?: string | null;
          created_at?: string;
          date_of_birth?: Date;
          denomination?: string;
          email: string;
          first_name?: string | null;
          gender?: string;
          id: string;
          location?: Json;
          name?: string | null;
          photos?: Json | null;
        };
        Update: {
          avatar_url?: string | null;
          created_at?: string;
          date_of_birth?: Date;
          denomination?: string;
          email?: string;
          first_name?: string | null;
          gender?: string;
          id?: string;
          location?: Json;
          name?: string | null;
          photos?: Json | null;
        };
        Relationships: [
          {
            foreignKeyName: 'profiles_id_fkey';
            columns: ['id'];
            referencedRelation: 'users';
            referencedColumns: ['id'];
          }
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
