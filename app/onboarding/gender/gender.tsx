'use client';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { ChevronRightIcon } from '@radix-ui/react-icons';
import {
  createClientComponentClient,
  User,
} from '@supabase/auth-helpers-nextjs';
import Link from 'next/link';
import { useState } from 'react';

export function Gender({ user }: { user: User | undefined }) {
  const [gender, setGender] = useState('male');

  const handleSubmit = async () => {
    const supabase = createClientComponentClient<Database>();
    if (user) {
      await supabase
        .from('profiles')
        .update({
          gender: gender,
        })
        .eq('id', user.id);
    }
  };

  return (
    <div className='px-4 pb-4 pt-20 h-screen flex flex-col justify-between'>
      <div className='flex flex-col gap-8'>
        <h1 className='text-5xl font-bold mb-4'>Ваша стать?</h1>
        <div className='flex items-center justify-between'>
          <label
            htmlFor='male'
            className='text-lg font-semibold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
          >
            Чоловіча
          </label>
          <Checkbox
            className='data-[state=checked]:bg-purple-400 border-purple-400'
            onCheckedChange={() => setGender('male')}
            checked={gender === 'male' ? true : false}
            id='male'
          />
        </div>
        <div className='flex items-center justify-between'>
          <label
            htmlFor='female'
            className='text-lg font-semibold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
          >
            Жіноча
          </label>
          <Checkbox
            className='data-[state=checked]:bg-purple-400 border-purple-400'
            onCheckedChange={() => setGender('female')}
            checked={gender === 'female' ? true : false}
            id='female'
          />
        </div>
      </div>
      <Link className='self-end' href={'/onboarding/denomination'}>
        <Button
          asChild
          onClick={handleSubmit}
          size='icon'
          className='rounded-full bg-purple-400'
        >
          <ChevronRightIcon className='h-4 w-4' />
        </Button>
      </Link>
    </div>
  );
}
