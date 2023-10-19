'use client';
import { PhotoGrid } from '@/app/(bottom navbar pages)/profile/edit/photo-grid';
import { Button } from '@/components/ui/button';
import { useWindowHeight } from '@/hooks/useWindowHeight';
import { ChevronRightIcon } from '@radix-ui/react-icons';
import {
  createClientComponentClient,
  User,
} from '@supabase/auth-helpers-nextjs';
import Link from 'next/link';

interface PageProps {
  user: User;
  photos: PhotosType[] | null;
}

export default function Photos({ user, photos }: PageProps) {
  const supabase = createClientComponentClient<Database>();
  const windowHeight = useWindowHeight();

  const handlePhotos = async () => {
    await supabase
      .from('profiles')
      .update({
        onboarded: true,
      })
      .eq('id', user.id);
  };

  return (
    <div
      style={{ height: windowHeight }}
      className='p-4 h-screen flex flex-col justify-between'
    >
      <div className='flex flex-col gap-6'>
        <h1 className='text-5xl mt-20 font-bold '>Додайте фото</h1>
        <div>
          <PhotoGrid user={user} photos={photos ?? []} />
        </div>
        <div className='flex flex-col gap-1'>
          <p className='text-gray-400 font-semibold'>Додайте мінімум 3 фото.</p>
          <p className='text-sm font-semibold text-gray-400'>
            * Перше фото буде головним
          </p>
        </div>
      </div>

      <Link
        data-disabled={photos && photos?.length < 3}
        className='data-[disabled=true]:pointer-events-none self-end'
        href={'/'}
      >
        <Button
          disabled={photos!! && photos?.length < 3}
          onClick={handlePhotos}
          size='icon'
          className='rounded-full  bg-purple-400'
        >
          <ChevronRightIcon className='h-6 w-6' />
        </Button>
      </Link>
    </div>
  );
}
