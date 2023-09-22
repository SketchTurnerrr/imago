import { createServerClient } from '@/lib/supabase-server';

import Age from './age';

export default async function Page() {
  const supabase = createServerClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  return <Age user={session?.user} />;
}
