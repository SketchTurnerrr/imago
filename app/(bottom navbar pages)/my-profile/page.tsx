import { createClient } from "@/lib/supabase/server";
import { ProfilePage } from "./myProfile";
import { redirect } from "next/navigation";

export default async function Page() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data, error } = await supabase
    .from("profiles")
    .select("*, photos(*)")
    .eq("id", user?.id)
    .single();

  console.log("error :", error);
  console.log("data :", data);
  if (!data) {
    redirect("/");
  }

  return <ProfilePage profile={data} />;
}
