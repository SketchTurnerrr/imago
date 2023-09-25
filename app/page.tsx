import { Discover } from '@/components/discover';
import { Button } from '@/components/ui/button';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import Image from 'next/image';
import { redirect } from 'next/navigation';

export default async function Home() {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const { data: user } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', session?.user.id)
    .single();

  const gender = user?.gender === 'male' ? 'female' : 'male';
  console.log('gender :', gender);
  const { data: profiles } = await supabase
    .from('profiles')
    .select('*')
    .eq('gender', gender);

  console.log(' prof from server :', profiles);

  // const router = useRouter()

  const index = Math.floor(Math.random() * profiles?.length!);

  if (user && !user.onboarded) {
    redirect('/onboarding');
  }
  if (!session) {
    redirect('/login');
  }

  return <Discover profile={profiles!![index]} />;
}
