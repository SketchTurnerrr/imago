import { createClient } from "@/lib/supabase/server";

export default async function SkippedProfilesPage({
  params,
}: {
  params: { id: string };
}) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  return null;
}
