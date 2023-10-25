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
      conversations: {
        Row: {
          created_at: string;
          id: string;
          last_message: string | null;
          participant1: string | null;
          participant2: string | null;
          party1_read: boolean | null;
          party2_read: boolean | null;
        };
        Insert: {
          created_at?: string;
          id?: string;
          last_message?: string | null;
          participant1?: string | null;
          participant2?: string | null;
          party1_read?: boolean | null;
          party2_read?: boolean | null;
        };
        Update: {
          created_at?: string;
          id?: string;
          last_message?: string | null;
          participant1?: string | null;
          participant2?: string | null;
          party1_read?: boolean | null;
          party2_read?: boolean | null;
        };
        Relationships: [
          {
            foreignKeyName: 'conversations_last_message_fkey';
            columns: ['last_message'];
            referencedRelation: 'messages';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'conversations_participant1_fkey';
            columns: ['participant1'];
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'conversations_participant1_fkey';
            columns: ['participant1'];
            referencedRelation: 'random_profiles';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'conversations_participant2_fkey';
            columns: ['participant2'];
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'conversations_participant2_fkey';
            columns: ['participant2'];
            referencedRelation: 'random_profiles';
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
            foreignKeyName: 'matches_profile_id_1_fkey';
            columns: ['profile_id_1'];
            referencedRelation: 'random_profiles';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'matches_profile_id_2_fkey';
            columns: ['profile_id_2'];
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'matches_profile_id_2_fkey';
            columns: ['profile_id_2'];
            referencedRelation: 'random_profiles';
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
            foreignKeyName: 'messages_sender_id_fkey';
            columns: ['sender_id'];
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'messages_sender_id_fkey';
            columns: ['sender_id'];
            referencedRelation: 'random_profiles';
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
            foreignKeyName: 'photo_likes_likee_fkey';
            columns: ['likee'];
            referencedRelation: 'random_profiles';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'photo_likes_liker_fkey';
            columns: ['liker'];
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'photo_likes_liker_fkey';
            columns: ['liker'];
            referencedRelation: 'random_profiles';
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
          updated_at: Date;
        };
        Insert: {
          created_at?: string;
          id?: string;
          profile_id: string;
          src: string;
          updated_at?: Date;
        };
        Update: {
          created_at?: string;
          id?: string;
          profile_id?: string;
          src?: string;
          updated_at?: Date;
        };
        Relationships: [
          {
            foreignKeyName: 'photos_profile_id_fkey';
            columns: ['profile_id'];
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'photos_profile_id_fkey';
            columns: ['profile_id'];
            referencedRelation: 'random_profiles';
            referencedColumns: ['id'];
          }
        ];
      };
      profiles: {
        Row: {
          age: number;
          coordinates: Json;
          created_at: string;
          date_of_birth: Date;
          denomination: string;
          email: string | null;
          first_name: string;
          gender: string;
          id: string;
          location: unknown | null;
          onboarded: boolean;
          toponym: string;
        };
        Insert: {
          age?: number;
          coordinates?: Json;
          created_at?: string;
          date_of_birth?: Date;
          denomination?: string;
          email?: string | null;
          first_name?: string;
          gender?: string;
          id: string;
          location?: unknown | null;
          onboarded?: boolean;
          toponym?: string;
        };
        Update: {
          age?: number;
          coordinates?: Json;
          created_at?: string;
          date_of_birth?: Date;
          denomination?: string;
          email?: string | null;
          first_name?: string;
          gender?: string;
          id?: string;
          location?: unknown | null;
          onboarded?: boolean;
          toponym?: string;
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
            foreignKeyName: 'prompt_likes_likee_fkey';
            columns: ['likee'];
            referencedRelation: 'random_profiles';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'prompt_likes_liker_fkey';
            columns: ['liker'];
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'prompt_likes_liker_fkey';
            columns: ['liker'];
            referencedRelation: 'random_profiles';
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
          },
          {
            foreignKeyName: 'prompts_profile_id_fkey';
            columns: ['profile_id'];
            referencedRelation: 'random_profiles';
            referencedColumns: ['id'];
          }
        ];
      };
      subscriptions: {
        Row: {
          amount: number;
          created_at: string;
          description: string | null;
          end_date: string;
          id: string;
          liqpay_order_id: string;
          profile_id: string;
          transaction_id: string;
        };
        Insert: {
          amount: number;
          created_at?: string;
          description?: string | null;
          end_date: string;
          id?: string;
          liqpay_order_id: string;
          profile_id: string;
          transaction_id: string;
        };
        Update: {
          amount?: number;
          created_at?: string;
          description?: string | null;
          end_date?: string;
          id?: string;
          liqpay_order_id?: string;
          profile_id?: string;
          transaction_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'subscriptions_profile_id_fkey';
            columns: ['profile_id'];
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'subscriptions_profile_id_fkey';
            columns: ['profile_id'];
            referencedRelation: 'random_profiles';
            referencedColumns: ['id'];
          }
        ];
      };
    };
    Views: {
      random_profiles: {
        Row: {
          age: number | null;
          coordinates: Json | null;
          created_at: string | null;
          date_of_birth: string | null;
          denomination: string | null;
          email: string | null;
          first_name: string | null;
          gender: string | null;
          id: string | null;
          location: unknown | null;
          onboarded: boolean | null;
          toponym: string | null;
        };
        Insert: {
          age?: number | null;
          coordinates?: Json | null;
          created_at?: string | null;
          date_of_birth?: string | null;
          denomination?: string | null;
          email?: string | null;
          first_name?: string | null;
          gender?: string | null;
          id?: string | null;
          location?: unknown | null;
          onboarded?: boolean | null;
          toponym?: string | null;
        };
        Update: {
          age?: number | null;
          coordinates?: Json | null;
          created_at?: string | null;
          date_of_birth?: string | null;
          denomination?: string | null;
          email?: string | null;
          first_name?: string | null;
          gender?: string | null;
          id?: string | null;
          location?: unknown | null;
          onboarded?: boolean | null;
          toponym?: string | null;
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
    Functions: {
      is_conversation_participant: {
        Args: {
          conversation_id: string;
          profile_id: string;
        };
        Returns: boolean;
      };
      nearby_profiles: {
        Args: {
          lat: number;
          long: number;
        };
        Returns: {
          id: string;
          toponym: string;
          lat: number;
          long: number;
          dist_meters: number;
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
