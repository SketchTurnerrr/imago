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
import { IConversationReadStatus } from "@/app/global";
import { usePathname, useRouter } from "next/navigation";

interface INavbar {
  photo:
    | {
        src: string;
      }[]
    | undefined;
  status: IConversationReadStatus;
  userId: string;
}

export function Navbar({ photo, status, userId }: INavbar) {
  const router = useRouter();
  const [rtStatus, setRTStatus] = useState(status);
  const supabase = createClientComponentClient<Database>();
  const pathname = usePathname();

  const items = [
    {
      url: "/",
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
        (payload) => {
          const newStatus = {
            participant1: payload.new.participant1 as string,
            participant2: payload.new.participant2 as string,
            party1_read: payload.new.party1_read as boolean,
            party2_read: payload.new.party2_read as boolean,
          };
          setRTStatus(newStatus);
        },
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase]);

  const party =
    rtStatus?.participant1 !== userId
      ? rtStatus?.party2_read
      : rtStatus?.party1_read;

  const links = items.map((item) => (
    <Link className=" relative text-gray-300" key={item.url} href={item.url}>
      {rtStatus && !party && item.url === "/matches" && (
        <div className="unread-count before:content-[attr(data-unread)]"></div>
      )}
      <item.icon />
    </Link>
  ));

  if (pathname.split("/")[1] === "matches" && pathname.split("/").length === 3)
    return null;

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
