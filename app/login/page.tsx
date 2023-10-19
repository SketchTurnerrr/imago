import { createServerClient } from '@/lib/supabase-server';
import { SignIn } from './login';

export default async function LoginPage() {
  const supabase = createServerClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  return <SignIn session={session} />;
}
