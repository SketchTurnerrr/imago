"use client";
import Image from "next/image";
import Link from "next/link";
import Compass from "@/public/compass.svg";
import ThumbsUp from "@/public/thumbs-up.svg";
import Message from "@/public/message.svg";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { IConversationReadStatus } from "@/app/global";

interface INavbar {
  photo:
    | {
        src: string;
      }[]
    | undefined;
  status: {
    has_unread_messages: boolean;
    last_message: { sender_id: string };
  }[];

  userId: string;
}

export function Navbar({ photo, status, userId }: INavbar) {
  const router = useRouter();
  const [rtStatus, setRTStatus] = useState(status);
  const supabase = createClientComponentClient<Database>();
  const pathname = usePathname();

  const items = [
    {
      url: "/discover",
      icon: Compass,
    },
    {
      url: "/likes",
      icon: ThumbsUp,
    },
    {
      url: "/matches",
      icon: Message,
    },
  ];

  useEffect(() => {
    const channel = supabase
      .channel("unread-messages")
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "conversations",
        },
        async (payload: any) => {
          const { data: newStatus } = await supabase
            .from("conversations")
            .select("has_unread_messages, last_message(sender_id, content)")
            .returns<IConversationReadStatus>();

          console.log("newStatus :", newStatus);
          setRTStatus([newStatus as IConversationReadStatus]);
        },
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase, rtStatus, status, userId]);

  const links = items.map((item) => {
    const active = pathname === item.url;
    const isUnread = rtStatus.filter(
      (status) =>
        status.last_message?.sender_id !== userId &&
        status.has_unread_messages === true,
    );
    return (
      <Link
        className={cn(
          active ? "text-purple-500" : "text-gray-300",
          "relative ",
        )}
        key={item.url}
        href={item.url}
      >
        {isUnread.length > 0 && item.url === "/matches" && (
          <div className="unread-count before:content-[attr(data-unread)]"></div>
        )}
        <item.icon />
      </Link>
    );
  });

  if (pathname.split("/")[1] === "matches" && pathname.split("/").length === 3)
    return null;

  if (pathname.split("/")[1] === "donate") return null;

  return (
    <>
      <div className="fixed bottom-0 top-auto z-10 h-16 w-full items-center bg-slate-950 md:bottom-auto md:top-0 md:h-full md:w-16">
        <div className="absolute flex h-full w-full items-center justify-around md:mt-10 md:flex-col md:justify-start md:gap-10">
          {links}
          <Link href={"/my-profile"}>
            <Image
              priority
              className={"aspect-square rounded-full object-cover"}
              src={
                photo
                  ? photo[0]?.src
                  : "https://beasnruicmydtdgqozev.supabase.co/storage/v1/object/public/photos/5b16fe18-c7dc-46e6-82d1-04c5900504e4/jEudzBHSsYg.jpg"
              }
              width={30}
              height={30}
              alt="icon"
            />
          </Link>
        </div>
      </div>
    </>
  );
}
