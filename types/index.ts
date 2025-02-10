import { createClient } from "@/lib/supabase/server";
import { Tables } from "@/types/database.types";
import { QueryData } from "@supabase/supabase-js";
import { SupabaseClient } from "@supabase/supabase-js";

export type TypedSupabaseClient = SupabaseClient<Database>;

export type Profile = Tables<"profiles">;
export type Prompt = Tables<"prompts">;
export type Photo = Tables<"photos">;
export type Conversation = Tables<"conversations">;
export type Message = Tables<"messages">;
export type SubscriptionType = Tables<"subscriptions">;
export type SkippedProfile = Tables<"skipped_profiles">;

export interface FullProfile extends Profile {
  prompts: Prompt[];
  photos: Photo[];
}

const supabase = await createClient();

const fullProfileQuery = supabase
  .from("profiles")
  .select("*, prompts(*), photos(*)")
  .single();

export type FullProf = QueryData<typeof fullProfileQuery>;

const readonlyProfile = supabase
  .from("profiles")
  .select(
    "date_of_birth, denomination, first_name, toponym, verified, prompts(question, answer), photos(src)",
  )

  .single();

export type ReadOnlyProfileType = QueryData<typeof readonlyProfile>;

const likesQuery = supabase
  .from("likes")
  .select(
    "*, photo:photos(id, url), prompt:prompts(*), sender:profiles!likes_receiver_fkey(id,name,gender, photos(url))",
  );

export type LikesType = QueryData<typeof likesQuery>;

export interface ProfileWithPhotos extends Profile {
  photos: Photo[];
}

const conversationQuery = supabase.from("conversations").select(
  `
    *,
    party_1:profiles!conversations_party_1_fkey(id, name, photos(url)),
    party_2:profiles!conversations_party_2_fkey(id, name, photos(url)),
    last_message:messages!conversations_last_message_fkey(content, created_at)
    `,
);

export type ConversationType = QueryData<typeof conversationQuery>;

const matchesQuery = supabase
  .from("matches")
  .select(
    "id, initiator:profiles!matches_initiator_fkey(id, name, photos(url)), receiver:profiles!matches_receiver_fkey(id, name, photos(url)), comment, created_at",
  );

export type MatchesType = QueryData<typeof matchesQuery>;

const partiesQuery = supabase
  .from("conversations")
  .select(
    "*, party_1:profiles!conversations_party_1_fkey(id, name), party_2:profiles!conversations_party_2_fkey(id, name)",
  )
  .single();

export type PartiesType = QueryData<typeof partiesQuery>;

const messageQuery = supabase.from("messages").select(
  `
      id, 
      content, 
      created_at, 
      sender_id:profiles!messages_sender_id_fkey(
        id, 
        name, 
        photos(url)
      ), 
      conversation_id:conversations!messages_conversation_id_fkey(
        id,
        party_1:profiles!conversations_party_1_fkey(id, name),
        party_2:profiles!conversations_party_2_fkey(id, name)
      )
    `,
);

export type MessagesType = IMessage[];
interface IMessage {
  id: string;
  content: string;
  created_at: string;
  sender_id: {
    id: string;
    name: string;
    photos: { url: string }[];
  };
  conversation_id: {
    id: string;
    match_id: string;
    party_1: {
      id: string;
      name: string;
    };
    party_2: {
      id: string;
      name: string;
    };
  };
}

//  "id, content, created_at, sender_id:profiles!messages_sender_id_fkey(id, name, photos(url)), conversation_id:conversations!messages_conversation_id_fkey(id)";

// export type MessagesType = QueryData<typeof messageQuery>;

export interface IConversation
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

// export interface IMessage
//   extends Omit<Message, "sender_id" | "conversation_id"> {
//   sender_id: {
//     id: string;
//     first_name: string;
//     photos: {
//       src: string;
//     }[];
//   };
//   conversation_id: {
//     id: string;
//     participant1: {
//       id: string;
//       first_name: string;
//     };
//     participant2: {
//       id: string;
//       first_name: string;
//     };
//   };
// }
export interface IParticipantsName
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
