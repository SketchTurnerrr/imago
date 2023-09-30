import { createServerClient } from '@/lib/supabase-server';
import { Likes } from './likes';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export default async function LikesPage() {
  const supabase = createServerComponentClient<Database>({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    return <div>a</div>;
  }
  const { data, error } = await supabase
    .from('likes')
    .select('*, prompts(*), liker("first_name", "id", "gender", photos(*)) ')
    .eq('likee', session.user.id);

  console.log('error :', error);
  console.log('likes serv :', data);

  return <Likes data={data || []} />;
}
