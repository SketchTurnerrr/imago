"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { AlertDialogDots } from "./alert-dialog";
import { useState } from "react";
import Link from "next/link";

interface ITDM {
  viewProfileId: string;
  conversationId: string;
}

export function ThreeDotsMenu({ viewProfileId, conversationId }: ITDM) {
  console.log("viewProfileId :", viewProfileId);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <DotsHorizontalIcon className="h-6 w-6" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {/* <DropdownMenuLabel>
          <Link href={`profile/${viewProfileId}`}>Переглянути профіль</Link>
        </DropdownMenuLabel>
        <DropdownMenuSeparator /> */}

        <AlertDialogDots
          conversationId={conversationId}
          triggerName="Залишити розмову"
          alertDescription="Ця дія незворотна"
          alertTitle="Ви впевнені?"
        />

        <DropdownMenuItem className="text-red-600">
          Заблокувати та повідомити
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
