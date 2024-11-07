"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { differenceInYears, parse } from "date-fns";
import { LikeDialog } from "./like-dialog";
import { Prompt } from "./prompt";
import { MatchBtn } from "./match-btn";
import { RemoveLikeBtn } from "./remove-like-btn";
import { toast } from "@/components/ui/use-toast";
import { useGetProfiles } from "@/hooks/useProfiles";
import { useEffect } from "react";
import Image from "next/image";
import { ArrowRight, CakeIcon, MapPin } from "lucide-react";
import { CrossIcon } from "./svg/cross-icon";

interface ProfileProps {
  type: "like" | "chat" | "discover" | "single";
  like?: any;
  currentUserId: string;
  gender: string;
  subId?: string | null;
  senderId?: string;
}

function PhotoComponent({
  type,
  photo,
  name,
  currentUserId,
  profileId,
}: {
  type: "like" | "discover" | "chat" | "single";
  photo: {
    id: string;

    url: string;
    order: number;
  };
  name: string | undefined;
  currentUserId?: string;
  profileId: string;
}) {
  return (
    <div className="relative">
      <Image
        src={photo?.url}
        alt={`${name}'s photo`}
        width={1000}
        height={1100}
        className="h-auto w-full rounded-lg"
      />
      {type !== "chat" && type !== "like" && (
        <LikeDialog
          itemId={photo.id}
          type="photo"
          liker={currentUserId}
          likee={profileId}
          url={photo.url}
          name={name}
        />
      )}
    </div>
  );
}

function PromptComponent({
  prompt,
  currentUserId,
  profileId,
  type,
}: {
  type: "like" | "discover" | "chat" | "single";
  prompt: {
    id: string;
    profile_id: string;
    question: string;
    answer: string;
  };
  currentUserId?: string;
  profileId: string;
}) {
  return (
    <Prompt
      type={type}
      question={prompt.question}
      answer={prompt.answer}
      display={true}
      liker={currentUserId}
      likee={profileId}
      id={prompt.id}
    />
  );
}

function ButtonSection({
  currentUserId,
  like,

  type,
}: {
  type: "like" | "chat" | "discover" | "single";
  currentUserId: string;
  like: any;

  subId?: string | null;
}) {
  if (type === "chat") return null;

  return (
    <div className="fixed bottom-20 left-0 right-0 flex justify-between space-x-4 px-8 md:bottom-10 md:justify-around">
      {type === "discover" ? (
        // Discover page: only show next profile button
        <>
          <Button
            size="icon"
            className="flex h-14 w-14 items-center justify-center rounded-full"
          >
            <ArrowRight className="h-8 w-8" />
          </Button>
          <div className="h-14 w-14"></div>
        </>
      ) : type === "like" && currentUserId && like ? (
        // Like page: show remove and match buttons
        <>
          <RemoveLikeBtn currentUserId={currentUserId} itemId={like.itemId} />
          <MatchBtn like={like} />
        </>
      ) : null}
    </div>
  );
}

export function Profile({
  type,
  like,
  currentUserId,
  gender,
  subId = null,
  senderId,
}: ProfileProps) {
  useEffect(() => {
    const showWelcomeToast = localStorage.getItem("showWelcomeToast");

    if (!showWelcomeToast) {
      toast({
        title: "Вітаємо",
        description:
          "Наразі, користувачів небагато, тому поділись цією платформою з друзями :)",
        duration: 5000,
        style: { backgroundColor: "#030d29", color: "#f3f3f3" },
      });
      localStorage.setItem("showWelcomeToast", "true");
    }
  }, []);

  const { data: profile, refetch } = useGetProfiles({
    gender,
    type,
    currentUserId,
    subId,
    profileId: senderId,
  });

  if (!profile) {
    return <div>Something went wrong </div>;
  }

  const sortedPhotos = profile.photos.sort((a, b) => a.order - b.order);
  const sortedPrompts = profile.prompts.slice(0, 3);

  const calculateAge = (dob: string | undefined) => {
    if (!dob) return;
    const parsedDate = parse(dob, "yyyy-MM-dd", new Date());
    return differenceInYears(new Date(), parsedDate);
  };

  const age = calculateAge(profile.date_of_birth);

  return (
    <>
      <Card className="bg-[hsl(0, 0%, 12%)] mx-auto mb-[120px] w-full max-w-md rounded-none border-none shadow-none md:max-w-lg">
        <CardHeader className="px-4 pb-0">
          <CardTitle className="text-4xl">{profile.name}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 p-4">
          {sortedPhotos[0] && (
            <PhotoComponent
              type={type}
              photo={sortedPhotos[0]}
              name={profile.name}
              currentUserId={currentUserId}
              profileId={profile.id}
            />
          )}
          <Image
            src={"https://picsum.photos/1200/1900"}
            alt={`${name}'s photo`}
            width={1000}
            height={1000}
            className="h-auto w-full rounded-lg"
          />

          <div className="flex justify-between rounded-lg bg-purple-50 p-4 text-base font-semibold dark:bg-secondary">
            <span className="flex items-center gap-2">
              <CakeIcon />
              {age}
            </span>

            <span className="flex items-center gap-2">
              <CrossIcon />
              {profile.denomination}
            </span>
            <span className="flex items-center gap-2">
              <MapPin className="h-6 w-6" />
              {profile.custom_location
                ? profile.custom_location
                : profile.location}
            </span>
          </div>
          {sortedPrompts[0] && (
            <PromptComponent
              type={type}
              prompt={sortedPrompts[0]}
              currentUserId={currentUserId}
              profileId={profile.id}
            />
          )}

          {sortedPhotos[1] && (
            <PhotoComponent
              type={type}
              photo={sortedPhotos[1]}
              name={profile.name}
              currentUserId={currentUserId}
              profileId={profile.id}
            />
          )}
          <Image
            src={"https://picsum.photos/1100/1200"}
            alt={`${name}'s photo`}
            width={1000}
            height={1000}
            className="h-auto w-full rounded-lg"
          />

          {sortedPhotos[2] && (
            <PhotoComponent
              type={type}
              photo={sortedPhotos[2]}
              name={profile.name}
              currentUserId={currentUserId}
              profileId={profile.id}
            />
          )}

          {sortedPrompts[1] && (
            <PromptComponent
              type={type}
              prompt={sortedPrompts[1]}
              currentUserId={currentUserId}
              profileId={profile.id}
            />
          )}

          {sortedPhotos[3] && (
            <PhotoComponent
              type={type}
              photo={sortedPhotos[3]}
              name={profile.name}
              currentUserId={currentUserId}
              profileId={profile.id}
            />
          )}

          {sortedPrompts[2] && (
            <PromptComponent
              type={type}
              prompt={sortedPrompts[2]}
              currentUserId={currentUserId}
              profileId={profile.id}
            />
          )}

          {sortedPhotos[4] && (
            <PhotoComponent
              type={type}
              photo={sortedPhotos[4]}
              name={profile.name}
              currentUserId={currentUserId}
              profileId={profile.id}
            />
          )}

          {sortedPhotos[5] && (
            <PhotoComponent
              type={type}
              photo={sortedPhotos[5]}
              name={profile.name}
              currentUserId={currentUserId}
              profileId={profile.id}
            />
          )}
        </CardContent>
      </Card>

      <ButtonSection type={type} currentUserId={currentUserId} like={like} />
    </>
  );
}
