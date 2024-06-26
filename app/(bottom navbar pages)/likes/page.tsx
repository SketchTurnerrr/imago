import { createClient } from "@/lib/supabase/server";
import { Likes } from "./likes";
import { IPhotoLike, IPromptLike } from "@/types";

export default async function LikesPage() {
  const supabase = createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    return <div>a</div>;
  }
  const { data: photoLikes, error } = await supabase
    .from("photo_likes")
    .select("*, photo(src, id), liker(first_name, id, gender, photos(src)) ")
    .eq("likee", session.user.id)
    .returns<IPhotoLike[]>();

  // console.log('error :', error);
  const { data: promptLikes } = await supabase
    .from("prompt_likes")
    .select("*, prompt(*), liker(first_name, id, gender, photos(src))")
    .eq("likee", session.user.id)
    .returns<IPromptLike[]>();

  // console.log("promptLikes :", promptLikes);
  // console.log("photoLikes :", photoLikes);

  return (
    <Likes photoLikes={photoLikes ?? []} promptLikes={promptLikes ?? []} />
  );
}
