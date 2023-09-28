'use client';
import { Separator } from '@/components/ui/separator';
import {
  GearIcon,
  MixerHorizontalIcon,
  Pencil2Icon,
} from '@radix-ui/react-icons';
import Image from 'next/image';
import Link from 'next/link';

interface PageProps {
  data: ProfileType;
}

export function ProfilePage({ data }: PageProps) {
  return (
    <div className='h-screen p-4 flex flex-col  pt-20'>
      <Image
        //@ts-ignore
        src={data.photos?.photo1}
        alt={'photo'}
        width={190}
        height={190}
        className='rounded-full self-center object-cover aspect-square mb-6'
      />
      <h1 className='text-4xl font-bold self-center'>{data?.first_name}</h1>
      <Separator className='my-4' />
      <div className='flex items-center justify-between'>
        <Link className='font-bold text-xl' href={'/profile/edit'}>
          Редагувати профіль
        </Link>
        <Pencil2Icon className='w-7 h-7' />
      </div>

      <Separator className='my-4' />
      <div className='flex items-center justify-between'>
        <Link className='font-bold text-xl' href={'/profile/preferences'}>
          Уподобання
        </Link>
        <MixerHorizontalIcon className='w-7 h-7' />
      </div>
      <Separator className='my-4' />
      <div className='flex items-center justify-between'>
        <Link className='font-bold text-xl' href={'/profile/settings'}>
          Налаштування
        </Link>
        <GearIcon className='w-7 h-7' />
      </div>
    </div>
  );
}
