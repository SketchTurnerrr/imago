import { createClient } from "@/lib/supabase/server";

export default async function SkippedProfilesPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  return null;
}
