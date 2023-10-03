'use client';

import { Prompt } from '@/components/prompt';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import Image from 'next/image';

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
      {/* IF EMPTY PAGE */}
      {photoLikes.length === 0 && promptLikes.length === 0 && (
        <>
          <h1 className='text-3xl font-bold'>Вподобали вас</h1>

          <a
            target='_blank'
            rel='noopener noreferrer'
            className='self-center'
            href={
              'https://www.behance.net/gallery/176439917/02-Our-little-heart?tracking_source=search_projects|heart+illustration'
            }
          >
            <Image
              src='/likes_you.png'
              width={300}
              height={300}
              alt='https://www.behance.net/gallery/176439917/02-Our-little-heart?tracking_source=search_projects|heart+illustration'
            />
          </a>
          <p className='self-center'>
            <span className='font-bold'>Поки що</span>, немає вподобань
          </p>
        </>
      )}

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
              {item.comment
                ? item.comment
                : item.liker.gender === 'male'
                ? 'Вподобав' + ' ваше фото'
                : 'Вподобала' + ' ваше фото'}

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
              likee=''
              liker=''
              question={item.prompt.question}
              answer={item.prompt.answer}
              discover={false}
              id={item.prompt.id}
            />
            <div className='absolute p-2 rounded-lg bg-indigo-200 -bottom-2 left-0'>
              {item.comment
                ? item.comment
                : item.liker.gender === 'male'
                ? 'Вподобав' + ' вашу відповідь'
                : 'Вподобала' + ' вашу відповідь'}

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
