import { redirect } from 'next/navigation';
import { Discover } from './discover';
import { createServerClient } from '@/lib/supabase-server';

export default async function DiscoverPage() {
  const supabase = createServerClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const { data: authedProfile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', session?.user.id)
    .single();

  const gender = authedProfile?.gender === 'male' ? 'female' : 'male';

  const skippedProfiles: string[] = [
    ...(authedProfile.skipped_profiles || ''),
    session?.user.id,
  ];

  console.log('skippedProfiles :', skippedProfiles);
  console.log('skipped :', authedProfile.first_name);

  const { data: profiles, error } = await supabase
    .from('profiles')
    .select('*, prompts(*)')
    .not('id', 'in', `(${skippedProfiles.join(',')})`)
    .eq('gender', gender)
    .returns<ProfileWithPrompts[]>();

  console.log('error :', error);
  // console.log('profiles :', profiles);
  console.log('profiles serv:', profiles?.length);

  const index = Math.floor(Math.random() * profiles?.length!) || 0;

  if (authedProfile && !authedProfile.onboarded) {
    redirect('/onboarding');
  }
  if (!session) {
    redirect('/login');
  }

  return (
    <Discover
      profile={profiles!![index]}
      userID={session.user.id}
      authedProfile={authedProfile}
    />
  );
}
