import { createServerClient } from '@/lib/supabase-server';
import OnboardingPrompts from './onboarding-prompts';
import { redirect } from 'next/navigation';

export default async function Page() {
  const supabase = createServerClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const { data } = await supabase
    .from('profiles')
    .select('*, prompts(*)')
    .eq('id', session?.user.id)
    .returns<FullProfile>()
    .single();

  if (!session) redirect('/login');

  return <OnboardingPrompts user={session.user} data={data!} />;
}
