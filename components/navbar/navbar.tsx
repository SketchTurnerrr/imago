'use client';

import { HeartIcon } from '@radix-ui/react-icons';
import Image from 'next/image';
import Link from 'next/link';
import Compass from '@/public/compass.svg';
import Heart from '@/public/heart.svg';
import Message from '@/public/message.svg';
import { SkipProfileBtn } from '../skip-profile-btn';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import { usePathname } from 'next/navigation';

export function Navbar({
  userID,
  photo,
}: {
  userID: string;
  photo: { src: string }[];
}) {
  const pathname = usePathname();
  const navbarRef = useRef(null);

  gsap.registerPlugin(ScrollTrigger);
  useEffect(() => {
    const showNav = gsap
      .fromTo(
        navbarRef.current,
        {
          height: 0,
          opacity: 0,
        },
        {
          opacity: 1,
          height: '4rem',
          duration: 0.3,
        }
      )
      .progress(1);

    ScrollTrigger.create({
      start: 'top top',
      end: 'max',
      onUpdate: (self) => {
        self.direction === -1 ? showNav.play() : showNav.reverse();
      },
    });
  }, []);

  const items = [
    {
      url: '/',
      icon: Compass,
    },
    {
      url: '/likes',
      icon: Heart,
    },
    {
      url: '/chats',
      icon: Message,
    },
  ];

  const links = items.map((item) => (
    <Link className='text-gray-300' key={item.url} href={item.url}>
      <item.icon />
    </Link>
  ));

  return (
    <>
      <div
        ref={navbarRef}
        className='fixed items-center  left-0 h-16 bg-slate-950 z-10 right-0 bottom-0 w-screen'
      >
        <div className='absolute flex w-full h-full justify-around items-center'>
          {links}
          <Link href={'/profile'}>
            <Image
              priority
              className={`${'rounded-full'} `}
              src={
                photo[0]?.src ||
                'https://beasnruicmydtdgqozev.supabase.co/storage/v1/object/public/photos/5b16fe18-c7dc-46e6-82d1-04c5900504e4/jEudzBHSsYg.jpg'
              }
              width={24}
              height={24}
              alt='icon'
            />
          </Link>
        </div>
      </div>
    </>
  );
}
