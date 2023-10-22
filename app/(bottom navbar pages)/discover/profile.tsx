'use client';
import { differenceInYears, parse, format, parseISO } from 'date-fns';
import Image from 'next/image';
import Cross from '@/public/cross.svg';
import Undo from '@/public/undo.svg';
import { useLayoutEffect, useRef, useState } from 'react';
import gsap, { Power2 } from 'gsap';
import { SkipProfileBtn } from '@/components/skip-profile-btn';
import { Prompt } from '@/components/prompt';
import { LikeDialog } from '@/components/like-dialog';
import { usePathname } from 'next/navigation';
import { MatchDialog } from '@/components/match-btn';
import { cn } from '@/lib/utils';
import { Filter } from '@/components/filter';
import { Button } from '@/components/ui/button';

interface IProfile {
  serverProfiles: FullProfile[];
  authedProfile?: {
    gender: string;
    skipped_profiles: string[];
    onboarded: boolean;
  };
  userId: string;
  likeData?: PhotoLike | PromptLike | undefined;
}

export function Profile({
  serverProfiles,
  userId,
  authedProfile,
  likeData,
}: IProfile) {
  const profileRef = useRef(null);
  const [profiles, setProfiles] = useState<FullProfile[]>(serverProfiles);
  const [skippedProfile, setSkippedProfile] = useState<FullProfile | null>(
    null
  );
  // console.log('skippedProfile :', skippedProfile);

  // console.log('profile :', profiles);
  // const currentSearchParams = useMemo<{ [key: string]: string }>(() => {
  //   const params: { [key: string]: string } = {};
  //   searchParams.forEach((value, key) => {
  //     params[key] = value;
  //   });
  //   return params;
  // }, [searchParams]);

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
  }, [profiles]);
  // console.log('serverProfiles :', profiles);

  // Function to skip a profile
  function skipProfile() {
    // Remove the last profile from the profiles array.
    const profilesCp = [...profiles];
    const profileToSkip = profilesCp.pop();
    setProfiles(profilesCp);
    if (profileToSkip) {
      setSkippedProfile(profileToSkip);
    }
  }

  function undoSkip() {
    if (skippedProfile) {
      setProfiles((prev) => [...prev, skippedProfile]);
      setSkippedProfile(null);
    }
  }
  const profile = profiles.at(-1)!;
  if (!profiles || !profile) {
    window.location.reload();
    return null;
  }
  const dob = format(parseISO(String(profile.date_of_birth)), 'yyyy/MM/dd');
  const date = parse(dob, 'yyyy/MM/dd', new Date());
  const age = differenceInYears(new Date(), date);

  const {
    question: question0,
    answer: answer0,
    id: promptId0,
  } = profile.prompts[0] || '';
  const {
    question: question1,
    answer: answer1,
    id: promptId1,
  } = profile.prompts[1] || '';
  const {
    question: question2,
    answer: answer2,
    id: promptId2,
  } = profile.prompts[2] || '';

  const { src: src0, id: photoId0 } = profile.photos[0] || '';
  const { src: src1, id: photoId1 } = profile.photos[1] || '';
  const { src: src2, id: photoId2 } = profile.photos[2] || '';
  const { src: src3, id: photoId3 } = profile.photos[3] || '';
  const { src: src4, id: photoId4 } = profile.photos[4] || '';
  const { src: src5, id: photoId5 } = profile.photos[5] || '';
  const photo = (src: string | null, id: string) => {
    if (!src) {
      return null;
    } else {
      return (
        <div className={'relative w-fit'}>
          <Image
            priority
            src={
              src ||
              'https://beasnruicmydtdgqozev.supabase.co/storage/v1/object/public/photos/5b16fe18-c7dc-46e6-82d1-04c5900504e4/jEudzBHSsYg.jpg'
            }
            height={500}
            width={500}
            alt='me'
            className='rounded-lg'
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

  // console.log('userId :', userId);
  // console.log('profile.id :', profile?.id);
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

  return (
    <main
      ref={profileRef}
      className='flex space-y-4 md:items-center min-h-screen opacity-0 flex-col p-4'
    >
      <div className='flex items-center md:w-[500px] justify-between'>
        <h1 className='text-4xl font-bold  md:self-start'>
          {profile.first_name}
        </h1>
        {pathname.split('/')[1] !== 'likes' && (
          <div className='flex items-center gap-2'>
            <Button variant='ghost' size='icon' onClick={() => undoSkip()}>
              <Undo />
            </Button>
            <Filter />
          </div>
        )}
      </div>
      <SkipProfileBtn
        userId={userId}
        profileId={profile.id}
        skipProfile={skipProfile}
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

      {photo(src0, photoId0)}

      {prompt(question0, answer0, promptId0)}

      {/*       
      ----- INFO 
      */}

      <div className='px-4 py-10 bg-purple-50 font-bold md:w-[500px] relative rounded-lg'>
        <div className='flex items-center gap-6 '>
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
            {profile.toponym}
          </div>
        </div>
      </div>

      {/*       
      ----- PHOTO1
      */}

      {photo(src1, photoId1)}

      {/*       
      ----- PHOTO2
      */}

      {photo(src2, photoId2)}

      {prompt(question1, answer1, promptId1)}

      {/*       
      ----- PHOTO3
      */}

      {photo(src3, photoId3)}

      {prompt(question2, answer2, promptId2)}

      {/*       
      ----- PHOTO4
      */}

      {photo(src4, photoId4)}
      {/*       
      ----- PHOTO5
      */}

      {photo(src5, photoId5)}
      <div className='pb-20'></div>
    </main>
  );
}
