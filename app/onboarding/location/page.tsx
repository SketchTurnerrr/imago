import { createServerClient } from '@/lib/supabase-server';
import Location from './location';

export default async function Page() {
  const supabase = createServerClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  return <Location user={session?.user} />;
}
