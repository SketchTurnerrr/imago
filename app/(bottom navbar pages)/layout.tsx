import { Navbar } from "@/components/navbar/navbar";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Tables, Enums } from "@/types/database.types";
import { QueryData } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/server";
import { IConversationReadStatus } from "@/types";

export const metadata: Metadata = {
  title: "Discover",
  description: "Profiles",
};

export default async function DiscoverLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) redirect("/login");

  const { data } = await supabase
    .from("profiles")
    .select('photos("src"), onboarded')
    .order("updated_at", { foreignTable: "photos", ascending: false })
    .eq("id", session?.user.id)
    .single();

  if (data?.onboarded === false) {
    redirect("/onboarding");
  }

  const { data: status } = await supabase
    .from("conversations")
    .select("has_unread_messages, last_message(sender_id, content)")
    .returns<IConversationReadStatus[]>();

  return (
    <>
      <Navbar photo={data?.photos} status={status!} userId={session.user.id} />

      {children}
    </>
  );
}
