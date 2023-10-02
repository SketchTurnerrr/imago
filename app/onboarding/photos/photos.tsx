'use client';

import { PhotoGrid } from '@/app/(bottom navbar pages)/profile/edit/photo-grid';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ChevronRightIcon, PlusIcon } from '@radix-ui/react-icons';
import {
  createClientComponentClient,
  User,
} from '@supabase/auth-helpers-nextjs';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

interface PageProps {
  user: User;
  photos: PhotosType[];
}

export default function Photos({ user, photos }: PageProps) {
  console.log('photos client:', photos);
  const supabase = createClientComponentClient<Database>();
  const router = useRouter();

  const handlePhotos = async () => {
    await supabase
      .from('profiles')
      .update({
        onboarded: true,
      })
      .eq('id', user.id);
  };

  return (
    <div className='px-4 pt-20 pb-4 h-screen  flex flex-col justify-between'>
      <div className='flex flex-col gap-6'>
        <h1 className='text-5xl font-bold mb-4'>Додайте фото</h1>
        <PhotoGrid user={user} photos={photos} />
        <p className='text-gray-400 font-semibold'>Додайте мінімум 6 фото</p>
      </div>
      {/* <div className='flex flex-wrap gap-4 mx-auto items-center'>
        {photos ? (
          <Image
            src={
              photos ||
              'https://beasnruicmydtdgqozev.supabase.co/storage/v1/object/public/photos/bc097182-0aab-4462-8908-39371f10ad29/craig-mckay-jmURdhtm7Ng-unsplash.jpg'
            }
            className='h-[100px] object-cover rounded-[20px]'
            width={100}
            height={100}
            alt='person'
          />
        ) : (
          <div
            onClick={handlePick}
            className=' bg-slate-100 w-[100px] h-[100px] flex justify-center items-center border-purple-300 styledInput'
          >
            <Input
              ref={photo1}
              onChange={uploadPhoto}
              disabled={uploading}
              type='file'
              accept='image/*'
              className='opacity-0 h-0 w-0 leading-[0] overflow-hidden p-0 m-0'
            />
            <PlusIcon className='w-6 h-6 font-bold text-purple-400' />
          </div>
        )}
      </div> */}
      <Link className='self-end' href={'/'}>
        <Button
          asChild
          onClick={handlePhotos}
          size='icon'
          className='rounded-full bg-purple-400'
        >
          <ChevronRightIcon className='h-4 w-4' />
        </Button>
      </Link>
    </div>
  );
}
