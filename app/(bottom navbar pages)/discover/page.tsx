import { redirect } from 'next/navigation';
import { Profile } from './profile';
import { createServerClient } from '@/lib/supabase-server';

type authedProfileType = {
  gender: string;
  skipped_profiles: Array<string>;
  onboarded: boolean;
};

export default async function DiscoverPage() {
  const supabase = createServerClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect('/login');
  }

  const { data: authedProfile } = await supabase
    .from('profiles')
    .select('gender,  onboarded')
    .eq('id', session.user.id)
    .single();

  const gender = authedProfile?.gender === 'male' ? 'female' : 'male';

  // .not('id', 'in', `(${skippedProfiles.join(',')})`)

  const { data: profiles, error } = await supabase
    .from('random_profiles')
    .select('*, prompts(*), photos(*)')

    .eq('gender', gender)
    .returns<FullProfile>()
    .limit(1)
    .single();

  // console.log('profiles :', profiles);

  // const { data: profiles, error } = await supabase
  //   .from('random_profiles')
  //   .select('*, prompts(*), photos(*)')

  //   .eq('gender', gender)
  //   // .eq('toponym', 'Кривий Ріг')
  //   .eq('age', 31)
  //   .returns<FullProfile>()
  //   .single();

  // console.log('profiles :', profiles);
  // const { data, error, status, count } = await supabase
  //   .rpc('nearby_profiles', {
  //     long: 47.901406,
  //     lat: 33.385515,
  //   })
  //   .select('*');

  if (!authedProfile?.onboarded) {
    redirect('/onboarding');
  }

  if (!profiles) return;

  return (
    <Profile
      profile={profiles}
      userId={session.user.id}
      authedProfile={authedProfile as authedProfileType}
    />
  );
}
