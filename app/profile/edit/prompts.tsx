'use client';

import { Input } from '@/components/ui/input';

import Image from 'next/image';

import {
  User,
  createClientComponentClient,
} from '@supabase/auth-helpers-nextjs';
import { AddPromptDialog } from './add-prompt-dialog';

interface PageProps {
  user: User;
  data: ProfileWithPrompts | null;
  onboarding?: boolean;
}

export function PromptsDialog({ user, data, onboarding = false }: PageProps) {
  return (
    <>
      {/* {Array.isArray(data?.prompts) && data?.prompts.length !== 3 && (
        <AddPromptDialog user={user} />
      )}

      {onboarding && <AddPromptDialog user={user} />} */}
    </>
  );
}
