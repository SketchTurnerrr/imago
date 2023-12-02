"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { AlertDialogDots } from "./alert-dialog";

interface ITDM {
  conversationId: string;
}

export function ThreeDotsMenu({ conversationId }: ITDM) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <DotsHorizontalIcon className="h-6 w-6" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
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
