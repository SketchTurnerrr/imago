import { createServerClient } from '@/lib/supabase-server';
import Photos from './photos';

export default async function Page() {
  const supabase = createServerClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  return <Photos user={session?.user} />;
}
