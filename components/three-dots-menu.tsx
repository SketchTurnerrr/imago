'use client';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import { AlertDialogDots } from './alert-dialog';
import { useState } from 'react';

interface ITDM {
  participantId: string;
  conversationId: string;
}

export function ThreeDotsMenu({ participantId, conversationId }: ITDM) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <DotsHorizontalIcon className='w-6 h-6' />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Переглянути профіль</DropdownMenuLabel>
        <DropdownMenuSeparator />

        <AlertDialogDots
          conversationId={conversationId}
          participantId={participantId}
          triggerName='Залишити розмову'
          alertDescription='Ця дія незворотна'
          alertTitle='Ви впевнені?'
        />

        <DropdownMenuItem className='text-red-600'>
          Заблокувати та повідомити
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
