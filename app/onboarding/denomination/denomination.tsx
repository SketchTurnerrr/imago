"use client";
import { Button } from "@/components/ui/button";
import { Toggle } from "@/components/ui/toggle";
import { createClient } from "@/lib/supabase/client";
import { ChevronRightIcon } from "@radix-ui/react-icons";
import { User } from "@supabase/supabase-js";

import { redirect, useRouter } from "next/navigation";
import { useState } from "react";

export function Denomination({
  user,
  onboarded,
}: {
  user: User | undefined;
  onboarded: boolean | undefined;
}) {
  const [denomination, setDenomination] = useState("");

  const router = useRouter();
  const handleSubmit = async () => {
    const supabase = createClient();
    if (user) {
      await supabase
        .from("profiles")
        .update({
          denomination: denomination,
        })
        .eq("id", user.id);
    }
    router.push("/onboarding/location");
  };

  if (onboarded) {
    redirect("/discover");
  }

  return (
    <div className="flex h-[100svh] flex-col justify-between p-4 md:mx-auto md:w-[500px]">
      <div className="flex flex-col gap-8">
        <h1 className="mt-20 text-5xl font-bold ">Ваша конфесія?</h1>
        <div className="flex flex-wrap items-center gap-3">
          <Toggle
            className="bg-accent font-semibold data-[state=on]:bg-purple-400 data-[state=on]:text-white"
            pressed={denomination === "Католізм"}
            onClick={() => setDenomination("Католізм")}
          >
            Католізм
          </Toggle>

          <Toggle
            className="bg-accent font-semibold data-[state=on]:bg-purple-400 data-[state=on]:text-white"
            onClick={() => setDenomination("Православ'я")}
            pressed={denomination === "Православ'я"}
            id="ortho"
          >
            Православ&apos;я
          </Toggle>

          <Toggle
            className="bg-accent font-semibold data-[state=on]:bg-purple-400 data-[state=on]:text-white"
            onClick={() => setDenomination("Євангелізм")}
            pressed={denomination === "Євангелізм"}
            id="evangelical"
          >
            Євангелізм
          </Toggle>

          <Toggle
            className="bg-accent font-semibold data-[state=on]:bg-purple-400 data-[state=on]:text-white"
            onClick={() => setDenomination("Баптизм")}
            pressed={denomination === "Баптизм"}
            id="baptist"
          >
            Баптизм
          </Toggle>

          <Toggle
            className="bg-accent font-semibold data-[state=on]:bg-purple-400 data-[state=on]:text-white"
            onClick={() => setDenomination("П'ятидесятництво")}
            pressed={denomination === "П'ятидесятництво"}
            id="pentecostal"
          >
            П&apos;ятидесятництво
          </Toggle>

          <Toggle
            className="bg-accent font-semibold data-[state=on]:bg-purple-400 data-[state=on]:text-white"
            onClick={() => setDenomination("Неконфесійна")}
            pressed={denomination === "Неконфесійна"}
            id="nondeno"
          >
            Неконфесійна
          </Toggle>

          <Toggle
            className="bg-accent font-semibold data-[state=on]:bg-purple-400 data-[state=on]:text-white"
            onClick={() => setDenomination("Інше")}
            pressed={denomination === "Інше"}
            id="other"
          >
            Інше
          </Toggle>
        </div>
      </div>
      <Button
        onClick={handleSubmit}
        size="icon"
        disabled={denomination === ""}
        className="self-end rounded-full bg-purple-400 "
      >
        <ChevronRightIcon className="h-7 w-7" />
      </Button>
    </div>
  );
}
