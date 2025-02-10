import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Profile } from "@/components/random-profile-feed";

export default async function DiscoverPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/sign-in");
  }

  // await new Promise((resolve) => setTimeout(resolve, 4000));

  const { data: currentUser } = await supabase
    .from("profiles")
    .select("gender, onboarded, id")
    .eq("id", user.id)
    .single();

  // const { data: filters } = await supabase
  //   .from("filters")
  //   .select("");
  // console.log("filters :", filters);

  const gender =
    currentUser && currentUser.gender === "male" ? "female" : "male";

  const { data: filters, error: filterError } = await supabase
    .from("filters")
    .select("age, denomination")
    .eq("profile_id", user.id)
    .single();

  console.log("filters :", filters);
  const { data: sub } = await supabase
    .from("subscriptions")
    .select("profile_id")
    .eq("profile_id", user.id)
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
    <Profile
      currentUserId={user.id}
      type="discover"
      gender={gender}
      subId={sub && sub.profile_id}
    />
  );
}
