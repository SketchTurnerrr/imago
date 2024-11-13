import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { Conversation } from "./conversation";
import { MessagesType } from "@/types";

export default async function ConversationPage(props: {
  params: Promise<{ id: string }>;
}) {
  const params = await props.params;
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: messages, error } = await supabase
    .from("messages")
    .select(
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
        match_id,
        party_1:profiles!conversations_party_1_fkey(id, name),
        party_2:profiles!conversations_party_2_fkey(id, name)
      )
    `,
    )
    .eq("conversation_id", params.id)
    .returns<MessagesType>();

  if (error) {
    console.error("Error fetching messages:", error);
    redirect("/matches");
  }

  return (
    <Conversation
      conversationId={params.id}
      messages={messages ?? []}
      userId={user.id}
    />
  );
}
