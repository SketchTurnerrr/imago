import { Navbar } from '@/components/navbar/navbar';
import { createServerClient } from '@/lib/supabase-server';
import type { Metadata } from 'next';
import { redirect } from 'next/navigation';

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

  console.log('session :', session.user.id);
  return (
    <section>
      <Navbar userID={session?.user.id} />
      {children}
    </section>
  );
}
