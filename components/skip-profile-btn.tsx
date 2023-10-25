'use client';
import { ArrowRightIcon, Cross1Icon } from '@radix-ui/react-icons';
import { Button } from './ui/button';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';

export function SkipProfileBtn({
  userId,
  profileId,
  skipProfile,
}: {
  userId: string;
  profileId: string;
  skipProfile: () => void;
}) {
  const router = useRouter();
  const btnRef = useRef(null);
  const pathname = usePathname();

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
    //   .eq('id', userId);
    skipProfile();

    router.refresh();
  };

  return (
    <div
      className='m-0 z-30 h-0 md:self-start left-4 sticky top-[83%] '
      ref={btnRef}
    >
      <Button
        onClick={handleSkip}
        size='icon'
        className='rounded-full w-12 h-12 bg-primary'
      >
        {pathname.match('discover') ? (
          <ArrowRightIcon className='w-7 h-7 text-white' />
        ) : (
          <Cross1Icon className='w-7 h-7 text-white' />
        )}
      </Button>
    </div>
  );
}
