import { unstable_noStore as noStore } from "next/cache";
import { createClient } from "@/lib/supabase/client";
import { FullProf, FullProfile } from "@/types";
import { useQuery } from "@tanstack/react-query";

interface QueryProps {
  gender: string | undefined;
  type: "discover" | "single";
  profileId?: string;
  userId?: string;
  subId?: string | null;
}

export function useGetProfiles({
  gender = "male",
  type = "discover",
  profileId,
  userId,
  subId,
}: QueryProps) {
  const supabase = createClient();

  return useQuery({
    queryKey: ["profile", profileId],
    queryFn: async () => {
      noStore();

      if (type === "discover" && userId) {
        let filters = null;

        // Check if the user has a subscription
        if (subId) {
          const { data: filtersData } = await supabase
            .from("filters")
            .select("age, denomination")
            .eq("profile_id", userId)
            .single();
          filters = filtersData;
        }

        let query = supabase
          .from("profiles")
          .select("*, prompts(*), photos(id,src)")
          .neq("onboarded", false)
          .eq("gender", gender);

        if (filters && subId && filters.denomination.length > 0) {
          query = query.in("denomination", filters.denomination);
        }

        if (filters && subId && filters.age) {
          query = query.gte("age", filters.age[0]).lte("age", filters.age[1]);
        }

        const { data } = await query.returns<FullProf>().limit(1).single();

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
