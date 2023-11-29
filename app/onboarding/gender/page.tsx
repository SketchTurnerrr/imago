import { createServerClient } from "@/lib/supabase-server";
import { Gender } from "./gender";

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

  return <Gender user={session?.user} onboarded={data?.onboarded} />;
}
