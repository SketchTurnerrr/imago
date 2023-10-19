'use client';
import { Button } from '@/components/ui/button';
import { useWindowHeight } from '@/hooks/useWindowHeight';
import Link from 'next/link';

export default function Onboarding() {
  const windowHeight = useWindowHeight();

  return (
    <div
      style={{ height: windowHeight }}
      className='flex flex-col items-center justify-center h-screen p-4'
    >
      <div className='flex flex-col items-center gap-40'>
        <h1 className='text-5xl font-bold'>
          Давайте спершу заповнимо базову інформацію
        </h1>
        <Button
          className='bg-purple-400 font-bold text-2xl hover:bg-purple-500 px-8 py-6'
          asChild
        >
          <Link href={'onboarding/first-name'}>Почати</Link>
        </Button>
      </div>
    </div>
  );
}
