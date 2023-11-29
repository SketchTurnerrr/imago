"use client";
import { Separator } from "@/components/ui/separator";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface IMatches {
  conversations: IConversations[];
  userId: string;
}

export function Matches({ userId, conversations }: IMatches) {
  const supabase = createClientComponentClient<Database>();
  const [rtConversations, setRTConversations] =
    useState<IConversations[]>(conversations);

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
          if (payload.eventType === "UPDATE") return;

          if (payload.eventType === "INSERT") {
            let { data: newConversation, error } = await supabase
              .from("conversations")
              .select(
                "*, participant1(id, photos(src), first_name), participant2(id, photos(src), first_name), last_message(content)",
              )
              .returns<IConversations[]>();
            if (error) {
              console.log("error :", error);
            } else {
              setRTConversations(newConversation as IConversations[]);
            }
          }
          if (payload.eventType === "DELETE") {
            setRTConversations((prev) =>
              prev.filter((conversation) => {
                console.log("payload old id :", payload.old.id);
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
          className="flex flex-col p-4 md:mx-auto md:w-[500px]"
        >
          <Link
            href={`/matches/${conversation?.id}`}
            className="flex items-center gap-4"
          >
            {conversation?.participant2?.id === userId ? (
              <Image
                className="aspect-square rounded-full object-cover"
                src={conversation?.participant1.photos[0]?.src}
                width={75}
                height={75}
                alt="me"
              />
            ) : (
              <Image
                className="aspect-square rounded-full object-cover"
                src={conversation?.participant2.photos[0]?.src}
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
        </div>
      ))}
    </>
  );
}
