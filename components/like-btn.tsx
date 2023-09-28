import { Cross1Icon, HeartIcon } from '@radix-ui/react-icons';
import { Button } from './ui/button';
import Image from 'next/image';
import Heart from '@/public/heart.svg';

export function LikeBtn({ profileId }: { profileId: string }) {
  return (
    <Button
      variant='outline'
      size='icon'
      className='rounded-full text-purple-400 w-12 h-12 bottom-2 absolute right-2 bg-white'
    >
      <Heart width={24} height={24} />
    </Button>
  );
}
