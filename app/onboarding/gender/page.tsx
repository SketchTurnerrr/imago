import { createServerClient } from '@/lib/supabase-server';
import { Gender } from './gender';

export default async function Page() {
  const supabase = createServerClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  return <Gender user={session?.user} />;
}
