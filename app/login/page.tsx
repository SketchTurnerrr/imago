import { createClient } from "@/lib/supabase/server";
import { SignIn } from "./login";

export default async function LoginPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return <SignIn user={user} />;
}
