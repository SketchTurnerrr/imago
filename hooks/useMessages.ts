import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/client";
import { MessagesType } from "@/types";
import { useEffect } from "react";

export function useMessages(
  conversationId: string,
  initialMessages: MessagesType,
) {
  const queryClient = useQueryClient();

  const supabase = createClient();

  // Query for fetching messages
  const messagesQuery = useQuery({
    queryKey: ["messages", conversationId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("messages")
        .select(
          `id, 
      content, 
      created_at, 
      sender_id:profiles!messages_sender_id_fkey(
        id, 
        name, 
        photos(url)
      ), 
      conversation_id:conversations!messages_conversation_id_fkey(
        id,
        match_id,
        party_1:profiles!conversations_party_1_fkey(id, name),
        party_2:profiles!conversations_party_2_fkey(id, name)
      )
    `,
        )
        .eq("conversation_id", conversationId)
        .returns<MessagesType>();

      if (error) throw error;
      return data;
    },
    // Initialize with server-fetched data
    initialData: [...initialMessages], // You'll pass the SSR data here
  });

  // Mutation for sending messages
  const sendMessage = useMutation({
    mutationFn: async ({
      content,
      senderId,
    }: {
      content: string;
      senderId: string;
    }) => {
      const { data, error } = await supabase
        .from("messages")
        .insert({
          content,
          sender_id: senderId,
          conversation_id: conversationId,
        })
        .select()
        .single();

      // update last message of the conversation
      if (data) {
        const { error: lastMsgError } = await supabase
          .from("conversations")
          .update({ last_message: data?.id })
          .eq("id", data?.conversation_id);

        if (lastMsgError) throw lastMsgError;
      }

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      // Invalidate and refetch messages
      queryClient.invalidateQueries({ queryKey: ["messages", conversationId] });
      // Optionally invalidate conversations to update last_message
      queryClient.invalidateQueries({ queryKey: ["conversations"] });
    },
  });

  useEffect(() => {
    const channel = supabase
      .channel(`messages:${conversationId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
          filter: `conversation_id=eq.${conversationId}`,
        },
        (payload) => {
          queryClient.invalidateQueries({
            queryKey: ["messages", conversationId],
          });
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [conversationId, queryClient]);

  return {
    messages: messagesQuery.data,
    isLoading: messagesQuery.isLoading,
    error: messagesQuery.error,
    sendMessage,
  };
}
