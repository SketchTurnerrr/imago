"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Onboarding() {
  return (
    <div className="flex h-[100svh] flex-col items-center justify-center p-4">
      <div className="flex flex-col items-center gap-40">
        <h1 className="text-5xl font-bold">
          Давайте спершу заповнимо базову інформацію
        </h1>
        <Button
          className="bg-purple-400 px-8 py-6 text-2xl font-bold hover:bg-purple-500"
          asChild
        >
          <Link href={"onboarding/first-name"}>Почати</Link>
        </Button>
      </div>
    </div>
  );
}
