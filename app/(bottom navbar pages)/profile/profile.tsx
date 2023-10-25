'use client';
import { ModeToggle } from '@/components/theme-changer';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  GearIcon,
  MixerHorizontalIcon,
  Pencil2Icon,
  SymbolIcon,
} from '@radix-ui/react-icons';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export function ProfilePage({ profile }: { profile: ProfileWithPhotos }) {
  const router = useRouter();
  async function signOut() {
    const supabase = createClientComponentClient();
    await supabase.auth.signOut();
    router.refresh();
  }

  return (
    <div className='h-screen p-4 flex flex-col mb-20 pt-20'>
      <Image
        priority
        src={profile.photos[0].src}
        alt={'photo'}
        width={190}
        height={190}
        className='rounded-full self-center object-cover aspect-square mb-6'
      />
      <h1 className='text-4xl font-bold self-center'>{profile.first_name}</h1>
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
      <Separator className='my-4' />
      <Link className='font-bold text-xl' href={'/profile/subscription'}>
        <div className='flex items-center justify-between'>
          Підписка
          <SymbolIcon className='w-7 h-7' />
        </div>
      </Link>
      <Separator className='my-4' />
      <div className='flex text-xl font-bold items-center justify-between'>
        Тема
        <ModeToggle />
      </div>
      <Separator className='my-4' />
      <Button
        className='w-fit self-end mt-6 bg-primary font-bold'
        onClick={() => signOut()}
      >
        Вийти
      </Button>
    </div>
  );
}
