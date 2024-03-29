import { createClient } from "@/lib/supabase/server";
import Image from "next/image";
import { Prompt } from "@/components/prompt";
import { redirect } from "next/navigation";
import { Profile } from "@/components/profile";
import { FullProfile, IPhotoLike, IPromptLike } from "@/types";

export default async function Page({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: {
    likeId: string;
    t: "ph" | "p";
  };
}) {
  const supabase = createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const { data: profile } = await supabase
    .from("profiles")
    .select("*, prompts(*), photos(src,id)")
    .eq("id", params.id)
    .returns<FullProfile[]>();

  // ph photoId
  // p promptId

  const type = searchParams.t;

  const likesQuery =
    type === "ph"
      ? supabase
          .from("photo_likes")
          .select("id,photo(src), comment, liker(gender)")
          .eq("id", searchParams.likeId)
          .returns<IPhotoLike[]>()
          .single()
      : supabase
          .from("prompt_likes")
          .select("id,prompt(*), comment, liker(gender)")
          .eq("id", searchParams.likeId)
          .returns<IPromptLike[]>()
          .single();

  const { data: like } = await likesQuery;

  if (!like) {
    redirect("/likes");
  }

  const renderLike =
    "photo" in like ? (
      <div className="mx-auto p-4 md:w-[500px] md:px-0">
        <div className="relative">
          <Image
            src={like.photo.src}
            width={500}
            height={100}
            alt={"k"}
            className="aspect-[32/9] rounded-lg object-cover"
          />

          <div className="absolute -bottom-2 rounded-lg bg-indigo-200 p-2">
            {like.comment
              ? like.comment
              : like.liker.gender === "male"
              ? "Вподобав" + " ваше фото"
              : "Вподобала" + " ваше фото"}

            <span className="_clip-path absolute -bottom-[4px] -left-[3px] h-[0.6rem] w-[0.6rem] rotate-[207deg] bg-inherit"></span>
          </div>
        </div>
      </div>
    ) : (
      <div className="relative mx-auto my-4 p-4 md:w-[500px] md:px-0">
        <div className="relative space-y-4 rounded-lg bg-secondary px-2 py-6">
          <h2 className="truncate text-xl font-semibold">
            {like.prompt.answer}
          </h2>
        </div>
        <div className="absolute -bottom-2 rounded-lg bg-indigo-200 p-2">
          {like.comment
            ? like.comment
            : like.liker.gender === "male"
            ? "Вподобав" + " вашу відповідь"
            : "Вподобала" + " вашу відповідь"}

          <span className="_clip-path absolute -bottom-[4px] -left-[3px] h-[0.6rem] w-[0.6rem] rotate-[207deg] bg-inherit"></span>
        </div>
      </div>
    );

  if (!profile || !session) {
    return; //TODO;
  }

  return (
    <>
      {renderLike}

      <Profile
        type="single"
        userId={session.user.id}
        serverProfiles={profile}
        profileId={params.id}
        likeData={{ like, type }}
      />
    </>
  );
}
