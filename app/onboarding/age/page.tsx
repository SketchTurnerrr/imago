import { createClient } from "@/lib/supabase/server";

import { Age } from "./age";

export default async function Page() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return <Age userId={user?.id || ""} />;
}
