import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useQuery } from "@tanstack/react-query";

export function useGetLastSkippedProfile(id: string) {
  const supabase = createClientComponentClient<Database>();

  return useQuery({
    queryKey: ["profile", id],
    queryFn: async () => {
      const { data } = await supabase
        .from("profiles")
        .select("*, prompts(*), photos(src,id)")
        .order("updated_at", { foreignTable: "photos", ascending: false })
        .eq("id", id)
        .limit(1);
      return data;
    },
    enabled: false,
  });
}
