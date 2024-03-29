import { createClient } from "@/lib/supabase/server";
import { Tables } from "@/types/database.types";
import { QueryData } from "@supabase/supabase-js";

export type Profile = Tables<"profiles">;
export type Prompt = Tables<"prompts">;
export type Photo = Tables<"photos">;
export type PhotoLike = Tables<"photo_likes">;
export type PromptLike = Tables<"prompt_likes">;
export type Conversation = Tables<"conversations">;
export type Message = Tables<"messages">;
export type Subscription = Tables<"subscriptions">;
export type SkippedProfile = Tables<"skipped_profiles">;

export interface FullProfile extends Profile {
  prompts: Prompt[];
  photos: Photo[];
}

const supabase = createClient();

const fullProfileQuery = supabase
  .from("profiles")
  .select("*, prompts(*), photos(*)");

export type FullProf = QueryData<typeof fullProfileQuery>;

export interface ProfileWithPhotos extends Profile {
  photos: Photo[];
}

export interface IPhotoLike extends Omit<PhotoLike, "liker" | "photo"> {
  photo: { src: string; id: string };
  liker: {
    first_name: string;
    gender: string;
    id: string;
    photos: Photo[];
  };
}
export interface IPromptLike extends Omit<PromptLike, "prompt" | "liker"> {
  prompt: Prompt;
  liker: {
    first_name: string;
    gender: string;
    id: string;
    photos: Photo[];
  };
}

export interface IConversations
  extends Omit<Conversation, "last_message" | "participant1" | "participant2"> {
  last_message: Message;
  participant1: {
    id: string;
    first_name: string;
    photos: Photo[];
  };
  participant2: {
    id: string;
    first_name: string;
    photos: Photo[];
  };
}

export interface IMessages
  extends Omit<Message, "sender_id" | "conversation_id"> {
  sender_id: {
    id: string;
    first_name: string;
    photos: {
      src: string;
    }[];
  };
  conversation_id: {
    id: string;
    participant1: {
      id: string;
      first_name: string;
    };
    participant2: {
      id: string;
      first_name: string;
    };
  };
}
export interface IParticipantsNames
  extends Omit<Conversation, "participant1" | "participant2"> {
  participant1: {
    id: string;
    first_name: string;
  };
  participant2: {
    id: string;
    first_name: string;
  };
}

export interface IConversationReadStatus
  extends Omit<Conversation, "has_unread_messages" | "last_message"> {
  has_unread_messages: boolean;
  last_message: {
    sender_id: string;
  };
}
