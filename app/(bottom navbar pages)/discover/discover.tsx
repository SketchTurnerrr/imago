'use client';
import { differenceInYears, parse, format, parseISO } from 'date-fns';
import Image from 'next/image';
import Link from 'next/link';
import { SignOut } from '@/components/signout-btn';
import { LikeBtn } from '@/components/like-btn';
import { HomeIcon } from '@radix-ui/react-icons';
import { useLayoutEffect, useRef } from 'react';
import gsap, { Power2 } from 'gsap';
import { SkipProfileBtn } from '@/components/skip-profile-btn';
import { Prompt } from '@/components/prompt';

interface PageProps {
  profile: FullProfile;
  authedProfile: {
    gender: string;
    skipped_profiles: string[];
    onboarded: boolean;
  };
  userID: string;
}

export function Discover({ profile, userID, authedProfile }: PageProps) {
  const profileRef = useRef(null);

  console.log('profile photos:', profile);
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        profileRef.current,
        {
          y: '20%',
          autoAlpha: 0,
          duration: 1,
          ease: Power2.easeInOut,
        },
        {
          autoAlpha: 1,
          y: 0,
        }
      );
    }, profileRef);

    return () => ctx.revert();
  }, []);

  const dob = format(parseISO(String(profile?.date_of_birth)), 'yyyy/MM/dd');
  const date = parse(dob, 'yyyy/MM/dd', new Date());
  const age = differenceInYears(new Date(), date);

  const {
    question: question0,
    answer: answer0,
    id: id0,
  } = profile?.prompts[0] || '124124';
  const {
    question: question1,
    answer: answer1,
    id: id1,
  } = profile?.prompts[1] || '';
  const {
    question: question2,
    answer: answer2,
    id: id2,
  } = profile?.prompts[2] || '';

  const photo = (src: string | null, id: string) => {
    if (!src) {
      return null;
    } else {
      return (
        <div className='relative w-fit'>
          <Image
            priority
            src={
              src ||
              'https://beasnruicmydtdgqozev.supabase.co/storage/v1/object/public/photos/5b16fe18-c7dc-46e6-82d1-04c5900504e4/jEudzBHSsYg.jpg'
            }
            height={400}
            width={400}
            alt='me'
            className='rounded-lg '
          />
          <LikeBtn itemId={id} type='photo' liker={userID} likee={profile.id} />
        </div>
      );
    }
  };

  const prompt = (question: string, answer: string, id: string) => {
    if (!question) {
      return null;
    } else {
      return (
        <Prompt
          liker={userID}
          likee={profile.id}
          question={question}
          answer={answer}
          id={id}
          discover={true}
        />
      );
    }
  };

  if (!profile) {
    return <div>no profiles left</div>;
  }

  return (
    <main
      ref={profileRef}
      className='flex gap-4 pt-5 min-h-screen opacity-0 flex-col px-4 pb-4'
    >
      <SkipProfileBtn
        userID={userID}
        profileID={profile.id}
        skippedProfiles={authedProfile.skipped_profiles || []}
      />
      <h1 className='text-4xl font-bold mb-4 ml-4'>{profile?.first_name}</h1>

      {
        // @ts-ignore
        photo(profile.photos[0]?.src)
      }

      {prompt(question0, answer0, id0)}

      {/*       
      ----- INFO 
      */}

      <div className='px-4 py-10 bg-purple-50 font-bold  relative rounded-lg'>
        <div className='flex items-center gap-6 mb-6'>
          <div className='flex items-center gap-3'>
            <Image src='/cake.svg' width={22} height={22} alt='cake icon' />
            {age || '17'}
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

      {
        // @ts-ignore
        photo(profile.photos[1]?.src)
      }

      {/*       
      ----- PHOTO2
      */}

      {
        // @ts-ignore
        photo(profile.photos[2]?.src)
      }

      {prompt(question1, answer1, id1)}

      {/*       
      ----- PHOTO3
      */}

      {
        // @ts-ignore
        photo(profile.photos[3]?.src)
      }

      {prompt(question2, answer2, id2)}

      {/*       
      ----- PHOTO4
      */}

      {
        // @ts-ignore
        photo(profile.photos[4]?.src)
      }
      {/*       
      ----- PHOTO5
      */}

      {
        // @ts-ignore
        photo(profile.photos[5]?.src)
      }
      {/* <SkipProfileBtn profileId={profile.id} /> */}
      {/* <SignOut /> */}
    </main>
  );
}
