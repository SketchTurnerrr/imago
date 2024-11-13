import { unstable_noStore as noStore } from "next/cache";
import { createClient } from "@/lib/supabase/client";
import { FullProf, FullProfile } from "@/types";
import { useQuery, useQueryClient } from "@tanstack/react-query";

interface QueryProps {
  gender: string | undefined;
  type: "like" | "feed" | "chat" | "discover" | "single";
  profileId?: string;
  currentUserId?: string;
  subId?: string | null;
}
const supabase = createClient();

export function useGetProfiles({
  gender = "male",
  type = "discover",
  profileId,
  currentUserId,
  subId,
}: QueryProps) {
  return useQuery({
    queryKey: ["profile", profileId],
    queryFn: async () => {
      noStore();

      if (type === "discover" && currentUserId) {
        let filters = null;

        // Check if the user has a subscription
        if (subId) {
          const { data: filtersData } = await supabase
            .from("filters")
            .select("age, denomination")
            .eq("profile_id", currentUserId)
            .single();
          filters = filtersData;
        }

        let query = supabase
          .from("profiles")
          .select("*, prompts(*), photos(id,url,order)")
          .neq("onboarded", false)
          .eq("gender", gender);

        if (filters && subId && filters.denomination.length > 0) {
          query = query.in("denomination", filters.denomination);
        }

        if (filters && subId && filters.age) {
          query = query.gte("age", filters.age[0]).lte("age", filters.age[1]);
        }

        const { data } = await query.limit(1).single();

        return data;
      }

      if ((type === "like" || type === "chat") && profileId) {
        const { data } = await supabase
          .from("profiles")
          .select("*, prompts(*), photos(url,id, order)")
          .eq("id", profileId)
          .single();
        return data;
      }
    },
    // enabled: type === "discover",
  });
}

export function useGetProfile({ userId }: { userId: string }) {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const { data } = await supabase
        .from("profiles")
        .select("*, prompts(*), photos(*)")
        .eq("id", userId)
        .single();

      return data;
    },
  });
}
