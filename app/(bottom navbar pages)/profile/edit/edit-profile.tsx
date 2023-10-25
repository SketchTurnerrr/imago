"use client";
import { User } from "@supabase/supabase-js";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { AddPromptDialog } from "./add-prompt-dialog";
import { PhotoGrid } from "../../../../components/photo-grid/photo-grid";
interface PageProps {
  user: User;
  data: FullProfile;
  onboarding: boolean;
}

export function EditProfilePage({ user, data, onboarding }: PageProps) {
  console.log("data profile edit:", data);
  const router = useRouter();
  const supabase = createClientComponentClient<Database>();
  const handleDelete = async (id: string) => {
    await supabase.from("prompts").delete().eq("id", id);
    router.refresh();
  };

  return (
    <div className="h-screen px-4">
      <h2 className="mx-auto mb-4 max-w-md text-2xl font-bold">Фото</h2>

      <PhotoGrid photos={data.photos || []} user={user} />
      <div className="mx-auto flex max-w-md flex-col gap-4">
        <h2 className="mt-10 text-2xl font-bold">Фрази</h2>
        {data.prompts &&
          data.prompts?.map((prompt) => {
            return (
              <div
                key={prompt.id}
                className="relative flex flex-col rounded-lg border p-4 text-sm font-bold shadow-sm "
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
