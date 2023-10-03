import Image from 'next/image';
import CloseIcon from '@/public/x.svg';
import { PlusIcon, ReloadIcon, UploadIcon } from '@radix-ui/react-icons';
import { Input } from '@/components/ui/input';
import { Key, useRef, useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import { toast } from '@/components/ui/use-toast';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';

interface PageProps {
  photos: PhotosType[];
}

export function PhotoGrid({ photos, user }: any) {
  const inputRef = useRef<any>(null);
  console.log('inputRef :', inputRef);
  const [fileName, setFilename] = useState('');
  const [selectedPlaceholder, setSelectedPlaceholder] = useState<number | null>(
    null
  );
  const [uploading, setUploading] = useState(false);
  const supabase = createClientComponentClient<Database>();
  const router = useRouter();
  const filledPhotos = photos.concat(
    Array.from({ length: Math.max(6 - photos.length, 0) })
  );

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from('photos').delete().eq('id', id);
    const { data, error: storageError } = await supabase.storage
      .from('photos')
      .remove([`${user.id}/${fileName}`]);
    router.refresh();
  };

  const handlePlaceholderClick = (placeholderId: number) => {
    inputRef.current?.click();
    setSelectedPlaceholder(placeholderId);
  };
  console.log('placeholderId :', selectedPlaceholder);

  const uploadPhoto: React.ChangeEventHandler<HTMLInputElement> = async (e) => {
    try {
      setUploading(true);
      if (!e.target.files || e.target.files.length === 0) {
        throw new Error('Please select a photo');
      }
      const file = e.target.files[0];
      setFilename(file.name);
      const fileExt = file.name.split('.').pop();
      const filePath = `${user?.id}/${file.name}`;
      await supabase.storage
        .from('photos')
        .upload(filePath, file)
        .then(async () => {
          const { data } = await supabase.storage
            .from('photos')
            .getPublicUrl(`${user?.id}/${file.name}`);
          const { error } = await supabase.from('photos').insert({
            profile_id: user.id,
            src: data.publicUrl,
          });

          if (
            error?.message ===
            'duplicate key value violates unique constraint "photos_src_key"'
          ) {
            toast({
              variant: 'destructive',
              title: 'Йой, щось пішло те так',
              description: 'Ви вже завантажили це фото',
            });
          }
          console.log('photo creation error:', error);
        });
    } catch (error) {
      console.log(error);
    } finally {
      setUploading(false);
      setSelectedPlaceholder(null);
      router.refresh();
    }
  };

  return (
    <div className='grid grid-cols-3 gap-2 max-w-md mb-4'>
      {filledPhotos.map((photo: { src: string; id: string }, index: number) => (
        <>
          {photo?.src ? (
            <div key={photo.id} className='relative'>
              <Image
                className='object-cover aspect-square rounded-lg'
                src={photo?.src}
                alt='person'
                width={800}
                height={800}
              />
              <div
                onClick={() => handleDelete(photo.id)}
                role='button'
                className='absolute -top-1 -right-1 rounded-full bg-white p-1 shadow-md'
              >
                <Image src='/x.svg' width={14} height={14} alt='close icon' />
              </div>
            </div>
          ) : (
            <div
              key={index}
              onClick={() => handlePlaceholderClick(index)}
              className='h-full w-full flex justify-center items-center'
            >
              <Input
                ref={inputRef}
                onChange={uploadPhoto}
                disabled={uploading}
                type='file'
                accept='image/*'
                className='pointer-events-none opacity-0 h-0 w-0 leading-[0] overflow-hidden p-0 m-0'
              />
              {uploading && selectedPlaceholder === index ? (
                <ReloadIcon className='text-purple-300 h-6 w-6 animate-spin' />
              ) : (
                <div className='relative flex items-center justify-center'>
                  <Image
                    className='border-2 border-dashed rounded-lg border-orange-300'
                    src='/placeholder.png'
                    width={150}
                    height={150}
                    alt='placeholder'
                  />
                  <UploadIcon className='w-10 h-10 absolute text-white' />
                </div>
              )}
            </div>
          )}
        </>
      ))}
    </div>
  );
}
