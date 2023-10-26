import { redirect } from "next/navigation";
import { Profile } from "./profile";
import { createServerClient } from "@/lib/supabase-server";
import { Suspense } from "react";
import Loading from "./loading";

type authedProfileType = {
  gender: string;
  skipped_profiles: Array<string>;
  onboarded: boolean;
};

export default async function DiscoverPage() {
  const supabase = createServerClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/login");
  }

  // await new Promise((resolve) => setTimeout(resolve, 4000));

  const { data: authedProfile } = await supabase
    .from("profiles")
    .select("gender, onboarded")
    .eq("id", session.user.id)
    .single();

  const gender = authedProfile?.gender === "male" ? "female" : "male";

  // .not('id', 'in', `(${skippedProfiles.join(',')})`)

  const { data: profiles, error } = await supabase
    .from("random_profiles")
    .select("*, prompts(*), photos(src,id)")
    .order("updated_at", { foreignTable: "photos", ascending: false })
    .eq("gender", gender)
    .neq("onboarded", false)
    .returns<FullProfile[]>()
    .limit(10);
  // .single();

  console.log("error :", error);
  // console.log("profiles :", profiles);

  // const { data: profiles, error } = await supabase
  //   .from('random_profiles')
  //   .select('*, prompts(*), photos(*)')

  //   .eq('gender', gender)
  //   // .eq('toponym', 'Кривий Ріг')
  //   .eq('age', 31)
  //   .returns<FullProfile>()
  //   .single();

  // console.log('profiles :', profiles);
  // const { data, error, status, count } = await supabase
  //   .rpc('nearby_profiles', {
  //     long: 47.901406,
  //     lat: 33.385515,
  //   })
  //   .select('*');

  if (!authedProfile?.onboarded) {
    redirect("/onboarding");
  }

  if (!profiles) return;

  return (
    <Suspense fallback={<Loading />}>
      <Profile
        serverProfiles={profiles}
        userId={session.user.id}
        authedProfile={authedProfile as authedProfileType}
      />
    </Suspense>
  );
}
