import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { Account } from "./account";

export default async function AccountPage() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return <Account />;
}
