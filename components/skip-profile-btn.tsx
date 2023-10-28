"use client";
import { ArrowRightIcon, Cross1Icon } from "@radix-ui/react-icons";
import { Button } from "./ui/button";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

export function SkipProfileBtn({
  userId,
  profileId,
  skipProfile,
}: {
  userId: string;
  profileId: string;
  skipProfile: () => void;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const handleSkip = async () => {
    const supabase = createClientComponentClient<Database>();
    // await supabase
    //   .from('profiles')
    //   .update({
    //     skipped_profiles: [...skippedProfiles, profileID],
    //   })
    //   .eq('id', userId);
    skipProfile();

    router.refresh();
  };

  return (
    <div
      style={{ marginTop: 0 }}
      className="sticky top-[85%] z-30 h-0 md:left-20 md:top-[90%] md:self-start "
    >
      <Button
        onClick={handleSkip}
        size="icon"
        className="h-12 w-12 rounded-full bg-background"
      >
        {pathname.match("discover") ? (
          <ArrowRightIcon className="h-7 w-7 text-foreground" />
        ) : (
          <Cross1Icon className="h-7 w-7 text-foreground" />
        )}
      </Button>
    </div>
  );
}
