"use client";
import { Button } from "@/components/ui/button";
import { Toggle } from "@/components/ui/toggle";
import { ChevronRightIcon } from "@radix-ui/react-icons";
import {
  createClientComponentClient,
  User,
} from "@supabase/auth-helpers-nextjs";
import { redirect, useRouter } from "next/navigation";
import { useState } from "react";

export function Gender({
  user,
  onboarded,
}: {
  user: User | undefined;
  onboarded: boolean | undefined;
}) {
  const [gender, setGender] = useState("male");
  const router = useRouter();

  const handleSubmit = async () => {
    const supabase = createClientComponentClient<Database>();
    if (user) {
      await supabase
        .from("profiles")
        .update({
          gender: gender,
        })
        .eq("id", user.id);
      router.push("/onboarding/denomination");
    }
  };

  if (onboarded) {
    redirect("/discover");
  }

  return (
    <div className="flex h-[100svh] flex-col justify-between p-4">
      <div className="flex flex-col gap-8">
        <h1 className="mt-20 text-5xl font-bold ">Ваша стать?</h1>
        <div className="flex items-center gap-2">
          <Toggle
            className="bg-accent data-[state=on]:bg-purple-400 data-[state=on]:text-white"
            pressed={gender === "male"}
            onClick={() => setGender("male")}
          >
            Чоловіча
          </Toggle>
          <Toggle
            className="bg-accent data-[state=on]:bg-purple-400 data-[state=on]:text-white"
            pressed={gender === "female"}
            onClick={() => setGender("female")}
          >
            Жіноча
          </Toggle>
        </div>
      </div>

      <Button
        onClick={handleSubmit}
        size="icon"
        className="self-end rounded-full bg-purple-400"
      >
        <ChevronRightIcon className="h-7 w-7" />
      </Button>
    </div>
  );
}
