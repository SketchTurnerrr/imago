'use client';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Toggle } from '@/components/ui/toggle';
import { ChevronRightIcon } from '@radix-ui/react-icons';
import {
  createClientComponentClient,
  User,
} from '@supabase/auth-helpers-nextjs';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export function Gender({ user }: { user: User | undefined }) {
  const [gender, setGender] = useState('male');
  const router = useRouter();

  const handleSubmit = async () => {
    const supabase = createClientComponentClient<Database>();
    if (user) {
      await supabase
        .from('profiles')
        .update({
          gender: gender,
        })
        .eq('id', user.id);
      router.push('/onboarding/denomination');
    }
  };
  const [height, setHeight] = useState<number>();
  useEffect(() => {
    if (window) {
      const windowSize = window?.innerHeight;
      const h = windowSize;
      setHeight(h);
    }
  }, []);
  return (
    <div
      style={{ height: height }}
      className='p-4 h-screen flex flex-col justify-between'
    >
      <div className='flex flex-col gap-8'>
        <h1 className='text-5xl mt-20 font-bold '>Ваша стать?</h1>
        <div className='flex gap-2 items-center'>
          <Toggle
            className='data-[state=on]:bg-purple-400 bg-accent data-[state=on]:text-white'
            pressed={gender === 'male'}
            onClick={() => setGender('male')}
          >
            Чоловіча
          </Toggle>
          <Toggle
            className='data-[state=on]:bg-purple-400 bg-accent data-[state=on]:text-white'
            pressed={gender === 'female'}
            onClick={() => setGender('female')}
          >
            Жіноча
          </Toggle>
        </div>
      </div>

      <Button
        onClick={handleSubmit}
        size='icon'
        className='rounded-full self-end bg-purple-400'
      >
        <ChevronRightIcon className='h-7 w-7' />
      </Button>
    </div>
  );
}
