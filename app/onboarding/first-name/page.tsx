import { createServerClient } from '@/lib/supabase-server';
import FirstName from './page-form';

export default async function Page() {
  const supabase = createServerClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  return <FirstName user={session?.user} />;
}
