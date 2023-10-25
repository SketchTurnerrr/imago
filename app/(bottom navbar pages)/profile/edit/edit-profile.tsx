'use client';
import { User } from '@supabase/supabase-js';
import Image from 'next/image';

import { useRouter } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { AddPromptDialog } from './add-prompt-dialog';
import { PhotoGrid } from '../../../../components/photo-grid/photo-grid';
interface PageProps {
  user: User;
  data: FullProfile;
  onboarding: boolean;
}

export function EditProfilePage({ user, data, onboarding }: PageProps) {
  console.log('data profile edit:', data);
  const router = useRouter();
  const supabase = createClientComponentClient<Database>();
  const handleDelete = async (id: string) => {
    await supabase.from('prompts').delete().eq('id', id);
    router.refresh();
  };

  return (
    <div className='px-4  h-screen'>
      <h2 className='text-2xl max-w-md mx-auto font-bold mb-4'>Фото</h2>
      <PhotoGrid photos={data.photos || []} user={user} />
      <div className='flex flex-col gap-4 max-w-md mx-auto'>
        <h2 className='text-2xl font-bold mt-10'>Фрази</h2>
        {data.prompts &&
          data.prompts?.map((prompt) => {
            return (
              <div
                key={prompt.id}
                className='flex relative flex-col p-4 rounded-lg font-bold  text-sm shadow-sm border '
              >
                <p>{prompt.question}</p>
                <p className='border-l border-muted mt-2 pl-2 text-muted-foreground'>
                  {prompt.answer}
                </p>
                <div
                  onClick={() => handleDelete(prompt.id)}
                  role='button'
                  className='absolute -top-1 -right-1 rounded-full bg-white p-1 shadow-md'
                >
                  <Image src='/x.svg' width={14} height={14} alt='close icon' />
                </div>
              </div>
            );
          })}

        {data.prompts && data?.prompts.length !== 3 && (
          <AddPromptDialog user={user} />
        )}
      </div>
    </div>
  );
}
