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
      conversation_participants: {
        Row: {
          conversation_id: string;
          created_at: string;
          id: string;
          profile_id: string;
        };
        Insert: {
          conversation_id: string;
          created_at?: string;
          id?: string;
          profile_id: string;
        };
        Update: {
          conversation_id?: string;
          created_at?: string;
          id?: string;
          profile_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'conversation_participants_conversation_id_fkey';
            columns: ['conversation_id'];
            referencedRelation: 'conversations';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'conversation_participants_profile_id_fkey';
            columns: ['profile_id'];
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          }
        ];
      };
      conversations: {
        Row: {
          conversation_pid: string;
          created_at: string;
          id: string;
          last_message: string;
          last_message_pid: string;
        };
        Insert: {
          conversation_pid?: string;
          created_at?: string;
          id?: string;
          last_message: string;
          last_message_pid: string;
        };
        Update: {
          conversation_pid?: string;
          created_at?: string;
          id?: string;
          last_message?: string;
          last_message_pid?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'conversations_conversation_pid_fkey';
            columns: ['conversation_pid'];
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'conversations_last_message_fkey';
            columns: ['last_message'];
            referencedRelation: 'messages';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'conversations_last_message_pid_fkey';
            columns: ['last_message_pid'];
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          }
        ];
      };
      matches: {
        Row: {
          created_at: string;
          id: string;
          profile_id_1: string;
          profile_id_2: string;
          status: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          profile_id_1: string;
          profile_id_2: string;
          status: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          profile_id_1?: string;
          profile_id_2?: string;
          status?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'matches_profile_id_1_fkey';
            columns: ['profile_id_1'];
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'matches_profile_id_2_fkey';
            columns: ['profile_id_2'];
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          }
        ];
      };
      messages: {
        Row: {
          content: string;
          conversation_id: string;
          created_at: string;
          id: string;
          sender_id: string;
        };
        Insert: {
          content: string;
          conversation_id: string;
          created_at?: string;
          id?: string;
          sender_id: string;
        };
        Update: {
          content?: string;
          conversation_id?: string;
          created_at?: string;
          id?: string;
          sender_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'messages_conversation_id_fkey';
            columns: ['conversation_id'];
            referencedRelation: 'conversations';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'messages_profile_id_fkey';
            columns: ['profile_id'];
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          }
        ];
      };
      photo_likes: {
        Row: {
          comment: string | null;
          created_at: string;
          id: string;
          likee: string;
          liker: string;
          photo: string;
        };
        Insert: {
          comment?: string | null;
          created_at?: string;
          id?: string;
          likee: string;
          liker: string;
          photo: string;
        };
        Update: {
          comment?: string | null;
          created_at?: string;
          id?: string;
          likee?: string;
          liker?: string;
          photo?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'photo_likes_likee_fkey';
            columns: ['likee'];
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'photo_likes_liker_fkey';
            columns: ['liker'];
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'photo_likes_photo_fkey';
            columns: ['photo'];
            referencedRelation: 'photos';
            referencedColumns: ['id'];
          }
        ];
      };
      photos: {
        Row: {
          created_at: string;
          id: string;
          profile_id: string;
          src: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          profile_id: string;
          src: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          profile_id?: string;
          src?: string;
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
          first_name: string;
          gender: string;
          id: string;
          location: {
            lat: number;
            long: number;
            toponym: string;
          };
          name: string | null;
          onboarded: boolean;
          skipped_profiles: string[] | null;
        };
        Insert: {
          avatar_url?: string | null;
          created_at?: string;
          date_of_birth?: Date;
          denomination?: string;
          email: string;
          first_name: string;
          gender?: string;
          id: string;
          location?: {
            lat: number;
            long: number;
            toponym: string;
          };
          name?: string | null;
          onboarded?: boolean;
          skipped_profiles?: string[] | null;
        };
        Update: {
          avatar_url?: string | null;
          created_at?: string;
          date_of_birth?: Date;
          denomination?: string;
          email?: string;
          first_name?: string;
          gender?: string;
          id?: string;
          location?: {
            lat: number;
            long: number;
            toponym: string;
          };
          name?: string | null;
          onboarded?: boolean;
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
      prompt_likes: {
        Row: {
          comment: string | null;
          created_at: string;
          id: string;
          likee: string;
          liker: string;
          prompt: string;
        };
        Insert: {
          comment?: string | null;
          created_at?: string;
          id?: string;
          likee: string;
          liker: string;
          prompt: string;
        };
        Update: {
          comment?: string | null;
          created_at?: string;
          id?: string;
          likee?: string;
          liker?: string;
          prompt?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'prompt_likes_likee_fkey';
            columns: ['likee'];
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'prompt_likes_liker_fkey';
            columns: ['liker'];
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'prompt_likes_prompt_fkey';
            columns: ['prompt'];
            referencedRelation: 'prompts';
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
