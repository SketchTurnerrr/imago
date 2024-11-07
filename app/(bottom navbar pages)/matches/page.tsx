import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Matches } from "./matches";
import { IConversation } from "@/types";

export default async function MatchesPage() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data, error } = await supabase
    .from("conversations")
    .select(
      "*, participant1(id, photos(src), first_name), participant2(id, photos(src), first_name), last_message(content,sender_id)",
    )
    .returns<IConversation[]>();

  return <Matches conversations={data ?? []} userId={user.id} />;
}
