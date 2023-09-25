'use client';

import Image from 'next/image';
import Link from 'next/link';
import { SignOut } from './signout-btn';

interface PageProps {
  profile: ProfileType;
}

export function Discover({ profile }: PageProps) {
  console.log('profile :', profile);
  return (
    <main className='flex flex-col px-4 pt-20'>
      <h1 className='text-4xl font-bold mb-4 ml-4'>{profile?.first_name}</h1>
      <Image
        priority
        //@ts-ignore
        src={
          profile?.photos?.main ||
          'https://beasnruicmydtdgqozev.supabase.co/storage/v1/object/public/photos/5b16fe18-c7dc-46e6-82d1-04c5900504e4/jEudzBHSsYg.jpg'
        }
        height={400}
        width={400}
        alt='me'
        className='rounded-lg'
      />
      <SignOut />
    </main>
  );
}
