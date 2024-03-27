import { createClient } from "@/lib/supabase/server";
import Photos from "./photos";
import { redirect } from "next/navigation";

export default async function Page() {
  const supabase = createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/login");
  }

  const { data, error } = await supabase
    .from("profiles")
    .select("onboarded, photos(*)")
    .order("updated_at", { foreignTable: "photos", ascending: false })
    .eq("id", session.user.id)
    .single();

  console.log("error :", error);

  return (
    <Photos
      user={session?.user}
      photos={data?.photos || []}
      onboarded={data?.onboarded}
    />
  );
}
