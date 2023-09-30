'use client';
import { differenceInYears, parse, format, parseISO } from 'date-fns';
import Image from 'next/image';
import Link from 'next/link';
import { SignOut } from '@/components/signout-btn';
import { LikeBtn } from '@/components/like-btn';
import { HomeIcon } from '@radix-ui/react-icons';
import { useState } from 'react';
import { SkipProfileBtn } from './skip-profile-btn';

interface PageProps {
  profile: FullProfile;
}

export function Discover({ profile }: PageProps) {
  console.log('profile client discover page:', profile);
  const dob = format(parseISO(String(profile.date_of_birth)), 'yyyy/MM/dd');
  const date = parse(dob, 'yyyy/MM/dd', new Date());

  const age = differenceInYears(new Date(), date);

  const { question: question0, answer: answer0, id: id0 } = profile?.prompts[0];
  const { question: question1, answer: answer1, id: id1 } = profile?.prompts[1];
  const { question: question2, answer: answer2, id: id2 } = profile?.prompts[2];

  const prompt = (question: string, answer: string, id: string) => {
    return (
      <div className='px-4 py-10 bg-white relative rounded-lg space-y-4'>
        <p className='text-md font-semibold'>{question}</p>
        <h2 className='text-4xl font-bold'>{answer}</h2>
        <LikeBtn profileId={id} />
      </div>
    );
  };

  return (
    <main className='bg-slate-100 flex gap-4 flex-col px-4 pt-20 pb-4'>
      <h1 className='text-4xl font-bold mb-4 ml-4'>{profile?.first_name}</h1>
      <div className='relative w-fit'>
        <Image
          priority
          src={
            //@ts-ignore
            profile?.photos?.photo1 ||
            'https://beasnruicmydtdgqozev.supabase.co/storage/v1/object/public/photos/5b16fe18-c7dc-46e6-82d1-04c5900504e4/jEudzBHSsYg.jpg'
          }
          height={400}
          width={400}
          alt='me'
          className='rounded-lg '
        />
        <LikeBtn profileId='242' />
      </div>

      {prompt(question0, answer0, id0)}

      {/*       
      ----- INFO 
      */}

      <div className='px-4 py-10 font-bold bg-white relative rounded-lg'>
        <div className='flex items-center gap-6 mb-6'>
          <div className='flex items-center gap-3'>
            <Image src='/cake.svg' width={22} height={22} alt='cake icon' />
            {age}
          </div>
          <div className='flex items-center gap-3'>
            <Image src='/cross.svg' width={28} height={28} alt='cake icon' />
            {profile.denomination}
          </div>
          <div className='flex items-center gap-3'>
            <Image
              src='/map-pin.svg'
              width={24}
              height={24}
              alt='map pin icon'
            />
            Київ
          </div>
        </div>
        <div className='flex items-center gap-4'>
          <HomeIcon className='w-6 h-6' />
          {/* @ts-ignore */}
          {profile?.location?.toponym}
        </div>
      </div>

      {/*       
      ----- PHOTO1
      */}

      <div className='relative w-fit'>
        <Image
          priority
          src={
            //@ts-ignore
            profile?.photos?.photo2 ||
            'https://beasnruicmydtdgqozev.supabase.co/storage/v1/object/public/photos/5b16fe18-c7dc-46e6-82d1-04c5900504e4/jEudzBHSsYg.jpg'
          }
          height={400}
          width={400}
          alt='me'
          className='rounded-lg'
        />
        <LikeBtn profileId='242' />
      </div>

      {/*       
      ----- PHOTO2
      */}

      <div className='relative w-fit'>
        <Image
          priority
          src={
            //@ts-ignore
            profile?.photos?.photo3 ||
            'https://beasnruicmydtdgqozev.supabase.co/storage/v1/object/public/photos/5b16fe18-c7dc-46e6-82d1-04c5900504e4/jEudzBHSsYg.jpg'
          }
          height={400}
          width={400}
          alt='me'
          className='rounded-lg'
        />
        <LikeBtn profileId='242' />
      </div>

      {prompt(question1, answer1, id1)}

      {/*       
      ----- PHOTO3
      */}
      <div className='relative w-fit'>
        <Image
          priority
          src={
            //@ts-ignore
            profile?.photos?.photo4 ||
            'https://beasnruicmydtdgqozev.supabase.co/storage/v1/object/public/photos/5b16fe18-c7dc-46e6-82d1-04c5900504e4/jEudzBHSsYg.jpg'
          }
          height={400}
          width={400}
          alt='me'
          className='rounded-lg'
        />
        <LikeBtn profileId='242' />
      </div>

      {prompt(question2, answer2, id2)}

      {/*       
      ----- PHOTO4
      */}
      <div className='relative w-fit'>
        <Image
          priority
          src={
            //@ts-ignore
            profile?.photos?.photo5 ||
            'https://beasnruicmydtdgqozev.supabase.co/storage/v1/object/public/photos/5b16fe18-c7dc-46e6-82d1-04c5900504e4/jEudzBHSsYg.jpg'
          }
          height={400}
          width={400}
          alt='me'
          className='rounded-lg'
        />
        <LikeBtn profileId='242' />
      </div>

      {/*       
      ----- PHOTO5
      */}

      <div className='relative w-fit'>
        <Image
          priority
          src={
            //@ts-ignore
            profile?.photos?.photo6 ||
            'https://beasnruicmydtdgqozev.supabase.co/storage/v1/object/public/photos/5b16fe18-c7dc-46e6-82d1-04c5900504e4/jEudzBHSsYg.jpg'
          }
          height={400}
          width={400}
          alt='me'
          className='rounded-lg'
        />
        <LikeBtn profileId='242' />
      </div>
      {/* <SkipProfileBtn profileId={profile.id} /> */}
      {/* <SignOut /> */}
    </main>
  );
}
