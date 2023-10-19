'use client';
import { Button } from '@/components/ui/button';
import { Toggle } from '@/components/ui/toggle';
import { useWindowHeight } from '@/hooks/useWindowHeight';
import { ChevronRightIcon } from '@radix-ui/react-icons';
import {
  createClientComponentClient,
  User,
} from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export function Denomination({ user }: { user: User | undefined }) {
  const [denomination, setDenomination] = useState('');
  const windowHeight = useWindowHeight();

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
    router.push('/onboarding/location');
  };

  return (
    <div
      style={{ height: windowHeight }}
      className='p-4  h-screen flex flex-col justify-between'
    >
      <div className='flex flex-col gap-8'>
        <h1 className='text-5xl mt-20 font-bold '>Ваша конфесія?</h1>
        <div className='flex flex-wrap gap-3 items-center'>
          <Toggle
            className='data-[state=on]:bg-purple-400 bg-accent font-semibold data-[state=on]:text-white'
            pressed={denomination === 'Католізм'}
            onClick={() => setDenomination('Католізм')}
          >
            Католізм
          </Toggle>

          <Toggle
            className='data-[state=on]:bg-purple-400 bg-accent font-semibold data-[state=on]:text-white'
            onClick={() => setDenomination("Православ'я")}
            pressed={denomination === "Православ'я"}
            id='ortho'
          >
            Православ&apos;я
          </Toggle>

          <Toggle
            className='data-[state=on]:bg-purple-400 bg-accent font-semibold data-[state=on]:text-white'
            onClick={() => setDenomination('Євангелізм')}
            pressed={denomination === 'Євангелізм'}
            id='evangelical'
          >
            Євангелізм
          </Toggle>

          <Toggle
            className='data-[state=on]:bg-purple-400 bg-accent font-semibold data-[state=on]:text-white'
            onClick={() => setDenomination('Баптизм')}
            pressed={denomination === 'Баптизм'}
            id='baptist'
          >
            Баптизм
          </Toggle>

          <Toggle
            className='data-[state=on]:bg-purple-400 bg-accent font-semibold data-[state=on]:text-white'
            onClick={() => setDenomination("П'ятидесятництво")}
            pressed={denomination === "П'ятидесятництво"}
            id='pentecostal'
          >
            П&apos;ятидесятництво
          </Toggle>

          <Toggle
            className='data-[state=on]:bg-purple-400 bg-accent font-semibold data-[state=on]:text-white'
            onClick={() => setDenomination('Неконфесійна')}
            pressed={denomination === 'Неконфесійна'}
            id='nondeno'
          >
            Неконфесійна
          </Toggle>

          <Toggle
            className='data-[state=on]:bg-purple-400 bg-accent font-semibold data-[state=on]:text-white'
            onClick={() => setDenomination('Інше')}
            pressed={denomination === 'Інше'}
            id='other'
          >
            Інше
          </Toggle>
        </div>
      </div>
      <Button
        onClick={handleSubmit}
        size='icon'
        disabled={denomination === ''}
        className='rounded-full self-end bg-purple-400 '
      >
        <ChevronRightIcon className='h-7 w-7' />
      </Button>
    </div>
  );
}
