"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useEffect, useRef, useState } from "react";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Image from "next/image";
import { ThreeDotsMenu } from "@/components/three-dots-menu";
import { TooltipTime } from "@/components/msg-time-tooltip";
import Send from "@/public/send.svg";
import { Verse } from "@/components/verse";
import TextareaAutosize from "react-textarea-autosize";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ReadOnlyProfile } from "@/components/read-only-profile";
import { GoBack } from "@/components/go-back";
import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";

const FormSchema = z.object({
  message: z
    .string()
    .min(1, { message: "Це не схоже на повідомлення" })
    .max(140, {
      message: "Максимум 140 символів",
    }),
});

interface IConversations {
  messages: IMessages[];
  userId: string;
  conversationId: string;
  participants: IParticipantsNames | null;
}

export function Conversation({
  messages,
  userId,
  conversationId,
  participants,
}: IConversations) {
  const supabase = createClient();
  const [rtMessages, setRTMessages] = useState(messages);
  const [readOnlyProfile, setReadOnlyProfile] = useState<FullProfile | null>(
    null,
  );
  const scrollToLastMsgRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    scrollToLastMsgRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [rtMessages]);

  useEffect(() => {
    async function markAsRead() {
      const lastMsg = rtMessages.at(-1)?.id;
      if (
        rtMessages.length > 0 &&
        participants?.last_read_message_id === lastMsg
      ) {
        await supabase
          .from("conversations")
          .update({
            last_read_message_id: lastMsg,
          })
          .eq("id", conversationId);
      }

      if (userId !== rtMessages.at(-1)?.sender_id.id) {
        await supabase
          .from("conversations")
          .update({
            has_unread_messages: false,
          })
          .eq("id", conversationId);
      }
    }

    markAsRead();
  }, [
    rtMessages,
    participants?.has_unread_messages,
    participants?.participant1.id,
    userId,
    supabase,
    conversationId,
    participants?.last_read_message_id,
  ]);

  useEffect(() => {
    const channel = supabase
      .channel("realtime-messages")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
          filter: `conversation_id=eq.${conversationId}`,
        },

        async (payload: any) => {
          let { data: newMessage, error } = await supabase
            .from("messages")
            .select(
              "*, conversation_id(participant1(id,first_name), participant2(first_name)),sender_id(id, first_name,photos(src))",
            )
            .eq("id", payload.new.id)
            .returns<IMessages[]>()
            .maybeSingle();

          if (error) {
            console.log("error :", error);
          }
          setRTMessages([...rtMessages, newMessage as IMessages]);
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [rtMessages, setRTMessages, conversationId, supabase]);

  useEffect(() => {
    async function getProfile() {
      try {
        if (participants) {
          const { data, error } = await supabase
            .from("profiles")
            .select(
              "date_of_birth, denomination, first_name, toponym, verified, prompts(question, answer), photos(src)",
            )
            .eq(
              "id",
              userId === participants.participant1.id
                ? participants.participant2.id
                : participants.participant1.id,
            )
            .returns<FullProfile>()
            .single();
          setReadOnlyProfile(data);
        }
      } catch (error) {
        console.log("error :", error);
      }
    }

    getProfile();
  }, [participants, supabase]);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      message: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    await supabase.from("messages").insert({
      content: data.message,
      conversation_id: conversationId,
      sender_id: userId,
    });

    // mark conversation as unread
    await supabase
      .from("conversations")
      .update({
        has_unread_messages: true,
      })
      .eq("id", conversationId);

    form.resetField("message");
  }

  if (!participants) return;

  return (
    <div className="flex h-[100svh] flex-col ">
      <header className="flex w-full items-center justify-between gap-3 self-start bg-background p-3">
        <GoBack />
        <h1 className="mr-auto text-3xl font-bold capitalize">
          {participants?.participant1.id !== userId
            ? participants?.participant1.first_name
            : participants?.participant2.first_name}
        </h1>
        <ThreeDotsMenu conversationId={conversationId} />
      </header>

      <div className=" w-full flex-auto overflow-auto md:mx-auto md:w-[700px]">
        <Tabs defaultValue="chat" className=" w-full">
          <TabsList className="fixed top-[59px] z-50 h-fit w-full justify-around rounded-none bg-background px-4 pb-0 pt-4 dark:bg-[#121212] md:mx-auto md:w-[700px] ">
            <TabsTrigger value="chat" className="text-lg">
              Чат
            </TabsTrigger>
            <TabsTrigger value="profile" className="text-lg">
              Профіль
            </TabsTrigger>
          </TabsList>
          <TabsContent value="chat" className="mt-0">
            <div className="flex flex-col gap-1 p-4">
              <Verse />

              {rtMessages.map((message, index) => {
                const showAvatar =
                  messages[index - 1]?.sender_id.id ===
                  messages[index]?.sender_id.id;
                const isCurrentUser = userId === message.sender_id.id;
                return (
                  <div
                    key={message.id}
                    className={cn("flex", {
                      "justify-end": isCurrentUser,
                    })}
                  >
                    {userId !== message.sender_id?.id ? (
                      <div className={"mt-2 flex items-center gap-2"}>
                        <div
                          className={cn("flex items-center gap-2", {
                            invisible: showAvatar,
                          })}
                        >
                          <Image
                            src={message.sender_id.photos[0].src || ""}
                            width={35}
                            height={35}
                            referrerPolicy="no-referrer"
                            className="aspect-square rounded-full object-cover"
                            alt={
                              message?.conversation_id.participant1.id ===
                              message?.sender_id.id
                                ? message.conversation_id.participant1
                                    .first_name
                                : message.conversation_id.participant2
                                    .first_name
                            }
                          />
                        </div>

                        <div className="flex max-w-[30ch] gap-2 rounded-lg rounded-bl-none bg-accent p-2 dark:bg-secondary ">
                          <p style={{ wordBreak: "break-word" }}>
                            {message.content}
                          </p>

                          <TooltipTime created_at={message.created_at} />
                        </div>
                      </div>
                    ) : (
                      <div className="flex max-w-[30ch] gap-2 rounded-lg rounded-br-none bg-purple-400 p-2 text-white">
                        <p style={{ wordBreak: "break-word" }}>
                          {message.content}
                        </p>
                        <TooltipTime
                          created_at={message.created_at}
                          side="right"
                        />
                      </div>
                    )}
                  </div>
                );
              })}
              <div ref={scrollToLastMsgRef} role="none"></div>
            </div>
          </TabsContent>
          <TabsContent value="profile" className="">
            <ReadOnlyProfile profile={readOnlyProfile} />
          </TabsContent>
        </Tabs>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex items-center gap-3 bg-background p-3 md:mx-auto md:w-[700px]"
        >
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem className="flex w-full">
                <FormControl>
                  <TextareaAutosize
                    minRows={1}
                    maxRows={4}
                    className="w-full resize-none rounded-lg border p-2"
                    placeholder="Повідомлення..."
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Button
            className="aspect-square rounded-full"
            size="icon"
            type="submit"
          >
            <Send className="-translate-x-[3px] rotate-45" />
          </Button>
        </form>
      </Form>
    </div>
  );
}
