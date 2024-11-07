"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import { Separator } from "@/components/ui/separator";

import { PromptDialog } from "@/components/prompt-dialog";
import { EditIcon } from "lucide-react";
import { GoBackBtn } from "@/components/go-back-btn";
import { PhotoManager } from "@/components/photo-manager";
import { FullProf } from "@/types";
import { useGetProfile } from "@/hooks/useProfiles";

export default function EditProfilePage({ userId }: { userId: string }) {
  const { data } = useGetProfile({ userId: userId });

  if (!data) return <div>Loading...</div>;

  return (
    <div className="h-[100svh] p-4 md:mx-auto md:h-auto md:w-[500px]">
      <div className="mb-4 flex items-center gap-3">
        <GoBackBtn />
        <h1 className="text-3xl font-bold">Редагувати</h1>
      </div>
      <Separator className="bg-slate-300" />
      <h2 className="mx-auto my-4 text-2xl font-bold">Фото</h2>
      <span className="text-sm md:hidden">
        натисніть на фото, щоб зробити його головним
      </span>
      <PhotoManager userId={userId} onboarding={false} />
      <div className="flex flex-col gap-4 pb-20 md:pb-10">
        <h2 className="mt-10 text-2xl font-bold">Фрази</h2>
        {data.prompts?.map((prompt) => {
          return (
            <div
              key={prompt.id}
              className="relative flex flex-col rounded-lg border border-gray-100 bg-slate-50 p-4 text-sm font-bold shadow-sm dark:border-none dark:bg-secondary"
            >
              <p>{prompt.question}</p>
              <p className="mt-2 font-normal text-slate-500">{prompt.answer}</p>
              <PromptDialog promptId={prompt.id} type="edit" userId={data.id} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
