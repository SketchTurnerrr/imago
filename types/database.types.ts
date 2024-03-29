export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
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
          has_unread_messages: boolean;
          id: string;
          last_message: string | null;
          last_read_message_id: string | null;
          participant1: string | null;
          participant2: string | null;
        };
        Insert: {
          created_at?: string;
          has_unread_messages?: boolean;
          id?: string;
          last_message?: string | null;
          last_read_message_id?: string | null;
          participant1?: string | null;
          participant2?: string | null;
        };
        Update: {
          created_at?: string;
          has_unread_messages?: boolean;
          id?: string;
          last_message?: string | null;
          last_read_message_id?: string | null;
          participant1?: string | null;
          participant2?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "conversations_last_message_fkey";
            columns: ["last_message"];
            isOneToOne: false;
            referencedRelation: "messages";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "conversations_last_read_message_id_fkey";
            columns: ["last_read_message_id"];
            isOneToOne: false;
            referencedRelation: "messages";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "conversations_participant1_fkey";
            columns: ["participant1"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "conversations_participant1_fkey";
            columns: ["participant1"];
            isOneToOne: false;
            referencedRelation: "random_profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "conversations_participant2_fkey";
            columns: ["participant2"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "conversations_participant2_fkey";
            columns: ["participant2"];
            isOneToOne: false;
            referencedRelation: "random_profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      filters: {
        Row: {
          age: number[];
          created_at: string;
          denomination: string[];
          id: string;
          profile_id: string;
        };
        Insert: {
          age?: number[];
          created_at?: string;
          denomination?: string[];
          id?: string;
          profile_id: string;
        };
        Update: {
          age?: number[];
          created_at?: string;
          denomination?: string[];
          id?: string;
          profile_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "filters_profile_id_fkey";
            columns: ["profile_id"];
            isOneToOne: true;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "filters_profile_id_fkey";
            columns: ["profile_id"];
            isOneToOne: true;
            referencedRelation: "random_profiles";
            referencedColumns: ["id"];
          },
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
            foreignKeyName: "matches_profile_id_1_fkey";
            columns: ["profile_id_1"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "matches_profile_id_1_fkey";
            columns: ["profile_id_1"];
            isOneToOne: false;
            referencedRelation: "random_profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "matches_profile_id_2_fkey";
            columns: ["profile_id_2"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "matches_profile_id_2_fkey";
            columns: ["profile_id_2"];
            isOneToOne: false;
            referencedRelation: "random_profiles";
            referencedColumns: ["id"];
          },
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
            foreignKeyName: "messages_conversation_id_fkey";
            columns: ["conversation_id"];
            isOneToOne: false;
            referencedRelation: "conversations";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "messages_sender_id_fkey";
            columns: ["sender_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "messages_sender_id_fkey";
            columns: ["sender_id"];
            isOneToOne: false;
            referencedRelation: "random_profiles";
            referencedColumns: ["id"];
          },
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
            foreignKeyName: "photo_likes_likee_fkey";
            columns: ["likee"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "photo_likes_likee_fkey";
            columns: ["likee"];
            isOneToOne: false;
            referencedRelation: "random_profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "photo_likes_liker_fkey";
            columns: ["liker"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "photo_likes_liker_fkey";
            columns: ["liker"];
            isOneToOne: false;
            referencedRelation: "random_profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "photo_likes_photo_fkey";
            columns: ["photo"];
            isOneToOne: false;
            referencedRelation: "photos";
            referencedColumns: ["id"];
          },
        ];
      };
      photos: {
        Row: {
          created_at: Date;
          id: string;
          profile_id: string;
          src: string;
          updated_at: Date;
        };
        Insert: {
          created_at?: Date;
          id?: string;
          profile_id: string;
          src: string;
          updated_at?: Date;
        };
        Update: {
          created_at?: Date;
          id?: string;
          profile_id?: string;
          src?: string;
          updated_at?: Date;
        };
        Relationships: [
          {
            foreignKeyName: "photos_profile_id_fkey";
            columns: ["profile_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "photos_profile_id_fkey";
            columns: ["profile_id"];
            isOneToOne: false;
            referencedRelation: "random_profiles";
            referencedColumns: ["id"];
          },
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
          verified: boolean;
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
          verified?: boolean;
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
          verified?: boolean;
        };
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey";
            columns: ["id"];
            isOneToOne: true;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
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
            foreignKeyName: "prompt_likes_likee_fkey";
            columns: ["likee"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "prompt_likes_likee_fkey";
            columns: ["likee"];
            isOneToOne: false;
            referencedRelation: "random_profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "prompt_likes_liker_fkey";
            columns: ["liker"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "prompt_likes_liker_fkey";
            columns: ["liker"];
            isOneToOne: false;
            referencedRelation: "random_profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "prompt_likes_prompt_fkey";
            columns: ["prompt"];
            isOneToOne: false;
            referencedRelation: "prompts";
            referencedColumns: ["id"];
          },
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
            foreignKeyName: "prompts_profile_id_fkey";
            columns: ["profile_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "prompts_profile_id_fkey";
            columns: ["profile_id"];
            isOneToOne: false;
            referencedRelation: "random_profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      removed_profiles: {
        Row: {
          id: string;
          object: string;
          subject: string;
        };
        Insert: {
          id?: string;
          object: string;
          subject: string;
        };
        Update: {
          id?: string;
          object?: string;
          subject?: string;
        };
        Relationships: [
          {
            foreignKeyName: "removed_profiles_object_fkey";
            columns: ["object"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "removed_profiles_object_fkey";
            columns: ["object"];
            isOneToOne: false;
            referencedRelation: "random_profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "removed_profiles_subject_fkey";
            columns: ["subject"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "removed_profiles_subject_fkey";
            columns: ["subject"];
            isOneToOne: false;
            referencedRelation: "random_profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      skipped_profiles: {
        Row: {
          created_at: string;
          id: string;
          object: string;
          subject: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          object: string;
          subject: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          object?: string;
          subject?: string;
        };
        Relationships: [
          {
            foreignKeyName: "skipped_profiles_object_fkey";
            columns: ["object"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "skipped_profiles_object_fkey";
            columns: ["object"];
            isOneToOne: false;
            referencedRelation: "random_profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "skipped_profiles_subject_fkey";
            columns: ["subject"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "skipped_profiles_subject_fkey";
            columns: ["subject"];
            isOneToOne: false;
            referencedRelation: "random_profiles";
            referencedColumns: ["id"];
          },
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
            foreignKeyName: "subscriptions_profile_id_fkey";
            columns: ["profile_id"];
            isOneToOne: true;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "subscriptions_profile_id_fkey";
            columns: ["profile_id"];
            isOneToOne: true;
            referencedRelation: "random_profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      verification_selfies: {
        Row: {
          created_at: string;
          id: number;
          profile_id: string;
        };
        Insert: {
          created_at?: string;
          id?: number;
          profile_id: string;
        };
        Update: {
          created_at?: string;
          id?: number;
          profile_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "verification_selfies_profile_id_fkey";
            columns: ["profile_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "verification_selfies_profile_id_fkey";
            columns: ["profile_id"];
            isOneToOne: false;
            referencedRelation: "random_profiles";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Views: {
      random_profiles: {
        Row: {
          age: number | null;
          coordinates: Json | null;
          created_at: string | null;
          date_of_birth: Date | null;
          denomination: string | null;
          email: string | null;
          first_name: string | null;
          gender: string | null;
          id: string | null;
          location: unknown | null;
          onboarded: boolean | null;
          toponym: string | null;
          verified: boolean | null;
        };
        Insert: {
          age?: number | null;
          coordinates?: Json | null;
          created_at?: string | null;
          date_of_birth?: Date | null;
          denomination?: string | null;
          email?: string | null;
          first_name?: string | null;
          gender?: string | null;
          id?: string | null;
          location?: unknown | null;
          onboarded?: boolean | null;
          toponym?: string | null;
          verified?: boolean | null;
        };
        Update: {
          age?: number | null;
          coordinates?: Json | null;
          created_at?: string | null;
          date_of_birth?: Date | null;
          denomination?: string | null;
          email?: string | null;
          first_name?: string | null;
          gender?: string | null;
          id?: string | null;
          location?: unknown | null;
          onboarded?: boolean | null;
          toponym?: string | null;
          verified?: boolean | null;
        };
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey";
            columns: ["id"];
            isOneToOne: true;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
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
          owner_id: string | null;
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
          owner_id?: string | null;
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
          owner_id?: string | null;
          public?: boolean | null;
          updated_at?: string | null;
        };
        Relationships: [];
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
          owner_id: string | null;
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
          owner_id?: string | null;
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
          owner_id?: string | null;
          path_tokens?: string[] | null;
          updated_at?: string | null;
          version?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "objects_bucketId_fkey";
            columns: ["bucket_id"];
            isOneToOne: false;
            referencedRelation: "buckets";
            referencedColumns: ["id"];
          },
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
        Returns: string[];
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
};

type PublicSchema = Database[Extract<keyof Database, "public">];

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
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
      PublicSchema["Views"])
  ? (PublicSchema["Tables"] &
      PublicSchema["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R;
    }
    ? R
    : never
  : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
  ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I;
    }
    ? I
    : never
  : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
  ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U;
    }
    ? U
    : never
  : never;

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
  : never;
