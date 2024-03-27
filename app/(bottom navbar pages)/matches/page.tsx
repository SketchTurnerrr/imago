import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Matches } from "./matches";
import LoadingConversations from "./loading";
import { Suspense } from "react";

export default async function MatchesPage() {
  const supabase = createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/login");
  }

  const { data, error } = await supabase
    .from("conversations")
    .select(
      "*, participant1(id, photos(src), first_name), participant2(id, photos(src), first_name), last_message(content,sender_id)",
    )
    .returns<IConversations[]>();

  return (
    <Suspense fallback={<LoadingConversations />}>
      <Matches conversations={data ?? []} userId={session.user.id} />
    </Suspense>
  );
}
