import { createClient } from "@/lib/supabase/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreateMatch() {
  const queryClient = useQueryClient();
  const supabase = createClient();
  return useMutation({
    mutationFn: async ({
      receiverId,
      initiatorId,
      comment,
    }: {
      receiverId: string;
      initiatorId: string;
      comment?: string;
    }) => {
      // Start a Supabase transaction
      const { data: match, error: matchError } = await supabase
        .from("matches")
        .insert({
          initiator: initiatorId,
          receiver: receiverId,
          comment: comment,
        })
        .select()
        .single();

      if (matchError) throw matchError;

      // Create conversation after match
      const { data: conversation, error: convError } = await supabase
        .from("conversations")
        .insert({
          party_1: initiatorId,
          party_2: receiverId,
          match_id: match.id, // Reference to the match
        })
        .select()
        .single();

      if (convError) throw convError;

      return { match, conversation };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["matches"] });
      queryClient.invalidateQueries({ queryKey: ["conversations"] });
    },
  });
}
