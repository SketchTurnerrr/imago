"use client";
import { ArrowRightIcon, Cross1Icon } from "@radix-ui/react-icons";
import { Button } from "./ui/button";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { useSkipProfile } from "@/hooks/useSkipProfile";
import { Undo } from "lucide-react";
import { useRemoveFromSkipped } from "@/hooks/useRemoveFromSkipped";

export function LeftProfileBtn({
  userId,
  profileId,
  likeData,
  refetch,
}: {
  userId: string;
  profileId: string;
  likeData: { like: PhotoLike | PromptLike; type: string } | null;
  refetch: () => void;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const { mutate: skipProfile } = useSkipProfile();
  const { mutate: removeFromSkipped } = useRemoveFromSkipped();

  const handleAction = async () => {
    // console.log("pathname :");

    const supabase = createClientComponentClient<Database>();

    const table =
      likeData && likeData.type === "ph" ? "photo_likes" : "prompt_likes";
    if (likeData && pathname.includes("likes")) {
      try {
        await supabase.from(table).delete().eq("id", likeData.like.id);

        router.refresh();
      } catch (error) {
        console.log("error :", error);
      }
    }

    if (pathname.includes("discover")) {
      skipProfile({ profileId, currentUserId: userId });
      refetch();
    }

    if (pathname.includes("skipped-profiles")) {
      removeFromSkipped({
        profileId,
        currentUserId: userId,
      });
      router.push("/skipped-profiles");
    }
  };

  return (
    <div
      style={{ marginTop: 0 }}
      className="sticky top-[85%] z-30 h-0 md:left-20 md:top-[90%] md:self-start "
    >
      <Button
        onClick={handleAction}
        size="icon"
        className="h-12 w-12 rounded-full bg-background hover:bg-[#f2f2f2]"
      >
        {pathname.match("discover") ? (
          <ArrowRightIcon className="h-7 w-7 text-foreground" />
        ) : pathname.match("skipped-profiles") ? (
          <Undo className="h-7 w-7 text-foreground" />
        ) : (
          <Cross1Icon className="h-7 w-7 text-foreground" />
        )}
      </Button>
    </div>
  );
}
