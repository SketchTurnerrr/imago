import { createServerClient } from "@/lib/supabase-server";
import { EditProfilePage } from "./edit-profile";
import { redirect } from "next/navigation";

export default async function Page() {
  const supabase = createServerClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) redirect("/login");

  const { data, error } = await supabase
    .from("profiles")
    .select("*, prompts(*), photos(*)")
    .order("updated_at", { foreignTable: "photos", ascending: false })
    .eq("id", session.user.id)
    .returns<FullProfile>()
    .single();

  // console.log("error :", error);
  if (!data) return;

  return <EditProfilePage user={session.user} data={data} />;
}
