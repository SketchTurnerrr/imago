import { createServerClient } from '@/lib/supabase-server';
import { EditProfilePage } from './edit-profile';
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
    .returns<ProfileWithPrompts>()
    .single();

  if (!session) redirect('/');

  console.log('profiles :', data);
  return (
    <EditProfilePage user={session.user} data={data!} onboarding={false} />
  );
}
