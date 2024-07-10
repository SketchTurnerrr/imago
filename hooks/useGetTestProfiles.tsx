import { unstable_noStore as noStore } from "next/cache";
import { createClient } from "@/lib/supabase/client";
import { FullProf, FullProfile } from "@/types";
import { useQuery } from "@tanstack/react-query";
interface QueryProps {
  gender: string | undefined;
  ageFilter?: number[];
  denominationFilter?: string[];
  type: "discover" | "single";
  profileId?: string;
  userId: string;
}

export function useGetTestProfiles({
  gender = "male",
  type = "discover",
  userId,
  profileId,
}: QueryProps) {
  const supabase = createClient();
  console.log("profileId :", userId);

  return useQuery({
    queryKey: ["test-profile", userId],
    queryFn: async () => {
      noStore();

      if (type === "discover") {
        let query = supabase
          //@ts-ignore
          .from("random_test_profiles")
          .select("*")
          .eq("gender", gender);

        const { data } = await query.limit(1).single();

        return data;
      }

      if (type === "single" && profileId) {
        const { data } = await supabase
          .from("profiles")
          .select("*, prompts(*), photos(src,id)")
          .order("updated_at", { foreignTable: "photos", ascending: false })
          .eq("id", profileId)
          .single();
        return data;
      }
    },
    // enabled: type === "discover",
  });
}
