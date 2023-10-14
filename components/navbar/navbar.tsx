'use client';
import Image from 'next/image';
import Link from 'next/link';
import Compass from '@/public/compass.svg';
import Heart from '@/public/heart.svg';
import Message from '@/public/message.svg';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { IConversationReadStatus } from '@/app/global';
import { useRouter } from 'next/navigation';

interface INavbar {
  photo: {
    src: string;
  }[];
  status: IConversationReadStatus;
  userId: string;
}

export function Navbar({ photo, status, userId }: INavbar) {
  const router = useRouter();
  const [rtStatus, setRTStatus] = useState(status);
  const navbarRef = useRef(null);
  const supabase = createClientComponentClient<Database>();

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
      url: '/matches',
      icon: Message,
    },
  ];

  useEffect(() => {
    const channel = supabase
      .channel('unread-messages')
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'conversations',
        },
        (payload) => {
          const newStatus = {
            participant1: payload.new.participant1 as string,
            participant2: payload.new.participant2 as string,
            party1_read: payload.new.party1_read as boolean,
            party2_read: payload.new.party2_read as boolean,
          };
          setRTStatus(newStatus);
        }
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const party =
    rtStatus.participant1 !== userId
      ? rtStatus.party2_read
      : rtStatus.party1_read;

  const links = items.map((item) => (
    <Link className=' text-gray-300 relative' key={item.url} href={item.url}>
      {!party && item.url === '/matches' && (
        <div className='unread-count before:content-[attr(data-unread)]'></div>
      )}
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
              className={'object-cover aspect-square rounded-full'}
              src={
                photo[0]?.src ||
                'https://beasnruicmydtdgqozev.supabase.co/storage/v1/object/public/photos/5b16fe18-c7dc-46e6-82d1-04c5900504e4/jEudzBHSsYg.jpg'
              }
              width={30}
              height={30}
              alt='icon'
            />
          </Link>
        </div>
      </div>
    </>
  );
}
