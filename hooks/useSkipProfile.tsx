import { createClient } from "@/lib/supabase/client";
import { useMutation } from "@tanstack/react-query";

export function useSkipProfile() {
  // currentUserId: string,
  // profileId: string,
  const supabase = createClient();
  return useMutation({
    mutationFn: async ({
      profileId,
      currentUserId,
    }: {
      profileId: string;
      currentUserId: string;
    }) => {
      const { count } = await supabase
        .from("skipped_profiles")
        .select("*", { head: true, count: "exact" })
        .eq("object", profileId)
        .eq("subject", currentUserId);
      // console.log("count :", count);
      if (count === 0) {
        const { error } = await supabase
          .from("skipped_profiles")
          .insert({ object: profileId, subject: currentUserId });
        console.log("error :", error);
      }
    },
  });
}
