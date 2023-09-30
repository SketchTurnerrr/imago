'use client';
import { User } from '@supabase/supabase-js';
import Image from 'next/image';

import { useRouter } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { AddPromptDialog } from './add-prompt-dialog';
interface PageProps {
  user: User;
  data: FullProfile;
  onboarding: boolean;
}

export function EditProfilePage({ user, data, onboarding }: PageProps) {
  const router = useRouter();
  const supabase = createClientComponentClient<Database>();
  const handleDelete = async (id: string) => {
    await supabase.from('prompts').delete().eq('id', id);
    router.refresh();
  };

  return (
    <div className='px-4 bg-slate-50 h-screen'>
      <h1 className='text-2xl font-bold mb-4'>Фрази</h1>
      <div className='flex flex-col gap-4'>
        {Array.isArray(data?.prompts) &&
          data?.prompts?.map((prompt) => {
            return (
              <div
                key={prompt.id}
                className='flex relative flex-col  p-4 rounded-lg font-bold  text-sm shadow-sm border border-slate-100'
              >
                <p>{prompt.question}</p>
                <p className='border-l border-gray-300 mt-2 pl-2 text-gray-500'>
                  {prompt.answer}
                </p>
                <div
                  onClick={() => handleDelete(prompt.id)}
                  role='button'
                  className='absolute -top-1 -right-1 rounded-full bg-white p-1 shadow-md'
                >
                  <Image
                    src='/x.svg'
                    width={14}
                    height={14}
                    alt='close icon'
                    className=''
                  />
                </div>
              </div>
            );
          })}

        {Array.isArray(data?.prompts) && data?.prompts.length !== 3 && (
          <AddPromptDialog user={user} />
        )}
      </div>
    </div>
  );
}
