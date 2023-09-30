'use client';
import { Cross1Icon } from '@radix-ui/react-icons';
import { Button } from './ui/button';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';

export function SkipProfileBtn({
  userID,
  profileID,
  skippedProfiles,
}: {
  userID: string;
  profileID: string;
  skippedProfiles: string[];
}) {
  const router = useRouter();
  const btnRef = useRef(null);

  gsap.registerPlugin(ScrollTrigger);
  useEffect(() => {
    const showBtn = gsap
      .fromTo(
        btnRef.current,
        {
          top: '92%',
        },
        {
          top: '83%',
          duration: 0.3,
        }
      )
      .progress(1);

    ScrollTrigger.create({
      start: 'top top',
      end: 'max',
      onUpdate: (self) => {
        self.direction === -1 ? showBtn.play() : showBtn.reverse();
      },
    });
  }, []);

  const handleSkip = async () => {
    const supabase = createClientComponentClient<Database>();

    // await supabase
    //   .from('profiles')
    //   .update({
    //     skipped_profiles: [...skippedProfiles, profileID],
    //   })
    //   .eq('id', userID);

    router.refresh();
  };

  return (
    <div className='z-30 h-0 left-4 sticky top-[83%] ' ref={btnRef}>
      <Button
        onClick={handleSkip}
        variant='outline'
        size='icon'
        className='rounded-full w-12 h-12 bg-white'
      >
        <Cross1Icon className='w-6 h-6' />
      </Button>
    </div>
  );
}
