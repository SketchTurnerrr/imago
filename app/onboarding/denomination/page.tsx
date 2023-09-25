import { createServerClient } from '@/lib/supabase-server';
import { Denomination } from './denomination';

export default async function Page() {
  const supabase = createServerClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  return <Denomination user={session?.user} />;
}
