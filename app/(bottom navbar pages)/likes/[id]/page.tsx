import { createClient } from "@/lib/supabase/server";
import Image from "next/image";
import { Prompt } from "@/components/prompt";
import { redirect } from "next/navigation";
import { FullProf, FullProfile } from "@/types";
import { Profile } from "@/components/random-profile-feed";

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return; //TODO;
  }

  const { data: like } = await supabase
    .from("likes")
    .select(
      "*, photo:photos(id, url), prompt:prompts(*), sender:profiles!likes_sender_fkey(id,name,gender, photos(url))",
    )
    .eq("id", params.id)
    .single();

  if (!like) {
    redirect("/likes");
  }

  const renderLike = !like.prompt ? (
    <div className="mx-auto p-4 md:w-[500px] md:px-0">
      <div className="h relative">
        <Image
          src={like.photo?.url!}
          width={500}
          height={500}
          alt={"k"}
          className="aspect-[16/9] rounded-lg object-cover"
        />

        <div className="absolute -bottom-2 rounded-lg bg-indigo-200 p-2 text-background">
          {like.comment
            ? like.comment
            : like?.sender?.gender === "male"
            ? "Вподобав" + " ваше фото"
            : "Вподобала" + " ваше фото"}
        </div>
      </div>
    </div>
  ) : (
    <div className="relative mx-auto my-4 p-4 md:w-[500px] md:px-0">
      <div className="relative space-y-4 rounded-lg bg-secondary p-4">
        <p>{like.prompt ? like.prompt.question : null}</p>
        <p className="truncate text-xl font-semibold">
          {like.prompt ? like.prompt?.answer : null}
        </p>
      </div>
      <div className="absolute -bottom-4 rounded-lg bg-indigo-200 p-2 text-background">
        {like.comment
          ? like.comment
          : like?.sender?.gender === "male"
          ? "Вподобав" + " вашу відповідь"
          : "Вподобала" + " вашу відповідь"}
      </div>
    </div>
  );

  return (
    <>
      {renderLike}

      <Profile
        type="like"
        gender={like.sender?.gender!}
        like={like}
        currentUserId={user.id}
        senderId={like.sender?.id!}
      />
    </>
  );
}
