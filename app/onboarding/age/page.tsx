import { createClient } from "@/lib/supabase/server";

import Age from "./age";

export default async function Page() {
  const supabase = createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const { data, error } = await supabase
    .from("profiles")
    .select("onboarded")
    .eq("id", session?.user.id || "")
    .single();

  return <Age user={session?.user} onboarded={data?.onboarded} />;
}
