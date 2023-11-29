import { createServerClient } from "@/lib/supabase-server";
import Location from "./location";

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

  return <Location user={session?.user} onboarded={data?.onboarded} />;
}
