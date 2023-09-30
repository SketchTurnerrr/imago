'use client';
import { Cross1Icon, HeartIcon } from '@radix-ui/react-icons';
import { Button } from './ui/button';
import Image from 'next/image';
import Heart from '@/public/heart.svg';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export function LikeBtn({
  itemId,
  type,
  liker,
  likee,
}: {
  itemId: string | undefined;
  type: string;
  liker?: string;
  likee?: string;
}) {
  const handleLike = async () => {
    const supabase = createClientComponentClient<Database>();
    console.log('type :', type);
    console.log(' item id:', itemId);

    if (type === 'photo') {
      const { error } = await supabase.from('likes').insert({
        photo: itemId,
        liker: liker,
        likee: likee,
      });

      console.log(' like error:', error);
    } else {
      const { error } = await supabase.from('likes').insert({
        prompt_id: itemId,
        liker: liker,
        likee: likee,
      });
      console.log(' like error:', error);
    }
  };
  return (
    <Button
      onClick={handleLike}
      variant='outline'
      size='icon'
      className='rounded-full text-purple-400 w-12 h-12 bottom-2 absolute right-2 bg-white'
    >
      <Heart width={24} height={24} />
    </Button>
  );
}
