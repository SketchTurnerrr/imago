import { Navbar } from "@/components/navbar/navbar";
import { createServerClient } from "@/lib/supabase-server";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { IConversationReadStatus } from "../global";

export const metadata: Metadata = {
  title: "Discover",
  description: "Profiles",
};

export default async function DiscoverLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createServerClient();

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

  const { data: status, error } = await supabase
    .from("conversations")
    .select("party1_read, party2_read, participant1(id), participant2(id)")
    .returns<IConversationReadStatus>()
    .single();

  return (
    <>
      <Navbar photo={data?.photos} status={status!} userId={session.user.id} />

      {children}
    </>
  );
}
