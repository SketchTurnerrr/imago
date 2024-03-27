import { createClient } from "@/lib/supabase/server";
import { SignIn } from "./login";

export default async function LoginPage() {
  const supabase = createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  return <SignIn session={session} />;
}
