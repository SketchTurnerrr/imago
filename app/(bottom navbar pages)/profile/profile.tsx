'use client';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  GearIcon,
  MixerHorizontalIcon,
  Pencil2Icon,
} from '@radix-ui/react-icons';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import Image from 'next/image';
import Link from 'next/link';

export function ProfilePage({ profile }: { profile: ProfileWithPhotos }) {
  async function signOut() {
    const supabase = createClientComponentClient();
    await supabase.auth.signOut();
  }
  return (
    <div className='h-screen p-4 flex flex-col mb-20 pt-20'>
      <Image
        priority
        src={profile?.photos[0].src}
        alt={'photo'}
        width={190}
        height={190}
        className='rounded-full self-center object-cover aspect-square mb-6'
      />
      <h1 className='text-4xl font-bold self-center'>{profile?.first_name}</h1>
      <Separator className='my-4' />
      <Link className='font-bold text-xl' href={'/profile/edit'}>
        <div className='flex items-center justify-between'>
          Редагувати профіль
          <Pencil2Icon className='w-7 h-7' />
        </div>
      </Link>

      <Separator className='my-4' />
      <Link className='font-bold text-xl' href={'/profile/preferences'}>
        <div className='flex items-center justify-between'>
          Уподобання
          <MixerHorizontalIcon className='w-7 h-7' />
        </div>
      </Link>
      <Separator className='my-4' />
      <Link className='font-bold text-xl' href={'/profile/settings'}>
        <div className='flex items-center justify-between'>
          Налаштування
          <GearIcon className='w-7 h-7' />
        </div>
      </Link>
      <Button
        className='w-fit self-end mt-6 font-bold'
        onClick={() => signOut()}
      >
        Вийти
      </Button>
    </div>
  );
}
