import { createClient } from "@/lib/supabase/server";
import { ProfilePage } from "./myProfile";
import { redirect } from "next/navigation";

export default async function Page() {
  const supabase = createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/login");
  }

  const { data } = await supabase
    .from("profiles")
    .select("*, photos(*)")
    .order("updated_at", { foreignTable: "photos", ascending: false })
    .eq("id", session?.user.id)
    .single();

  // console.log('data :', data);
  if (!data) {
    redirect("/");
  }

  return <ProfilePage profile={data} />;
}
