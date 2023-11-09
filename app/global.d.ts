import { Database as DB } from "@/types/database.types";

declare global {
  type Database = DB;

  type ProfileType = DB["public"]["Tables"]["profiles"]["Row"];
  type PromptsType = DB["public"]["Tables"]["prompts"]["Row"];
  type PhotosType = DB["public"]["Tables"]["photos"]["Row"];
  type PhotoLikesType = DB["public"]["Tables"]["photo_likes"]["Row"];
  type PromptLikesType = DB["public"]["Tables"]["prompt_likes"]["Row"];
  type ConversationsType = DB["public"]["Tables"]["conversations"]["Row"];
  type MessagesType = DB["public"]["Tables"]["messages"]["Row"];
  type SubscriptionType = DB["public"]["Tables"]["subscriptions"]["Row"];
  type SkippedProfilesType = DB["public"]["Tables"]["skipped_profiles"]["Row"];

  interface FullProfile extends ProfileType {
    prompts: PromptsType[];
    photos: PhotosType[];
  }
  interface ProfileWithPhotos extends ProfileType {
    photos: PhotosType[];
  }

  interface PhotoLike extends PhotoLikesType {
    photo: { src: string; id: string };
    liker: {
      first_name: string;
      gender: string;
      id: string;
      photos: PhotosType[];
    };
  }
  interface PromptLike extends PromptLikesType {
    prompt: PromptsType;
    liker: {
      first_name: string;
      gender: string;
      id: string;
      photos: PhotosType[];
    };
  }

  interface IConversations extends ConversationsType {
    last_message: MessagesType;
    participant1: {
      id: string;
      first_name: string;
      photos: PhotosType[];
    };
    participant2: {
      id: string;
      first_name: string;
      photos: PhotosType[];
    };
  }

  interface IMessages extends MessagesType {
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
  interface IParticipantsNames extends ConversationsType {
    participant1: {
      id: string;
      first_name: string;
    };
    participant2: {
      id: string;
      first_name: string;
    };
  }
}

interface IConversationReadStatus {
  participant1: string;
  participant2: string;
  party1_read: boolean;
  party2_read: boolean;
}
