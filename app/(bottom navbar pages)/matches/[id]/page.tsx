import { createClient } from "@/lib/supabase/server";
import { Conversation } from "./conversation";
import { redirect } from "next/navigation";
import { IMessage, IParticipantsName } from "@/types";

export default async function ConversationPage({
  params,
}: {
  params: { id: string };
}) {
  const supabase = createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();
  const { data: messages, error } = await supabase
    .from("messages")
    .select(
      "*, conversation_id(participant1(id,first_name), participant2(id,first_name)),sender_id(id, first_name,photos(src))",
    )
    .eq("conversation_id", params.id)
    .order("created_at")
    .returns<IMessage[]>();

  const { data } = await supabase
    .from("conversations")
    .select(
      "id, participant1(id,first_name), participant2(id,first_name), last_read_message_id",
    )
    .eq("id", params.id)
    .returns<IParticipantsName>()
    .single();
  // console.log('participant2 :', data?.participant2);

  if (!session) {
    redirect("/login");
  }

  if (!data) {
    redirect("/matches");
  }

  return (
    <Conversation
      conversationId={params.id}
      messages={messages ?? []}
      userId={session.user.id}
      participants={data}
    />
  );
}
