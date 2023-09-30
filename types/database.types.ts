export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  graphql_public: {
    Tables: {
      [_ in never]: never;
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      graphql: {
        Args: {
          operationName?: string;
          query?: string;
          variables?: Json;
          extensions?: Json;
        };
        Returns: Json;
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
  public: {
    Tables: {
      likes: {
        Row: {
          comment: string | null;
          created_at: string;
          id: string;
          photo_id: string | null;
          profile_id: string | null;
          prompt_id: string | null;
        };
        Insert: {
          comment?: string | null;
          created_at?: string;
          id?: string;
          photo_id?: string | null;
          profile_id?: string | null;
          prompt_id?: string | null;
        };
        Update: {
          comment?: string | null;
          created_at?: string;
          id?: string;
          photo_id?: string | null;
          profile_id?: string | null;
          prompt_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'likes_photo_id_fkey';
            columns: ['photo_id'];
            referencedRelation: 'photos';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'likes_profile_id_fkey';
            columns: ['profile_id'];
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'likes_prompt_id_fkey';
            columns: ['prompt_id'];
            referencedRelation: 'prompts';
            referencedColumns: ['id'];
          }
        ];
      };
      photos: {
        Row: {
          created_at: string;
          id: string;
          main_photo: string | null;
          photo2: string | null;
          photo3: string | null;
          photo4: string | null;
          photo5: string | null;
          photo6: string | null;
          profile_id: string | null;
        };
        Insert: {
          created_at?: string;
          id?: string;
          main_photo?: string | null;
          photo2?: string | null;
          photo3?: string | null;
          photo4?: string | null;
          photo5?: string | null;
          photo6?: string | null;
          profile_id?: string | null;
        };
        Update: {
          created_at?: string;
          id?: string;
          main_photo?: string | null;
          photo2?: string | null;
          photo3?: string | null;
          photo4?: string | null;
          photo5?: string | null;
          photo6?: string | null;
          profile_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'photos_profile_id_fkey';
            columns: ['profile_id'];
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          }
        ];
      };
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
          onboarded: boolean;
          photos: Json | null;
          skipped_profiles: string[] | null;
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
          onboarded?: boolean;
          photos?: Json | null;
          skipped_profiles?: string[] | null;
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
          onboarded?: boolean;
          photos?: Json | null;
          skipped_profiles?: string[] | null;
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
      prompts: {
        Row: {
          answer: string;
          id: string;
          profile_id: string;
          question: string;
        };
        Insert: {
          answer: string;
          id?: string;
          profile_id: string;
          question: string;
        };
        Update: {
          answer?: string;
          id?: string;
          profile_id?: string;
          question?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'prompts_profile_id_fkey';
            columns: ['profile_id'];
            referencedRelation: 'profiles';
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
  storage: {
    Tables: {
      buckets: {
        Row: {
          allowed_mime_types: string[] | null;
          avif_autodetection: boolean | null;
          created_at: string | null;
          file_size_limit: number | null;
          id: string;
          name: string;
          owner: string | null;
          public: boolean | null;
          updated_at: string | null;
        };
        Insert: {
          allowed_mime_types?: string[] | null;
          avif_autodetection?: boolean | null;
          created_at?: string | null;
          file_size_limit?: number | null;
          id: string;
          name: string;
          owner?: string | null;
          public?: boolean | null;
          updated_at?: string | null;
        };
        Update: {
          allowed_mime_types?: string[] | null;
          avif_autodetection?: boolean | null;
          created_at?: string | null;
          file_size_limit?: number | null;
          id?: string;
          name?: string;
          owner?: string | null;
          public?: boolean | null;
          updated_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'buckets_owner_fkey';
            columns: ['owner'];
            referencedRelation: 'users';
            referencedColumns: ['id'];
          }
        ];
      };
      migrations: {
        Row: {
          executed_at: string | null;
          hash: string;
          id: number;
          name: string;
        };
        Insert: {
          executed_at?: string | null;
          hash: string;
          id: number;
          name: string;
        };
        Update: {
          executed_at?: string | null;
          hash?: string;
          id?: number;
          name?: string;
        };
        Relationships: [];
      };
      objects: {
        Row: {
          bucket_id: string | null;
          created_at: string | null;
          id: string;
          last_accessed_at: string | null;
          metadata: Json | null;
          name: string | null;
          owner: string | null;
          path_tokens: string[] | null;
          updated_at: string | null;
          version: string | null;
        };
        Insert: {
          bucket_id?: string | null;
          created_at?: string | null;
          id?: string;
          last_accessed_at?: string | null;
          metadata?: Json | null;
          name?: string | null;
          owner?: string | null;
          path_tokens?: string[] | null;
          updated_at?: string | null;
          version?: string | null;
        };
        Update: {
          bucket_id?: string | null;
          created_at?: string | null;
          id?: string;
          last_accessed_at?: string | null;
          metadata?: Json | null;
          name?: string | null;
          owner?: string | null;
          path_tokens?: string[] | null;
          updated_at?: string | null;
          version?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'objects_bucketId_fkey';
            columns: ['bucket_id'];
            referencedRelation: 'buckets';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'objects_owner_fkey';
            columns: ['owner'];
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
      can_insert_object: {
        Args: {
          bucketid: string;
          name: string;
          owner: string;
          metadata: Json;
        };
        Returns: undefined;
      };
      extension: {
        Args: {
          name: string;
        };
        Returns: string;
      };
      filename: {
        Args: {
          name: string;
        };
        Returns: string;
      };
      foldername: {
        Args: {
          name: string;
        };
        Returns: unknown;
      };
      get_size_by_bucket: {
        Args: Record<PropertyKey, never>;
        Returns: {
          size: number;
          bucket_id: string;
        }[];
      };
      search: {
        Args: {
          prefix: string;
          bucketname: string;
          limits?: number;
          levels?: number;
          offsets?: number;
          search?: string;
          sortcolumn?: string;
          sortorder?: string;
        };
        Returns: {
          name: string;
          id: string;
          updated_at: string;
          created_at: string;
          last_accessed_at: string;
          metadata: Json;
        }[];
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
