import { createServerClient } from "@/lib/supabase-server";
import { redirect } from "next/navigation";
import { Account } from "./account";

export default async function AccountPage() {
  const supabase = createServerClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/login");
  }

  return <Account userId={session.user.id} />;
}
