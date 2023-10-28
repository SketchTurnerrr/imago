import { createServerClient } from "@/lib/supabase-server";
import { ProfilePage } from "./profile";
import { redirect } from "next/navigation";

export default async function Page() {
  const supabase = createServerClient();

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
    .returns<ProfileWithPhotos>()
    .single();

  // console.log('data :', data);
  if (!data) {
    redirect("/");
  }

  return <ProfilePage profile={data} />;
}
