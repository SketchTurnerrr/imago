import { redirect } from 'next/navigation';
import { createServerClient } from '@/lib/supabase-server';
import { Matches } from './matches';

export default async function MatchesPage() {
  const supabase = createServerClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect('/login');
  }

  const { data, error } = await supabase
    .from('conversations')
    .select(
      '*, participant1(id, photos(src), first_name), participant2(id, photos(src), first_name), last_message(content)'
    )
    .returns<IConversations[]>();

  return <Matches conversations={data ?? []} userId={session.user.id} />;
}
