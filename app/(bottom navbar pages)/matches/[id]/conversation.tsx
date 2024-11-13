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
import { Verse } from "@/components/verse";
import TextareaAutosize from "react-textarea-autosize";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { uk } from "date-fns/locale";
import { createClient } from "@/lib/supabase/client";

import { GoBackBtn } from "@/components/go-back-btn";
import { Send } from "lucide-react";
import { useMessages } from "@/hooks/useMessages";
import { Profile } from "@/components/random-profile-feed";
import { MessagesType } from "@/types";

const FormSchema = z.object({
  message: z
    .string()
    .min(1, { message: "Це не схоже на повідомлення" })
    .max(140, {
      message: "Максимум 140 символів",
    }),
});

interface ConversationProps {
  messages: MessagesType;
  userId: string;
  conversationId: string;
}

export function Conversation({
  conversationId,
  messages: initialMessages,
  userId,
}: ConversationProps) {
  const { messages, isLoading, sendMessage } = useMessages(
    conversationId,
    initialMessages,
  );

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      message: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      await sendMessage.mutateAsync({
        content: data.message,
        senderId: userId,
      });
    } catch (error) {
      console.error("Failed to send message:", error);
    }

    form.resetField("message");
  }

  const conversation = messages[0]?.conversation_id;
  console.log("conversation :", conversation);
  const otherUser = conversation
    ? userId === conversation.party_1.id
      ? conversation.party_2
      : conversation.party_1
    : null;

  console.log("otherUser :", otherUser);
  return (
    <div className="flex h-[100svh] flex-col ">
      <header className="flex w-full items-center justify-between gap-3 self-start bg-background p-3">
        <GoBackBtn />
        <h1 className="mr-auto text-3xl font-bold capitalize">
          {otherUser?.name}
        </h1>
        <ThreeDotsMenu
          conversationId={conversationId}
          matchId={conversation?.match_id}
        />
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

              {messages.map((msg, index) => {
                const isCurrentUser = msg.sender_id?.id === userId;
                const showAvatar =
                  index === 0 ||
                  messages[index - 1].sender_id !== msg.sender_id;

                return (
                  <div
                    key={msg.id}
                    className={`flex ${isCurrentUser ? "justify-end" : "justify-start"}`}
                  >
                    {!isCurrentUser && showAvatar ? (
                      <div className="mr-2 flex-shrink-0">
                        <Image
                          src={
                            otherUser
                              ? msg.sender_id?.photos[0]?.url!
                              : "/default-avatar.png"
                          }
                          alt={otherUser?.name || "User"}
                          width={36}
                          height={36}
                          className="aspect-square rounded-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-[40px]"></div>
                    )}
                    <div
                      className={`max-w-xs rounded-lg p-3  ${
                        isCurrentUser ? "bg-primary text-white " : "bg-accent "
                      }`}
                    >
                      <p className="text-lg">{msg.content}</p>
                      <span
                        className={cn(
                          "mt-1 block text-sm ",
                          isCurrentUser ? "text-slate-300" : "text-slate-500",
                        )}
                      >
                        {format(msg.created_at, "p", {
                          locale: uk,
                        })}
                      </span>
                    </div>
                  </div>
                );
              })}

              <div ref={messagesEndRef} role="none" />
            </div>
          </TabsContent>
          <TabsContent value="profile" className="mt-5">
            {otherUser && (
              <Profile
                type="chat"
                currentUserId={userId}
                senderId={otherUser.id}
              />
            )}
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
