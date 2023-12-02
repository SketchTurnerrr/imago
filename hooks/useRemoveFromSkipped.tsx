import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useMutation } from "@tanstack/react-query";

export function useRemoveFromSkipped() {
  // currentUserId: string,
  // profileId: string,
  const supabase = createClientComponentClient<Database>();
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
