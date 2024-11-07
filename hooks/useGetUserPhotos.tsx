import { createClient } from "@/lib/supabase/client";
import { useQuery } from "@tanstack/react-query";

export function useGetUserPhotos({ userId }: { userId: string }) {
  const supabase = createClient();

  return useQuery({
    queryKey: ["photos", userId],
    queryFn: async () => {
      const { data } = await supabase
        .from("photos")
        .select("*")
        .eq("profile_id", userId);

      return data;
    },
    // enabled: type === "discover",
  });
}
