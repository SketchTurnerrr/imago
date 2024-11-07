import { createClient } from "@/lib/supabase/server";
import { Likes } from "./likes";

export default async function LikesPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return <div>a</div>;
  }
  const { data: likes, error } = await supabase
    .from("likes")
    .select(
      "*, photo:photos(id, url), prompt:prompts(*), sender:profiles!likes_receiver_fkey(id, name,gender, photos(url))",
    )
    .eq("receiver", user.id);

  console.log("error :", error);

  return <Likes likes={likes ?? []} />;
}
