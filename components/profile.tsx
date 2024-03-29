"use client";
import { differenceInYears, parse, format, parseISO } from "date-fns";
import Image from "next/image";
import Cross from "@/public/cross.svg";
import Cake from "@/public/cake.svg";
import MapPin from "@/public/map-pin.svg";
import BadgeIcon from "@/public/badge-check.svg";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap, { Power2 } from "gsap";
import { LeftProfileBtn } from "@/components/left-profile-btn";
import { Prompt } from "@/components/prompt";
import { LikeDialog } from "@/components/like-dialog";
import { usePathname, useRouter } from "next/navigation";
import { MatchDialog } from "@/components/match-btn";
import { Filter } from "@/components/filter";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useGetProfiles } from "@/hooks/useGetProfiles";
import { Clock } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { GoBack } from "./go-back";
import { toast } from "@/components/ui/use-toast";
import { FullProf, FullProfile, IPhotoLike, IPromptLike } from "@/types";

interface IProfile {
  serverProfiles?: FullProf[];
  userId: string;
  profileId?: string;
  likeData: { like: IPhotoLike | IPromptLike; type: "ph" | "p" } | null;
  gender?: "male" | "female";
  type: "discover" | "single";
  sub?: string | null;
}

export function Profile({
  userId,
  profileId,
  likeData,
  gender,
  type,
  sub = null,
}: IProfile) {
  const { data, refetch } = useGetProfiles({
    gender,
    type,
    profileId,
  });

  const profileRef = useRef(null);
  const profile = data;

  const [imgLoading, setImgLoading] = useState(true);

  const router = useRouter();
  const pathname = usePathname();

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

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        profileRef.current,
        {
          y: "20%",
          autoAlpha: 0,
          duration: 1,
          ease: Power2.easeInOut,
        },
        {
          autoAlpha: 1,
          y: 0,
        },
      );
    }, profileRef);

    return () => ctx.revert();
  }, [profile]);

  if (!profile) {
    return null;
  }
  const dob = format(parseISO(String(profile.date_of_birth)), "yyyy/MM/dd");
  const date = parse(dob, "yyyy/MM/dd", new Date());
  const age = differenceInYears(new Date(), date);

  const {
    question: question0,
    answer: answer0,
    id: promptId0,
  } = profile.prompts[0] || "";
  const {
    question: question1,
    answer: answer1,
    id: promptId1,
  } = profile.prompts[1] || "";
  const {
    question: question2,
    answer: answer2,
    id: promptId2,
  } = profile.prompts[2] || "";

  const { src: src0, id: photoId0 } = profile.photos[0] || "";
  const { src: src1, id: photoId1 } = profile.photos[1] || "";
  const { src: src2, id: photoId2 } = profile.photos[2] || "";
  const { src: src3, id: photoId3 } = profile.photos[3] || "";
  const { src: src4, id: photoId4 } = profile.photos[4] || "";
  const { src: src5, id: photoId5 } = profile.photos[5] || "";

  const photo = (src: string, id: string) => {
    if (!src) {
      return null;
    } else {
      return (
        <div className={"relative mx-auto"}>
          <Image
            src={src}
            width={500}
            height={700}
            alt={profile.first_name}
            className={cn(
              "rounded-lg duration-700 ease-in-out",
              imgLoading
                ? "scale-90 blur-lg grayscale"
                : "scale-100 blur-0 grayscale-0",
            )}
            onLoad={() => {
              setImgLoading(false);
            }}
          />
          {pathname === "/discover" && (
            <LikeDialog
              itemId={id}
              type="photo"
              liker={userId}
              likee={profile.id}
              src={src}
              firstName={profile.first_name}
              question={null}
              answer={null}
            />
          )}
        </div>
      );
    }
  };

  // console.log('userId :', userId);
  // console.log('profile.id :', profile?.id);
  const prompt = (question: string, answer: string, id: string) => {
    if (!question) {
      return null;
    } else {
      return (
        <Prompt
          liker={userId}
          likee={profile.id}
          question={question}
          answer={answer}
          id={id}
        />
      );
    }
  };

  return (
    <main
      ref={profileRef}
      className="overflow-x flex min-h-[100svh] flex-col space-y-4 bg-[hsl(0,0%,95%)] p-4 opacity-0 dark:bg-background md:items-center"
    >
      <div className="flex items-center justify-between md:w-[500px]">
        <div className="flex items-center gap-3">
          <h1 className="text-4xl font-bold capitalize md:self-start">
            {profile.first_name}
          </h1>
          {profile.verified && (
            <Popover>
              <PopoverTrigger>
                <BadgeIcon
                  className="inline-block text-white"
                  width={32}
                  height={32}
                />
              </PopoverTrigger>
              <PopoverContent className="w-fit border-none bg-secondary-foreground p-2 text-sm text-white dark:bg-secondary">
                <p>Верифікований акаунт</p>
              </PopoverContent>
            </Popover>
          )}
        </div>
        {/* POSTPONOED */}

        {/* {!pathname.includes("likes") && userId === sub && (
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.push("/skipped-profiles")}
            >
              <Clock />
            </Button>

            {type === "discover" && <Filter userId={userId} />}
          </div>
        )} */}
      </div>
      {
        <LeftProfileBtn
          likeData={likeData}
          userId={userId}
          profileId={profile.id}
          refetch={refetch}
        />
      }
      {pathname.includes("likes") && (
        <MatchDialog
          likee={profile.id}
          liker={userId}
          src={profile.photos[0].src}
          firstName={profile.first_name}
          likeData={likeData}
        />
      )}

      {src0 && (
        <div className={"relative mx-auto"}>
          <Image
            src={src0}
            priority
            width={500}
            height={700}
            alt={profile.first_name}
            className={cn(
              "rounded-lg duration-700 ease-in-out",
              imgLoading
                ? "scale-90 blur-lg grayscale"
                : "scale-100 blur-0 grayscale-0",
            )}
            onLoad={() => {
              setImgLoading(false);
            }}
          />
          {pathname === "/discover" && (
            <LikeDialog
              itemId={photoId0}
              type="photo"
              liker={userId}
              likee={profile.id}
              src={src0}
              firstName={profile.first_name}
              question={null}
              answer={null}
            />
          )}
        </div>
      )}

      {prompt(question0, answer0, promptId0)}

      {/*       
      ----- INFO 
      */}

      <div className="relative rounded-lg bg-white px-4 py-4 font-bold dark:bg-secondary md:w-[500px]">
        <div className="flex items-center justify-around gap-6 text-secondary-foreground">
          <div className="flex items-center gap-3">
            <Cake />
            {age || "17"}
          </div>
          <div className="flex items-center gap-3">
            <Cross />
            {profile.denomination}
          </div>
          <div className="flex items-center gap-3">
            <MapPin />
            {profile.toponym}
          </div>
        </div>
      </div>

      {/*       
      ----- PHOTO1
      */}

      {photo(src1, photoId1)}

      {/*       
      ----- PHOTO2
      */}

      {photo(src2, photoId2)}

      {prompt(question1, answer1, promptId1)}

      {/*       
      ----- PHOTO3
      */}

      {photo(src3, photoId3)}

      {prompt(question2, answer2, promptId2)}

      {/*       
      ----- PHOTO4
      */}

      {photo(src4, photoId4)}
      {/*       
      ----- PHOTO5
      */}

      {photo(src5, photoId5)}
      <div className="pb-20"></div>
    </main>
  );
}
