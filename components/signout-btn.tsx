"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Button } from "./ui/button";
import { LogOutIcon } from "lucide-react";

export function SignOut() {
  const supabase = createClientComponentClient();
  const signout = async () => {
    await supabase.auth.signOut();
  };
  return (
    <div
      className="flex cursor-pointer items-center justify-between text-xl font-bold"
      onClick={signout}
    >
      Вийти
      <span>
        <LogOutIcon />
      </span>
    </div>
  );
}
