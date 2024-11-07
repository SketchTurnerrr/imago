"use client";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

export function GoBackBtn() {
  const router = useRouter();
  return (
    <Button onClick={() => router.back()} variant="ghost" size="icon">
      <ArrowLeftIcon className="h-7 w-7" />
    </Button>
  );
}
