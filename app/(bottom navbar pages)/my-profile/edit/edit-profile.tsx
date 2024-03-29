"use client";
import { User } from "@supabase/supabase-js";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { AddPromptDialog } from "./add-prompt-dialog";
import { GoBack } from "@/components/go-back";
import { Separator } from "@/components/ui/separator";
import { PhotoGrid } from "@/components/photo-grid/photo-grid";
import { createClient } from "@/lib/supabase/client";
import { FullProfile } from "@/types";
interface PageProps {
  user: User;
  data: FullProfile;
}

export function EditProfilePage({ user, data }: PageProps) {
  const router = useRouter();
  const supabase = createClient();
  const handleDelete = async (id: string) => {
    await supabase.from("prompts").delete().eq("id", id);
    router.refresh();
  };

  return (
    <div className="h-[100svh] p-4 md:mx-auto md:h-auto md:w-[500px]">
      <div className="mb-4 flex items-center gap-3">
        <GoBack />
        <h1 className="text-3xl font-bold">Редагувати</h1>
      </div>
      <Separator />
      <h2 className="mx-auto mt-4 text-2xl font-bold">Фото</h2>
      <span className="text-sm md:hidden">
        натисніть на фото, щоб зробити його головним
      </span>
      <PhotoGrid photos={data.photos || []} user={user} />
      <div className="mx-auto flex max-w-md flex-col gap-4 pb-20 md:pb-10">
        <h2 className="mt-10 text-2xl font-bold">Фрази</h2>
        {data.prompts &&
          data.prompts?.map((prompt) => {
            return (
              <div
                key={prompt.id}
                className="relative flex flex-col rounded-lg border border-gray-100 bg-slate-50 p-4 text-sm font-bold shadow-sm dark:border-none dark:bg-secondary"
              >
                <p>{prompt.question}</p>
                <p className="mt-2 border-l border-muted pl-2 text-muted-foreground">
                  {prompt.answer}
                </p>
                <div
                  onClick={() => handleDelete(prompt.id)}
                  role="button"
                  className="absolute -right-1 -top-1 rounded-full bg-white p-1 shadow-md"
                >
                  <Image src="/x.svg" width={14} height={14} alt="close icon" />
                </div>
              </div>
            );
          })}

        {data.prompts && data?.prompts.length !== 3 && (
          <AddPromptDialog user={user} />
        )}
      </div>
    </div>
  );
}
