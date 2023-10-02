'use client';

import { Prompt } from '@/components/prompt';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import Image from 'next/image';
import { Key } from 'react';

interface PageProps {
  photoLikes: PhotoLike[];
  promptLikes: PromptLike[];
}

export function Likes({ photoLikes, promptLikes }: PageProps) {
  // const supabase = createClientComponentClient<Database>();

  console.log('promptLikes :', promptLikes);
  console.log('photoLikes :', photoLikes);

  return (
    <main className='gap-4 flex flex-col min-h-screen p-4'>
      {photoLikes?.map((item) => (
        <div key={item.id} className='mb-8'>
          <div className='relative mb-4'>
            <Image
              src={item.photo.src}
              width={400}
              height={100}
              alt={item.liker.first_name}
              className='rounded-lg aspect-[24/9] object-cover'
            />
            <div className='absolute p-2 rounded-lg bg-indigo-200 -bottom-2 left-0'>
              {item.liker.gender === 'male' ? 'Вподобав' : 'Вподобала'} ваше
              фото
              <span className='h-[0.6rem] w-[0.6rem] absolute -bottom-[4px] -left-[3px] _clip-path rotate-[207deg] bg-inherit'></span>
            </div>
          </div>
          <div className='a'>
            <h1 className='text-4xl font-bold mb-4'>{item.liker.first_name}</h1>
            <Image
              src={item.liker.photos[0].src}
              width={400}
              height={100}
              alt={'person'}
              className='rounded-lg'
            />
          </div>
        </div>
      ))}

      {promptLikes?.map((item) => (
        <div key={item.id} className='mb-8'>
          <div className='relative mb-4'>
            <Prompt
              question={item.prompt.question}
              answer={item.prompt.answer}
              discover={false}
              id={item.prompt.id}
            />
            <div className='absolute p-2 rounded-lg bg-indigo-200 -bottom-2 left-0'>
              {item.liker.gender === 'male' ? 'Вподобав' : 'Вподобала'} вашу
              відповідь
              <span className='h-[0.6rem] w-[0.6rem] absolute -bottom-[4px] -left-[3px] _clip-path rotate-[207deg] bg-inherit'></span>
            </div>
          </div>
          <div className='a'>
            <h1 className='text-4xl font-bold mb-4'>{item.liker.first_name}</h1>
            <Image
              src={item.liker.photos[0].src}
              width={400}
              height={100}
              alt={item.liker.first_name}
              className='rounded-lg'
            />
          </div>
        </div>
      ))}
    </main>
  );
}
