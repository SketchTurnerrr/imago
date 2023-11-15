import { Profile } from "@/components/profile";
import { createServerClient } from "@/lib/supabase-server";

export default async function SkippedProfilesPage({
  params,
}: {
  params: { id: string };
}) {
  console.log("params.id :", params.id);
  const supabase = createServerClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    return null;
  }

  return (
    <Profile
      type="single"
      likeData={null}
      profileId={params.id}
      userId={session?.user.id}
    />
  );
}