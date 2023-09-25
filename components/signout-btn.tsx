'use client';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Button } from './ui/button';

export async function SignOut() {
  const supabase = createClientComponentClient();
  const signout = async () => {
    await supabase.auth.signOut();
  };
  return <Button onClick={signout}>Sing out</Button>;
}
