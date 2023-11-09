import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useQuery } from "@tanstack/react-query";

interface QueryProps {
  gender: string | undefined;
  ageFilter?: number[];
  denominationFilter?: string[];
  type: "discover" | "single";
  profileId?: string;
}

export function useGetProfiles({
  gender = "male",
  ageFilter = [17, 50],
  denominationFilter = [],
  type = "discover",
  profileId,
}: QueryProps) {
  const supabase = createClientComponentClient<Database>();

  return useQuery({
    queryKey: ["profile", profileId],
    queryFn: async () => {
      if (type === "discover") {
        const { data } = await supabase

          .from("random_profiles")
          .select("*, prompts(*), photos(src,id)")
          .order("updated_at", { foreignTable: "photos", ascending: false })
          .eq("gender", gender)
          .gte("age", ageFilter[0])
          .lte("age", ageFilter[1])
          // .in("denomination", [])
          .neq("onboarded", false)
          .returns<FullProfile[]>()
          .limit(1)
          .single();

        return data;
      }

      if (type === "single" && profileId) {
        const { data } = await supabase
          .from("profiles")
          .select("*, prompts(*), photos(src,id)")
          .order("updated_at", { foreignTable: "photos", ascending: false })
          .eq("gender", gender)
          .eq("id", profileId)
          .single();
        return data;
      }
    },
    // enabled: type === "discover",
  });
}
