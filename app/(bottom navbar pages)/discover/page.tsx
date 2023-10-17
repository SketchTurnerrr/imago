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
    .select('gender, skipped_profiles, onboarded')
    .eq('id', session.user.id)
    .single();

  const gender = authedProfile?.gender === 'male' ? 'female' : 'male';

  const skippedProfiles = [
    ...(authedProfile?.skipped_profiles || []),
    session.user.id,
  ];

  console.log('authedProfile :', authedProfile);
  // console.log('skippedProfiles :', skippedProfiles);

  const { data: profiles, error } = await supabase
    .from('random_profiles')
    .select('*, prompts(*), photos(*)')

    .not('id', 'in', `(${skippedProfiles.join(',')})`)
    .eq('gender', gender)
    .returns<FullProfile>()
    .limit(1)
    .single();

  console.log('error :', error);

  if (authedProfile && !authedProfile.onboarded) {
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
