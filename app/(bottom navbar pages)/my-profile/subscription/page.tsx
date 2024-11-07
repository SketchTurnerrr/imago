import { createClient } from "@/lib/supabase/server";
import { Subscription } from "./subscription";
import { redirect } from "next/navigation";

export default async function SubscriptionPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user || user) {
    redirect("/my-profile");
  }

  // const { data: sub } = await supabase
  //   .from("subscriptions")
  //   .select()
  //   .eq("profile_id", session.user.id)
  //   .single();

  // return <Subscription userId={session.user.id} sub={sub} />;
}
