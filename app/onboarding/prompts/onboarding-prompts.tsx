'use client';
import { AddPromptDialog } from '@/app/(bottom navbar pages)/profile/edit/add-prompt-dialog';
import { Button } from '@/components/ui/button';
import { ChevronRightIcon } from '@radix-ui/react-icons';
import {
  createClientComponentClient,
  User,
} from '@supabase/auth-helpers-nextjs';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

type PageProps = {
  user: User;
  data: FullProfile;
};

export default function OnboardingPrompts({ user, data }: PageProps) {
  const router = useRouter();
  const supabase = createClientComponentClient<Database>();
  const handleDelete = async (id: string) => {
    await supabase.from('prompts').delete().eq('id', id);
    router.refresh();
  };

  const [height, setHeight] = useState<number>();
  useEffect(() => {
    if (window) {
      const windowSize = window?.innerHeight;
      const h = windowSize;
      setHeight(h);
    }
  }, []);
  return (
    <div
      style={{ height: height }}
      className='h-screen p-4 flex flex-col justify-between'
    >
      <div className='flex flex-col gap-4'>
        <h1 className='text-5xl mt-20 font-bold mb-4'>Додайте три фрази</h1>
        {data?.prompts?.map((prompt) => {
          return (
            <div
              key={prompt.id}
              className='flex relative flex-col p-4 rounded-lg font-bold  text-sm shadow-sm border border-slate-100'
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
        {data.prompts.length < 3 && <AddPromptDialog user={user} />}
        <p className='text-gray-400 text-sm font-semibold'>
          Додайте мінімум 3 фрази.
        </p>
      </div>
      <Button
        size='icon'
        onClick={() => router.push('/onboarding/photos')}
        className='bg-purple-400 self-end rounded-full'
        disabled={data.prompts.length !== 3}
      >
        <ChevronRightIcon className='w-7 h-7' />
      </Button>
    </div>
  );
}
