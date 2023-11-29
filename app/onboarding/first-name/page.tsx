import { createServerClient } from "@/lib/supabase-server";
import FirstName from "./page-form";

export default async function Page() {
  const supabase = createServerClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const { data, error } = await supabase
    .from("profiles")
    .select("onboarded")
    .eq("id", session?.user.id || "")
    .single();

  return <FirstName user={session?.user} onboarded={data?.onboarded} />;
}
