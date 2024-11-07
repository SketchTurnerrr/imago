"use client";
import { createClient } from "@/lib/supabase/client";
import { Button } from "./ui/button";
import { LogOutIcon } from "lucide-react";

export function SignOut() {
  const supabase = createClient();
  const signout = async () => {
    await supabase.auth.signOut();
  };
  return (
    <div className="flex  items-center justify-between text-xl font-bold">
      Вийти
      <Button onClick={signout} variant="ghost" size="icon">
        <LogOutIcon />
      </Button>
    </div>
  );
}
