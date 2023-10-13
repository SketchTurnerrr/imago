'use client';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { ChevronRightIcon } from '@radix-ui/react-icons';
import {
  createClientComponentClient,
  User,
} from '@supabase/auth-helpers-nextjs';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export function Denomination({ user }: { user: User | undefined }) {
  const [denomination, setDenomination] = useState('nondeno');

  const router = useRouter();
  const handleSubmit = async () => {
    const supabase = createClientComponentClient<Database>();
    if (user) {
      await supabase
        .from('profiles')
        .update({
          denomination: denomination,
        })
        .eq('id', user.id);
    }
  };

  return (
    <div className='px-4 pb-4 pt-20 h-screen flex flex-col justify-between'>
      <div className='flex flex-col gap-8'>
        <h1 className='text-5xl font-bold mb-4'>Ваша конфесія?</h1>
        <div className='flex items-center justify-between'>
          <label
            htmlFor='catholic'
            className='text-lg leading-none font-semibold peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
          >
            Католізм
          </label>
          <Checkbox
            className='data-[state=checked]:bg-purple-400 border-purple-400'
            onCheckedChange={() => setDenomination('Католізм')}
            checked={denomination === 'Католізм' ? true : false}
            id='catholic'
          />
        </div>
        <div className='flex items-center justify-between'>
          <label
            htmlFor='ortho'
            className='text-lg leading-none font-semibold peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
          >
            Православ&apos;я
          </label>
          <Checkbox
            className='data-[state=checked]:bg-purple-400 border-purple-400'
            onCheckedChange={() => setDenomination("Православ'я")}
            checked={denomination === "Православ'я" ? true : false}
            id='ortho'
          />
        </div>
        <div className='flex items-center justify-between'>
          <label
            htmlFor='baptist'
            className='text-lg leading-none font-semibold peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
          >
            Баптизм
          </label>
          <Checkbox
            className='data-[state=checked]:bg-purple-400 border-purple-400'
            onCheckedChange={() => setDenomination('Баптизм')}
            checked={denomination === 'Баптизм' ? true : false}
            id='baptist'
          />
        </div>
        <div className='flex items-center justify-between'>
          <label
            htmlFor='evangelical'
            className='text-lg leading-none font-semibold peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
          >
            Євангелізм
          </label>
          <Checkbox
            className='data-[state=checked]:bg-purple-400 border-purple-400'
            onCheckedChange={() => setDenomination('Євангелізм')}
            checked={denomination === 'Євангелізм' ? true : false}
            id='evangelical'
          />
        </div>
        <div className='flex items-center justify-between'>
          <label
            htmlFor='pentecostal'
            className='text-lg leading-none font-semibold peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
          >
            П&apos;ятидесятництво
          </label>
          <Checkbox
            className='data-[state=checked]:bg-purple-400 border-purple-400'
            onCheckedChange={() => setDenomination("П'ятидесятництво")}
            checked={denomination === "П'ятидесятництво" ? true : false}
            id='pentecostal'
          />
        </div>
        <div className='flex items-center justify-between'>
          <label
            htmlFor='other'
            className='text-lg leading-none font-semibold peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
          >
            Інше
          </label>
          <Checkbox
            className='data-[state=checked]:bg-purple-400 border-purple-400'
            onCheckedChange={() => setDenomination('Інше')}
            checked={denomination === 'Інше' ? true : false}
            id='other'
          />
        </div>
      </div>
      <Link className='self-end' href={'/onboarding/location'}>
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
