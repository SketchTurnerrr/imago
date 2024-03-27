import { createClient } from "@/lib/supabase/client";
import { useMutation } from "@tanstack/react-query";

export function useRemoveFromSkipped() {
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
      await supabase
        .from("skipped_profiles")
        .delete()
        .eq("object", profileId)
        .eq("subject", currentUserId);
    },
  });
}
