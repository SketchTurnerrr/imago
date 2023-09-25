'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ChevronRightIcon, PlusIcon } from '@radix-ui/react-icons';
import {
  createClientComponentClient,
  User,
} from '@supabase/auth-helpers-nextjs';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

export default function Photos({ user }: { user: User | undefined }) {
  const photo1 = useRef<HTMLInputElement>(null);
  const [photos, setPhotos] = useState('');
  const [uploading, setUploading] = useState(false);
  const supabase = createClientComponentClient<Database>();
  const router = useRouter();
  const handlePick = () => {
    photo1.current?.click();
  };

  const uploadPhoto: React.ChangeEventHandler<HTMLInputElement> = async (e) => {
    try {
      setUploading(true);

      if (!e.target.files || e.target.files.length === 0) {
        throw new Error('Please select a photo');
      }

      const file = e.target.files[0];
      const fileExt = file.name.split('.').pop();
      const filePath = `${user?.id}/${file.name}`;
      console.log('filePath :', filePath);

      await supabase.storage
        .from('photos')
        .upload(filePath, file)
        .then(async () => {
          const { data } = await supabase.storage
            .from('photos')
            .getPublicUrl(`${user?.id}/${file.name}`);
          setPhotos(data.publicUrl);
        });
    } catch (error) {
      console.log(error);
    } finally {
      setUploading(false);
    }
  };

  const handlePhotos = async () => {
    if (user) {
      await supabase
        .from('profiles')
        .update({
          photos: {
            main: photos,
          },
          onboarded: 'true',
        })
        .eq('id', user.id);
    }

    router.push('/');
  };

  console.log(' photos:', photos);

  return (
    <div className='px-4 pt-20 pb-4 h-screen  flex flex-col justify-between'>
      <h1 className='text-5xl font-bold mb-4'>Додайте фото</h1>
      <div className='flex flex-wrap gap-4 mx-auto items-center'>
        {photos ? (
          <Image
            src={
              photos ||
              'https://beasnruicmydtdgqozev.supabase.co/storage/v1/object/public/photos/bc097182-0aab-4462-8908-39371f10ad29/craig-mckay-jmURdhtm7Ng-unsplash.jpg'
            }
            className='h-[100px] object-cover rounded-[20px]'
            width={100}
            height={100}
            alt='person'
          />
        ) : (
          <div
            onClick={handlePick}
            className=' bg-slate-100 w-[100px] h-[100px] flex justify-center items-center border-purple-300 styledInput'
          >
            <Input
              ref={photo1}
              onChange={uploadPhoto}
              disabled={uploading}
              type='file'
              accept='image/*'
              className='opacity-0 h-0 w-0 leading-[0] overflow-hidden p-0 m-0'
            />
            <PlusIcon className='w-6 h-6 font-bold text-purple-400' />
          </div>
        )}
      </div>
      <Button
        onClick={handlePhotos}
        size='icon'
        className='rounded-full self-end  bg-purple-400'
      >
        <ChevronRightIcon className='h-4 w-4' />
      </Button>
    </div>
  );
}
