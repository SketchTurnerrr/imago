import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { Account } from "./account";

export default async function AccountPage() {
  const supabase = createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/login");
  }

  return <Account />;
}
