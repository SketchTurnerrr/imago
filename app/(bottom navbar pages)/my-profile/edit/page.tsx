import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import EditProfilePage from "./edit-profile";

export default async function Page() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/sign-in");

  const { data, error } = await supabase
    .from("profiles")
    .select("*, prompts(*), photos(*)")
    .eq("id", user.id)
    .single();

  return <EditProfilePage userId={user.id} />;
}
