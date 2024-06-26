"use client";
import { ModeToggle } from "@/components/theme-changer";
import { Separator } from "@/components/ui/separator";
import { GearIcon, Pencil2Icon, SymbolIcon } from "@radix-ui/react-icons";
import BadgeIcon from "@/public/badge-check.svg";
import Image from "next/image";
import Link from "next/link";

import { HeartHandshake } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ProfileWithPhotos } from "@/types";

export function ProfilePage({ profile }: { profile: ProfileWithPhotos }) {
  return (
    <div className="mb-20 flex h-[100svh] flex-col p-4 pt-20 md:mx-auto md:w-[500px]">
      <Image
        priority
        src={profile.photos[0].src}
        alt={"photo"}
        width={190}
        height={190}
        className="mb-6 aspect-square self-center rounded-full object-cover"
      />
      <div className="flex items-center gap-3 self-center">
        <h1 className="text-4xl font-bold capitalize">{profile.first_name}</h1>

        {profile.verified && (
          <Popover>
            <PopoverTrigger>
              <BadgeIcon
                className="self-end text-white"
                width={32}
                height={32}
              />
            </PopoverTrigger>
            <PopoverContent className="w-fit border-none bg-secondary-foreground p-2 text-sm text-white dark:bg-secondary">
              <p>Верифікований акаунт</p>
            </PopoverContent>
          </Popover>
        )}
      </div>
      {/* <Separator className="my-4 md:hidden" /> */}
      <Link className="mt-8 text-xl font-bold" href={"/my-profile/edit"}>
        <div className="flex items-center justify-between">
          Редагувати профіль
          <Pencil2Icon className="h-7 w-7" />
        </div>
      </Link>

      {/* <Separator className="my-4" />
      <Link className="text-xl font-bold" href={"/my-profile/preferences"}>
        <div className="flex items-center justify-between">
          Уподобання
          <MixerHorizontalIcon className="h-7 w-7" />
        </div>
      </Link> */}
      <Separator className="my-4" />
      <Link className="text-xl font-bold" href={"/my-profile/account"}>
        <div className="flex items-center justify-between">
          Акаунт
          <GearIcon className="h-7 w-7" />
        </div>
      </Link>
      {/*
      <Separator className="my-4" />
       <Link className="text-xl font-bold" href={"/my-profile/subscription"}>
        <div className="flex items-center justify-between">
          Підписка
          <SymbolIcon className="h-7 w-7" />
        </div>
      </Link> */}
      <Separator className="my-4" />
      <Link className="text-xl font-bold" href={"/donate"}>
        <div className="flex items-center justify-between">
          Підтримати
          <HeartHandshake className="h-7 w-7" />
        </div>
      </Link>
      <Separator className="my-4" />
      <div className="flex items-center justify-between text-xl font-bold">
        Тема
        <ModeToggle />
      </div>
      <Separator className="my-4" />
    </div>
  );
}
