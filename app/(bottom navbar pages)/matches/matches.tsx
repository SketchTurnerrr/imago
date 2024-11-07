"use client";
import { Separator } from "@/components/ui/separator";
import { createClient } from "@/lib/supabase/client";
import { IConversation } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface IMatches {
  conversations: IConversation[];
  userId: string;
}

export function Matches({ userId, conversations }: IMatches) {
  const supabase = createClient();
  const [rtConversations, setRTConversations] =
    useState<IConversation[]>(conversations);
  // console.log("rtConversations :", rtConversations);

  useEffect(() => {
    const channel = supabase
      .channel("realtime-conversations")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "conversations",
        },

        async (payload) => {
          if (payload.eventType === "UPDATE") {
            let { data: newConversation, error } = await supabase
              .from("conversations")
              .select(
                "*, has_unread_messages, participant1(id, photos(src), first_name), participant2(id, photos(src), first_name), last_message(content,sender_id)",
              )
              .returns<IConversation[]>();
            if (error) {
              console.log("error :", error);
            } else {
              setRTConversations(newConversation as IConversation[]);
            }
          }

          if (payload.eventType === "INSERT") {
            let { data: newConversation, error } = await supabase
              .from("conversations")
              .select(
                "*, has_unread_messages, participant1(id, photos(src), first_name), participant2(id, photos(src), first_name), last_message(content,sender_id)",
              )
              .returns<IConversation[]>();
            if (error) {
              console.log("error :", error);
            } else {
              setRTConversations(newConversation as IConversation[]);
            }
          }
          if (payload.eventType === "DELETE") {
            setRTConversations((prev) =>
              prev.filter((conversation) => {
                return conversation.id !== payload.old.id;
              }),
            );
          }
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [rtConversations, setRTConversations, conversations, supabase]);

  return (
    <>
      <h1 className="self-start p-4 text-4xl font-bold md:mx-auto md:w-[500px]">
        Знайомства
      </h1>
      <Separator className="md:hidden" />
      {rtConversations?.length === 0 && (
        <div className="mt-16 flex flex-col items-center gap-3 p-4">
          <div>
            <Image
              className="mx-auto dark:bg-foreground"
              src="/no-matches.png"
              width={200}
              height={200}
              alt="Sad Keanu"
            />
            <p className="text-md mt-8 font-semibold text-gray-500">
              Тут будуть ваші знайомства
            </p>
          </div>
        </div>
      )}
      {rtConversations?.map((conversation) => (
        <div
          key={conversation.id}
          className="relative flex flex-col justify-center p-4 md:mx-auto md:w-[500px]"
        >
          <Link
            href={`/matches/${conversation?.id}`}
            className="flex items-center gap-4"
          >
            {conversation?.participant2?.id === userId ? (
              <Image
                className="aspect-square rounded-full object-cover"
                src={conversation?.participant1.photos[0]?.url}
                width={75}
                height={75}
                alt="me"
              />
            ) : (
              <Image
                className="aspect-square rounded-full object-cover"
                src={conversation?.participant2.photos[0]?.url}
                width={75}
                height={75}
                alt="me"
              />
            )}

            <div className="max-w-[33ch]">
              <p className="text-base font-bold capitalize">
                {conversation.participant2.id === userId
                  ? conversation.participant1.first_name
                  : conversation.participant2.first_name}
              </p>
              <p className="truncate text-gray-400">
                {conversation?.last_message?.content ??
                  "Почни знайомство першим"}
              </p>
            </div>
          </Link>
          {conversation && userId !== conversation.last_message.sender_id && (
            <div className="unread-count absolute right-10  before:content-[attr(data-unread)]"></div>
          )}
        </div>
      ))}
    </>
  );
}
