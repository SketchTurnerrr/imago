"use client";

import Image from "next/image";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { uk } from "date-fns/locale";
import LoadingConversations from "./loading";
import { useRouter } from "next/navigation";
import { ConversationType, MatchesType } from "@/types";

interface MatchesProps {
  conversations: ConversationType;
  userId: string;
}

export function Matches({ conversations, userId }: MatchesProps) {
  return (
    <div className="container mx-auto p-4 md:max-w-xl">
      <h1 className="mb-4 text-4xl font-bold">Знайомства</h1>
      <div className="space-y-4 ">
        {conversations?.length === 0 && (
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

        {conversations.map((conversation) => {
          const otherUser =
            conversation.party_1.id === userId
              ? conversation.party_2
              : conversation.party_1;

          return (
            <Link
              key={conversation?.id}
              href={`/matches/${conversation?.id}`}
              className="block rounded-lg p-4 transition hover:bg-purple-50 dark:hover:bg-gray-800"
            >
              <div className="flex items-center space-x-4">
                <Image
                  src={otherUser?.photos?.[0]?.url || "/no-photo.png"}
                  alt={otherUser?.name || "Profile picture"}
                  width={50}
                  height={50}
                  className="aspect-square rounded-full object-cover"
                />

                <div className="grow">
                  <h2 className="font-semibold">{otherUser?.name}</h2>
                  <p className="truncate text-sm text-gray-500">
                    {conversation?.last_message?.content}
                  </p>
                </div>

                <span className="text-xs text-gray-400">
                  {conversation?.last_message?.created_at
                    ? formatDistanceToNow(
                        conversation?.last_message?.created_at,
                        {
                          addSuffix: true,
                          locale: uk,
                        },
                      )
                    : formatDistanceToNow(conversation?.created_at, {
                        addSuffix: true,
                        locale: uk,
                      })}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
