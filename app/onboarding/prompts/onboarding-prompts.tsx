"use client";

import { AddPromptDialog } from "@/app/(bottom navbar pages)/my-profile/edit/add-prompt-dialog";
import { Button } from "@/components/ui/button";
import { ChevronRightIcon } from "@radix-ui/react-icons";
import {
  createClientComponentClient,
  User,
} from "@supabase/auth-helpers-nextjs";
import Image from "next/image";
import { redirect, useRouter } from "next/navigation";

type PageProps = {
  user: User;
  data: FullProfile | null;
};

export default function OnboardingPrompts({ user, data }: PageProps) {
  const router = useRouter();
  const supabase = createClientComponentClient<Database>();
  const handleDelete = async (id: string) => {
    await supabase.from("prompts").delete().eq("id", id);
    router.refresh();
  };

  if (data?.onboarded) {
    redirect("/discover");
  }

  return (
    <div className="flex h-[100svh] flex-col justify-between p-4 md:mx-auto md:w-[500px]">
      <div className="flex flex-col gap-4">
        <h1 className="mb-4 mt-20 text-5xl font-bold">Додайте три фрази</h1>
        {data?.prompts?.map((prompt) => {
          return (
            <div
              key={prompt.id}
              className="relative flex flex-col rounded-lg border border-slate-100 p-4 text-sm font-bold shadow-sm"
            >
              <p>{prompt.question}</p>
              <p className="mt-2 border-l border-gray-300 pl-2 text-gray-500">
                {prompt.answer}
              </p>
              <div
                onClick={() => handleDelete(prompt.id)}
                role="button"
                className="absolute -right-1 -top-1 rounded-full bg-white p-1 shadow-md"
              >
                <Image
                  src="/x.svg"
                  width={14}
                  height={14}
                  alt="close icon"
                  className=""
                />
              </div>
            </div>
          );
        })}
        {data && data.prompts.length < 3 && <AddPromptDialog user={user} />}
        <p className="text-sm font-semibold text-gray-400">
          Додайте мінімум 3 фрази.
        </p>
      </div>
      <Button
        size="icon"
        onClick={() => router.push("/onboarding/photos")}
        className="self-end rounded-full bg-purple-400"
        disabled={data?.prompts.length !== 3}
      >
        <ChevronRightIcon className="h-7 w-7" />
      </Button>
    </div>
  );
}
