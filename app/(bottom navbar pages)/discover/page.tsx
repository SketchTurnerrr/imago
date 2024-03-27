import { redirect } from "next/navigation";
import { Suspense } from "react";
import Loading from "./loading";
import { Profile } from "@/components/profile";
import { createClient } from "@/lib/supabase/server";

type authedProfileType = {
  gender: string;
  skipped_profiles: Array<string>;
  onboarded: boolean;
};

type searchParamsProps = {
  params?: {
    num?: string;
  };
  searchParams?: {
    denomination?: string[];
  };
};

export default async function DiscoverPage({
  searchParams,
}: searchParamsProps) {
  // console.log("searchParams :", searchParams);
  const supabase = createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/login");
  }

  // await new Promise((resolve) => setTimeout(resolve, 4000));

  const { data: currentUser } = await supabase
    .from("profiles")
    .select("gender, onboarded")
    .eq("id", session.user.id)
    .single();

  // const { data: filters } = await supabase
  //   .from("filters")
  //   .select("");
  // console.log("filters :", filters);

  const gender =
    currentUser && currentUser.gender === "male" ? "female" : "male";

  const { data: filter, error: filterError } = await supabase
    .from("filters")
    .select("age, denomination")
    .eq("profile_id", session.user.id)
    .single();

  const { data: sub } = await supabase
    .from("subscriptions")
    .select("profile_id")
    .eq("profile_id", session.user.id)
    .single();
  // console.log("filter :", filter);
  // console.log("filterError :", filterError);

  // .not('id', 'in', `(${skippedProfiles.join(',')})`)
  // console.log("filter[0].age[0] :", filter && filter.age[0]);
  // console.log("filter[0].age[0] :", filter && filter.age[1]);
  // const { data: profiles, error } = await supabase
  // .from("random_profiles")
  // .select("*, prompts(*), photos(src,id)")
  // .order("updated_at", { foreignTable: "photos", ascending: false })
  // .eq("gender", gender)
  // .gte("age", filter && filter.age[0])
  // .lte("age", filter && filter.age[1])
  // .in("denomination", ["Євангелізм"])
  // .neq("onboarded", false)
  // .returns<FullProfile[]>()
  // .limit(10);
  // .single();

  // console.log("error :", error);
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

  if (!currentUser?.onboarded) {
    redirect("/onboarding");
  }

  // if (!profiles) return;

  return (
    <Suspense fallback={<Loading />}>
      <Profile
        likeData={null}
        userId={session.user.id}
        gender={gender}
        type="discover"
        sub={sub?.profile_id}
      />
    </Suspense>
  );
}
