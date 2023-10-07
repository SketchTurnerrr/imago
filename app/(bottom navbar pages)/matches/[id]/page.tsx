import { createServerClient } from '@/lib/supabase-server';
import { Conversation } from './conversation';

export default async function ConversationPage({
  params,
}: {
  params: { id: string };
}) {
  const supabase = createServerClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();
  const { data: messages, error } = await supabase
    .from('messages')
    .select(
      '*, conversation_id(conversation_pid(first_name, id, photos(src))),sender_id(id,first_name,photos(src))'
    )
    .returns<IMessages[]>();

  if (!session) {
    return;
  }

  return (
    <Conversation
      conversationId={params.id}
      messages={messages ?? []}
      userId={session.user.id}
    />
  );
}
