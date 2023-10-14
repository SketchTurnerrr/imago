import { Navbar } from '@/components/navbar/navbar';
import { createServerClient } from '@/lib/supabase-server';
import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { IConversationReadStatus } from '../global';

export const metadata: Metadata = {
  title: 'Discover',
  description: 'Profiles',
};

export default async function DiscoverLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createServerClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) redirect('/login');

  const { data } = await supabase
    .from('profiles')
    .select('photos("src")')
    .eq('id', session?.user.id)
    .single();

  const { data: status, error } = await supabase
    .from('conversations')
    .select('party1_read, party2_read, participant1(id), participant2(id)')
    .returns<IConversationReadStatus>()
    .single();

  console.log('status :', status);

  // if (!data) {
  //   redirect('/login');
  // }

  console.log('session :', session.user.id);
  return (
    <section>
      <Navbar
        //@ts-ignore
        photo={data.photos}
        status={status!}
        userId={session.user.id}
      />
      {children}
    </section>
  );
}
