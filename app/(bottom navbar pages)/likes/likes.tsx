'use client';

import { Prompt } from '@/components/prompt';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import Image from 'next/image';
import { Key } from 'react';

interface PageProps {
  data: any;
}

export function Likes({ data }: PageProps) {
  const supabase = createClientComponentClient<Database>();

  console.log(' data:', data || []);

  const photoLikes = data.filter(
    (like: { photo: string | null }) => like.photo !== null
  );

  const promptLikes = data.filter(
    (like: { prompts: string[] | null }) => like.prompts !== null
  );

  console.log('promptLikes :', promptLikes);
  console.log('photoLikes :', photoLikes);

  //   console.log(
  //     'photo :',
  //     `https://beasnruicmydtdgqozev.supabase.co/storage/v1/object/public/photos/${data.likee}/${data.photo}`
  //   );
  return (
    <main className='gap-4 flex flex-col min-h-screen p-4'>
      {photoLikes?.map(
        (item: {
          id: Key;
          likee: string;
          photo: string;
          liker: {
            first_name: string;
            gender: string;
            photos: { main_photo: string | StaticImport }[];
          };
        }) => (
          <div key={item.id} className='mb-8'>
            <div className='relative mb-4'>
              <Image
                src={`https://beasnruicmydtdgqozev.supabase.co/storage/v1/object/public/photos/${item.likee}/${item.photo}`}
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
              <h1 className='text-4xl font-bold mb-4'>
                {item.liker.first_name}
              </h1>
              <Image
                src={item.liker.photos[0].main_photo}
                width={400}
                height={100}
                alt={'person'}
                className='rounded-lg'
              />
            </div>
          </div>
        )
      )}

      {promptLikes?.map(
        (item: {
          id: Key;
          prompts: { question: string; answer: string; id: string | undefined };
          liker: {
            gender: string;
            photos: { main_photo: string | StaticImport }[];
            first_name: string;
          };
        }) => (
          <div key={item.id} className='mb-8'>
            <div className='relative mb-4'>
              <Prompt
                question={item.prompts.question}
                answer={item.prompts.answer}
                discover={false}
                id={item.prompts.id}
              />
              <div className='absolute p-2 rounded-lg bg-indigo-200 -bottom-2 left-0'>
                {item.liker.gender === 'male' ? 'Вподобав' : 'Вподобала'} вашу
                відповідь
                <span className='h-[0.6rem] w-[0.6rem] absolute -bottom-[4px] -left-[3px] _clip-path rotate-[207deg] bg-inherit'></span>
              </div>
            </div>
            <div className='a'>
              <h1 className='text-4xl font-bold mb-4'>
                {item.liker.first_name}
              </h1>
              <Image
                src={item.liker.photos[0].main_photo}
                width={400}
                height={100}
                alt={item.liker.first_name}
                className='rounded-lg'
              />
            </div>
          </div>
        )
      )}
    </main>
  );
}
