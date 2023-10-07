import { redirect } from 'next/navigation';
import { createServerClient } from '@/lib/supabase-server';
import { Matches } from './matches';

type authedProfileType = {
  gender: string;
  skipped_profiles: Array<string>;
  onboarded: boolean;
};

export default async function MatchesPage() {
  const supabase = createServerClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect('/login');
  }

  const { data: convos, error } = await supabase
    .from('conversations')
    .select(
      '*, last_message(content), conversation_pid(id, photos(src), first_name)'
    )
    .returns<IConversations[]>();

  // console.log('convos :', convos);
  // console.log('convos error:', error);

  // console.log('parties :', parties);

  return <Matches conversations={convos ?? []} userId={session.user.id} />;
}
