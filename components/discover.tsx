'use client';
import { differenceInYears, parse, format, parseISO } from 'date-fns';
import Image from 'next/image';
import Link from 'next/link';
import { SignOut } from './signout-btn';
import { SkipProfileBtn } from './skip-profile-btn';
import { LikeBtn } from './like-btn';
import { HomeIcon } from '@radix-ui/react-icons';

interface PageProps {
  profile: ProfileType;
}

export function Discover({ profile }: PageProps) {
  // console.log('profile :', profile);
  const dob = format(parseISO(String(profile.date_of_birth)), 'yyyy/MM/dd');
  const date = parse(dob, 'yyyy/MM/dd', new Date());

  const age = differenceInYears(new Date(), date);

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

      <div className='px-4 py-10 bg-white relative rounded-lg space-y-4'>
        <p className='text-lg'>I get along with people who</p>
        <h2 className='text-3xl font-bold'>Like to dance</h2>
        <LikeBtn profileId='ad' />
      </div>

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
          {profile?.location?.toponym}
        </div>
      </div>

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
      <div className='px-4 py-10 bg-white relative rounded-lg space-y-4'>
        <p className='text-lg'>My favorite verse in the bible</p>
        <h2 className='text-3xl font-bold'>I Corinthians 13:13</h2>
        <LikeBtn profileId='ad' />
      </div>

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
      <div className='px-4 py-10 bg-white relative rounded-lg space-y-4'>
        <p className='text-lg'>Lorem ipsum dolor sit amet.</p>
        <h2 className='text-3xl font-bold'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </h2>
        <LikeBtn profileId='ad' />
      </div>
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
      <SkipProfileBtn profileId={profile.id} />
      {/* <SignOut /> */}
    </main>
  );
}
