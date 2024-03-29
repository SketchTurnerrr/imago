import { createClient } from "@/lib/supabase/server";
import OnboardingPrompts from "./onboarding-prompts";
import { redirect } from "next/navigation";

export default async function Page() {
  const supabase = createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) redirect("/login");

  const { data } = await supabase
    .from("profiles")
    .select("onboarded, prompts(*)")
    .eq("id", session.user.id)
    .single();

  if (!data) return;

  return <OnboardingPrompts user={session.user} data={data} />;
}
