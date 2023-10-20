import { createServerClient } from '@/lib/supabase-server';
import { Subscription } from './subscription';
import { redirect } from 'next/navigation';

export default async function SubscriptionPage({
  profile,
}: {
  profile: string;
}) {
  const supabase = createServerClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect('/login');
  }

  console.log('session :', session);

  return <Subscription userId={session.user.id} />;
}
