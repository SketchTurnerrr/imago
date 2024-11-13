import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { IConversation } from "@/types";
import { Matches } from "./matches";

export default async function MatchesPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data, error } = await supabase
    .from("conversations")
    .select(
      "*, party_1:profiles!conversations_party_1_fkey(id, photos(url), name), party_2:profiles!conversations_party_2_fkey(id, photos(url), name), last_message:messages!conversations_last_message_fkey(content, created_at)",
    );
  console.log("error :", error);

  return <Matches conversations={data ?? []} userId={user.id} />;
}
