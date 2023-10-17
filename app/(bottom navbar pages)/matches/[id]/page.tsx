import { createServerClient } from '@/lib/supabase-server';
import { Conversation } from './conversation';
import { redirect } from 'next/navigation';

export default async function ConversationPage({
  params,
}: {
  params: { id: string };
}) {
  const supabase = createServerClient();

  // const cookieStore = cookies();
  // console.log('cookieStore :', cookieStore.get('userAgent'));

  const {
    data: { session },
  } = await supabase.auth.getSession();
  const { data: messages, error } = await supabase
    .from('messages')
    .select(
      '*, conversation_id(participant1(id,first_name), participant2(id,first_name)),sender_id(id, first_name,photos(src))'
    )
    .order('created_at')
    .returns<IMessages[]>();

  const { data } = await supabase
    .from('conversations')
    .select(
      'id,party1_read,party2_read,participant1(id,first_name), participant2(id,first_name)'
    )
    .eq('id', params.id)
    .returns<IParticipantsNames>()
    .single();
  // console.log('participant2 :', data?.participant2);

  if (!session) {
    redirect('/login');
  }

  if (!data) {
    redirect('/matches');
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
