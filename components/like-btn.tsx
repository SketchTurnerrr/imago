import { Cross1Icon, HeartIcon } from '@radix-ui/react-icons';
import { Button } from './ui/button';
import Image from 'next/image';

export function LikeBtn({ profileId }: { profileId: string }) {
  return (
    <Button
      variant='outline'
      size='icon'
      className='rounded-full w-12 h-12 bottom-2 absolute right-2 bg-white'
    >
      <Image
        src='/heart.svg'
        width={22}
        height={22}
        // style={{ fill: 'red' }}
        // className='fill-slate-400 text-red-400'
        className='stroke-purple-400'
        alt='heart icon'
      />
    </Button>
  );
}
