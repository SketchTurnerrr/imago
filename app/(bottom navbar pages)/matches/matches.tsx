"use client";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import Link from "next/link";

interface IMatches {
  conversations: IConversations[];
  userId: string;
}

export function Matches({ conversations, userId }: IMatches) {
  return (
    <>
      <h1 className="self-start p-4 text-4xl font-bold">Знайомства</h1>
      <Separator />
      {conversations.length === 0 && (
        <div className="flex flex-col items-center gap-3 p-4">
          <div>
            <Image
              className="mx-auto"
              src="/keanu.jpg"
              width={200}
              height={200}
              alt="Sad Keanu"
            />
            <p className="text-md font-semibold text-gray-500">
              Тут будуть ваші знайомства
            </p>
          </div>
        </div>
      )}
      {conversations.map((conversation) => (
        <div key={conversation.id} className="flex flex-col p-4 ">
          <Link
            href={`/matches/${conversation.id}`}
            className="flex items-center gap-4"
          >
            {conversation.participant2.id === userId ? (
              <Image
                className="aspect-square rounded-full object-cover"
                src={conversation.participant1.photos[0].src}
                width={75}
                height={75}
                alt="me"
              />
            ) : (
              <Image
                className="aspect-square rounded-full object-cover"
                src={conversation.participant2.photos[0].src}
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
                {conversation.last_message?.content ??
                  "Почни знайомство першим"}
              </p>
            </div>
          </Link>
        </div>
      ))}
    </>
  );
}
