'use client';

import { HeartIcon } from '@radix-ui/react-icons';
import Image from 'next/image';
import Link from 'next/link';
import Compass from '@/public/compass.svg';
import Heart from '@/public/heart.svg';
import Message from '@/public/message.svg';

export function Navbar() {
  const items = [
    {
      url: '/',
      icon: Compass,
    },
    {
      url: 'likes',
      icon: Heart,
    },
    {
      url: 'chats',
      icon: Message,
    },
    // {
    //   url: 'profile',
    //   icon: 'https://beasnruicmydtdgqozev.supabase.co/storage/v1/object/public/photos/5b16fe18-c7dc-46e6-82d1-04c5900504e4/jEudzBHSsYg.jpg',
    // },
  ];

  const links = items.map((item) => (
    <Link className='text-gray-300' key={item.url} href={item.url}>
      <item.icon />
    </Link>
  ));

  return (
    <div className='fixed items-center  left-0 h-16 bg-slate-950 z-10 right-0 bottom-0 w-screen'>
      <div className='absolute flex w-full h-full justify-around items-center'>
        {links}
        <Link href={'/profile'}>
          <Image
            className={`${'rounded-full'} `}
            src={
              'https://beasnruicmydtdgqozev.supabase.co/storage/v1/object/public/photos/5b16fe18-c7dc-46e6-82d1-04c5900504e4/jEudzBHSsYg.jpg'
            }
            width={24}
            height={24}
            alt='icon'
          />
        </Link>
      </div>
    </div>
  );
}
