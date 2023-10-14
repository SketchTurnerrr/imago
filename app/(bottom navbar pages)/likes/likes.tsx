'use client';

import { Prompt } from '@/components/prompt';
import { Separator } from '@/components/ui/separator';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import Image from 'next/image';
import Link from 'next/link';

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
      <h1 className='text-4xl self-start font-bold'>Вподобали вас</h1>
      <Separator />
      {photoLikes.length === 0 && promptLikes.length === 0 && (
        <>
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

      <div className='grid grid-cols-2 gap-4 md:grid-cols-3 lg:max-w-2xl lg:mx-auto'>
        {photoLikes?.map((item) => (
          <div key={item.id} className='mb-8'>
            <div className='relative '>
              <div className='w-fit p-2 rounded-bl-none text-sm rounded-lg bg-indigo-200'>
                {item.comment
                  ? item.comment
                  : item.liker.gender === 'male'
                  ? 'Вподобав' + ' ваше фото'
                  : 'Вподобала' + ' ваше фото'}
              </div>
            </div>
            <Link href={`/likes/${item.liker.id}?l=${item.id}:ph`}>
              <h1 className='text-4xl font-bold mb-4'>
                {item.liker.first_name}
              </h1>
              <Image
                src={item.liker.photos[0].src}
                width={800}
                height={800}
                alt={'person'}
                className='rounded-lg aspect-square object-cover'
              />
            </Link>
          </div>
        ))}

        {promptLikes?.map((item) => (
          <div key={item.id} className='mb-8'>
            <div className='relative '>
              <div className='w-fit p-2 rounded-bl-none rounded-lg text-[13px] text-white bg-purple-300'>
                {item.liker.gender === 'male' ? 'Вподобав ' : 'Вподобала '}
                вашу відповідь
              </div>
            </div>
            <Link href={`/likes/${item.liker.id}?l=${item.id}:p`}>
              <h1 className='text-4xl font-bold mb-4'>
                {item.liker.first_name}
              </h1>
              <Image
                src={item.liker.photos[0].src}
                width={800}
                height={800}
                alt={item.liker.first_name}
                className='rounded-lg aspect-square object-cover'
              />
            </Link>
          </div>
        ))}
      </div>
    </main>
  );
}
