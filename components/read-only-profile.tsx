"use client";
import { differenceInYears, parse, format, parseISO } from "date-fns";
import Image from "next/image";
import Cross from "@/public/cross.svg";
import Cake from "@/public/cake.svg";
import MapPin from "@/public/map-pin.svg";
import Loading from "@/app/(bottom navbar pages)/discover/loading";
import { ReadOnlyProfileType } from "@/types";

export function ReadOnlyProfile({ profile }: { profile: ReadOnlyProfileType }) {
  const dob = format(parseISO(String(profile.date_of_birth)), "yyyy/MM/dd");
  const date = parse(dob, "yyyy/MM/dd", new Date());
  const age = differenceInYears(new Date(), date);

  const { question: question0, answer: answer0 } = profile.prompts?.[0] || "";
  const { question: question1, answer: answer1 } = profile.prompts?.[1] || "";
  const { question: question2, answer: answer2 } = profile.prompts?.[2] || "";

  const { src: src0 } = profile.photos?.[0] || "";
  const { src: src1 } = profile.photos?.[1] || "";
  const { src: src2 } = profile.photos?.[2] || "";
  const { src: src3 } = profile.photos?.[3] || "";
  const { src: src4 } = profile.photos?.[4] || "";
  const { src: src5 } = profile.photos?.[5] || "";

  const photo = (src: string | null) => {
    if (!src) {
      return null;
    } else {
      return (
        <div className={"relative w-fit"}>
          <Image
            priority
            src={
              src ||
              "https://beasnruicmydtdgqozev.supabase.co/storage/v1/object/public/photos/5b16fe18-c7dc-46e6-82d1-04c5900504e4/jEudzBHSsYg.jpg"
            }
            height={500}
            width={500}
            alt="me"
            className="rounded-lg"
          />
        </div>
      );
    }
  };

  const prompt = (question: string, answer: string) => {
    if (!question) {
      return null;
    } else {
      return (
        <div className="relative space-y-4 rounded-lg bg-gray-50 px-4 py-10 dark:bg-secondary md:w-[500px]">
          <p className="text-md font-semibold">{question}</p>
          <h2 className="text-3xl font-bold">{answer}</h2>
        </div>
      );
    }
  };

  return (
    <main className="mt-12 flex flex-col space-y-4 p-4 md:items-center">
      {photo(src0)}

      {prompt(question0, answer0)}

      {/*       
      ----- INFO 
      */}

      <div className="relative rounded-lg bg-gray-50 px-4 py-10 font-bold dark:bg-secondary md:w-[500px]">
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

      {photo(src1)}

      {/*       
      ----- PHOTO2
      */}

      {photo(src2)}

      {prompt(question1, answer1)}

      {/*       
      ----- PHOTO3
      */}

      {photo(src3)}

      {prompt(question2, answer2)}

      {/*       
      ----- PHOTO4
      */}

      {photo(src4)}
      {/*       
      ----- PHOTO5
      */}

      {photo(src5)}
      <div className="pb-20"></div>
    </main>
  );
}
