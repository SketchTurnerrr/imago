import { createServerClient } from '@/lib/supabase-server';
import { ProfilePage } from './profile';
import { redirect } from 'next/navigation';

export default async function Page() {
  const supabase = createServerClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const { data } = await supabase
    .from('profiles')
    .select('*, photos(*)')
    .eq('id', session?.user.id)
    .single();
  if (!session) {
    redirect('/login');
  }

  return <ProfilePage data={data} />;
}
