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
import { useGetTestProfiles } from "@/hooks/useGetTestProfiles";
import { createClient } from "@/lib/supabase/client";
import { useQuery } from "@tanstack/react-query";

interface IProfile {
  serverProfiles?: FullProf[];
  userId: string;
  profileId?: string;
  likeData: { like: IPhotoLike | IPromptLike; type: "ph" | "p" } | null;
  gender?: "male" | "female";
  type: "discover" | "single";
  sub?: string | null;
}

export function TestProfile({
  userId,
  profileId,
  likeData,
  gender,
  type,

  sub = null,
}: IProfile) {
  // const supabase = createClient();

  const { data, refetch } = useGetTestProfiles({
    gender,
    type,
    userId,
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
  //@ts-ignore
  const dob = format(parseISO(String(profile.date_of_birth)), "yyyy/MM/dd");
  const date = parse(dob, "yyyy/MM/dd", new Date());
  const age = differenceInYears(new Date(), date);

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
            alt="adad"
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
          //@ts-ignore
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
            {
              //@ts-ignore
              profile.first_name
            }
          </h1>

          {
            //@ts-ignore
            profile.verified && (
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
            )
          }
        </div>
        {/* POSTPONOED */}

        {!pathname.includes("likes") && (
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.push("/skipped-profiles")}
            >
              <Clock />
            </Button>

            {type === "discover" && (
              <Filter refetch={refetch} userId={userId} />
            )}
          </div>
        )}
      </div>
      {
        <LeftProfileBtn
          likeData={likeData}
          userId={userId}
          //@ts-ignore
          profileId={profile.id}
          refetch={refetch}
        />
      }

      {
        <div className={"relative mx-auto"}>
          <Image
            src={"/dan.jpg"}
            priority
            alt="add"
            width={500}
            height={700}
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
        </div>
      }

      {prompt("питання 1", "відповідь 1", "adwd")}

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
            {
              //@ts-ignore

              profile.denomination
            }
          </div>
          <div className="flex items-center gap-3">
            <MapPin />
            {
              //@ts-ignore

              profile.toponym
            }
          </div>
        </div>
      </div>

      {/*       
      ----- PHOTO1
      */}

      {photo("/dan.jpg", "dadfas")}

      {/*       
      ----- PHOTO2
      */}

      {photo("/dan.jpg", "dadfzxcas")}

      {prompt("питання 2", "відповідь 2", "adadawd")}

      {/*       
      ----- PHOTO3
      */}

      {photo("/dan.jpg", "dadfzxcxzcas")}

      {prompt("питання 3", "відповідь 3", "adazccdawd")}

      {/*       
      ----- PHOTO4
      */}

      {photo("/dan.jpg", "dadfazxczcxs")}
      {/*       
      ----- PHOTO5
      */}

      {photo("/dan.jpg", "dadfzxczxcs")}
      <div className="pb-20"></div>
    </main>
  );
}
