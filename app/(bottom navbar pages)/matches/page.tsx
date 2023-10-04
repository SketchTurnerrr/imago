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

  return <Matches />;
}
