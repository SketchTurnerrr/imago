'use client';
import { differenceInYears, parse, format, parseISO } from 'date-fns';
import Image from 'next/image';
import Link from 'next/link';
import { SignOut } from '@/components/signout-btn';
import { HomeIcon } from '@radix-ui/react-icons';
import Cross from '@/public/cross.svg';
import { useLayoutEffect, useRef } from 'react';
import gsap, { Power2 } from 'gsap';
import { SkipProfileBtn } from '@/components/skip-profile-btn';
import { Prompt } from '@/components/prompt';
import { LikeDialog } from '@/components/like-dialog';
import { usePathname } from 'next/navigation';
import { MatchDialog } from '@/components/match-btn';

interface IProfile {
  profile: FullProfile;
  authedProfile?: {
    gender: string;
    skipped_profiles: string[];
    onboarded: boolean;
  };
  userId: string;
  likeData?: PhotoLike | PromptLike | undefined;
}

export function Profile({
  profile,
  userId,
  authedProfile,
  likeData,
}: IProfile) {
  const profileRef = useRef(null);

  const pathname = usePathname();

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
    id: promptId0,
  } = profile?.prompts[0] || '';
  const {
    question: question1,
    answer: answer1,
    id: promptId1,
  } = profile?.prompts[1] || '';
  const {
    question: question2,
    answer: answer2,
    id: promptId2,
  } = profile?.prompts[2] || '';

  const { src: src0, id: photoId0 } = profile?.photos[0] || '';
  const { src: src1, id: photoId1 } = profile?.photos[1] || '';
  const { src: src2, id: photoId2 } = profile?.photos[2] || '';
  const { src: src3, id: photoId3 } = profile?.photos[3] || '';
  const { src: src4, id: photoId4 } = profile?.photos[4] || '';
  const { src: src5, id: photoId5 } = profile?.photos[5] || '';

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
          {pathname === '/discover' && (
            <LikeDialog
              itemId={id}
              type='photo'
              liker={userId}
              likee={profile.id}
              src={src}
              firstName={profile.first_name}
              question={null}
              answer={null}
            />
          )}
        </div>
      );
    }
  };

  console.log('userId :', userId);
  console.log('profile.id :', profile.id);
  const prompt = (question: string, answer: string, id: string) => {
    if (!question) {
      return null;
    } else {
      return (
        <Prompt
          liker={userId}
          likee={profile.id}
          question={question}
          answer={answer}
          id={id}
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
      className='flex space-y-4  min-h-screen opacity-0 flex-col px-4 pb-4'
    >
      <SkipProfileBtn
        userId={userId}
        profileID={profile.id}
        skippedProfiles={authedProfile?.skipped_profiles || []}
      />
      {pathname.split('/')[1] === 'likes' && (
        <MatchDialog
          likee={profile.id}
          liker={userId}
          src={profile.photos[0].src}
          firstName={profile.first_name}
          likeData={likeData}
        />
      )}
      <h1 className='text-4xl font-bold mb-4 ml-4'>{profile?.first_name}</h1>

      {photo(src0, photoId0)}

      {prompt(question0, answer0, promptId0)}

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
            <Cross />
            {profile.denomination}
          </div>
          <div className='flex items-center gap-3'>
            <Image
              src='/map-pin.svg'
              width={24}
              height={24}
              alt='map pin icon'
            />
            {profile.location.toponym}
          </div>
        </div>
        {/* <div className='flex items-center gap-4'>
          <HomeIcon className='w-6 h-6' />
        
          {profile?.location?.toponym}
        </div> */}
      </div>

      {/*       
      ----- PHOTO1
      */}

      {
        // @ts-ignore
        photo(src1, photoId1)
      }

      {/*       
      ----- PHOTO2
      */}

      {
        // @ts-ignore
        photo(src2, photoId2)
      }

      {prompt(question1, answer1, promptId1)}

      {/*       
      ----- PHOTO3
      */}

      {
        // @ts-ignore
        photo(src3, photoId3)
      }

      {prompt(question2, answer2, promptId2)}

      {/*       
      ----- PHOTO4
      */}

      {
        // @ts-ignore
        photo(src4, photoId4)
      }
      {/*       
      ----- PHOTO5
      */}

      {
        // @ts-ignore
        photo(src5, photoId5)
      }
      {/* <SkipProfileBtn profileId={profile.id} /> */}
      {/* <SignOut /> */}
    </main>
  );
}
