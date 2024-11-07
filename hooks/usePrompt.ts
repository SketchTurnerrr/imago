import { createClient } from "@/lib/supabase/client";
import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

const supabase = createClient();

export function useGetPrompts(userId: string) {
  return useQuery({
    queryKey: ["prompts"],
    queryFn: async () => {
      const { data } = await supabase
        .from("prompts")
        .select("*")
        .eq("profile_id", userId);

      return data;
    },
  });
}

export function useCreatePrompt() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      userId,
      question,
      answer,
    }: {
      userId: string;
      question: string;
      answer: string;
    }) => {
      await supabase.from("prompts").insert({
        answer: answer,
        question: question,
        profile_id: userId,
      });
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["prompts"] });
    },
  });
}

export function useEditPrompt({ id }: { id: string }) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["profile", id],
    mutationFn: async ({
      question,
      answer,
      promptId,
    }: {
      question: string;
      answer: string;
      promptId: string;
    }) => {
      const { error } = await supabase
        .from("prompts")
        .update({
          answer: answer,
          question: question,
        })
        .eq("id", promptId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["profile", id],
      });
    },

    onError: (error) => {
      console.error("Mutation failed:", error); // Debug log
    },
  });
}
