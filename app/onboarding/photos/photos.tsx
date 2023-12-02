"use client";
import { PhotoGrid } from "@/components/photo-grid/photo-grid";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { ChevronRightIcon } from "@radix-ui/react-icons";
import {
  createClientComponentClient,
  User,
} from "@supabase/auth-helpers-nextjs";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";

interface PageProps {
  user: User;
  photos: PhotosType[] | null;
  onboarded: boolean | undefined;
}

export default function Photos({ user, photos, onboarded }: PageProps) {
  const supabase = createClientComponentClient<Database>();
  const router = useRouter();

  const handlePhotos = async () => {
    const { count } = await supabase
      .from("photos")
      .select("", { head: true, count: "exact" })
      .eq("profile_id", user.id);

    if (count && count >= 3) {
      await supabase
        .from("profiles")
        .update({
          onboarded: true,
        })
        .eq("id", user.id);

      router.push("/discover");
    } else {
      toast({
        variant: "destructive",
        title: "Додайте, будь ласка, хоча б 3 фото",
      });
    }
  };

  if (onboarded) {
    redirect("/discover");
  }

  return (
    <div className="flex h-[100svh] flex-col justify-between p-4 md:mx-auto md:w-[500px]">
      <div className="flex flex-col gap-6">
        <h1 className="mt-20 text-3xl font-bold ">Залишилось додати фото</h1>
        <div>
          <PhotoGrid user={user} photos={photos ?? []} />
        </div>
        <div className="flex flex-col gap-1">
          <p className="font-semibold text-gray-400">Додайте мінімум 3 фото.</p>
          <p className="text-sm font-semibold text-gray-400">
            * Натисніть на фото, щоб зробити його головним
          </p>
        </div>
      </div>

      <Button
        disabled={photos!! && photos?.length < 3}
        onClick={handlePhotos}
        className="self-end bg-primary"
      >
        Завершити
      </Button>
    </div>
  );
}
