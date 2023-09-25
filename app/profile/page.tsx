import { createServerClient } from '@/lib/supabase-server';
import { ProfilePage } from './profile';

export default async function Page() {
  const supabase = createServerClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  // if (session) {
  const { data } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', session?.user.id)
    .single();
  // }

  // console.log('profiles :', data);
  return <ProfilePage user={session?.user} data={data} />;
}
