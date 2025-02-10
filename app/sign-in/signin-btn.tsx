"use client";

import { Button } from "@/components/ui/button";
import { Loader, LoaderCircle } from "lucide-react";
import Image from "next/image";
import { useFormStatus } from "react-dom";

export const SignBtn = () => {
  const { pending } = useFormStatus();

  return (
    <Button
      variant="outline"
      type="submit"
      className="w-full p-6 text-lg font-bold"
      disabled={pending}
    >
      {pending ? (
        <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <Image
          src="/google-logo.svg"
          alt="Google Logo"
          className="mr-2 dark:invert"
          width={24}
          height={24}
          priority
        />
      )}{" "}
      Увійти з Google
    </Button>
  );
};
