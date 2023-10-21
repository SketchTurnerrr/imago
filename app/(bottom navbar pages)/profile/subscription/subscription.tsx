'use client';
import { liqpaySignature } from '@/lib/liqpay';
import { useEffect, useState } from 'react';
import * as React from 'react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { cn } from '@/lib/utils';

export function Subscription({ userId }: { userId: string }) {
  const [amount, setAmount] = useState(0);
  const [periodicity, setPeriodicity] = useState('month');
  const [dataBase64, setDataBase64] = useState('');
  const [signatureBase64, setSignatureBase64] = useState('');

  useEffect(() => {
    const fu = async () => {
      const { dataBase64, signatureBase64 } = await liqpaySignature({
        periodicity,
        amount,
        orderId: userId,
      });
      setDataBase64(dataBase64);
      setSignatureBase64(signatureBase64);
    };

    fu();
  }, [amount, periodicity]);

  const benefits = [
    {
      title: 'Необмежена кількість вподобань',
    },
    {
      title: 'Можливість фільтрувати стрічку',
    },
    {
      title: 'Можливість повернутись до попереднього профілю',
    },
  ];

  const handlePlan = ({
    amount,
    periodicity,
  }: {
    amount: number;
    periodicity: string;
  }) => {
    setAmount(amount);
    setPeriodicity(periodicity);
  };

  return (
    <div className=''>
      <h1 className='text-4xl pl-4 pt-4 font-bold'>Підписка</h1>

      <blockquote></blockquote>
      <Card className='w-[350px] mt-10 mx-auto'>
        <CardHeader>
          <CardTitle className='text-lg'>Переваги підписки</CardTitle>
        </CardHeader>
        <CardContent>
          {benefits.map((benefit, index) => (
            <div key={index} className='mb-4 flex gap-2 pb-4 '>
              <span className='flex h-2 w-2 translate-y-1 rounded-full bg-sky-500' />

              <p className='text-sm font-medium leading-none'>
                {benefit.title}
              </p>
            </div>
          ))}
          <div className='flex flex-col gap-4'>
            <div
              onClick={() => handlePlan({ amount: 77, periodicity: 'month' })}
              className={cn(
                'flex items-center justify-between rounded-lg p-4 cursor-pointer',
                amount === 77
                  ? 'bg-gradient-to-r to-purple-500 from-purple-600 text-background'
                  : 'bg-accent'
              )}
            >
              <div>
                <h2 className='font-bold mb-2'>Щомісячна</h2>
                <p className='text-sm max-w-[24ch]'>
                  Оплата раз на місяць, скасування в будь який час
                </p>
              </div>
              <span>₴77/місяць</span>
            </div>

            <div
              onClick={() => handlePlan({ amount: 40, periodicity: 'year' })}
              className={cn(
                'flex items-center justify-between rounded-lg p-4 cursor-pointer',
                amount === 40
                  ? 'bg-gradient-to-r to-purple-500 from-purple-600 text-background'
                  : 'bg-accent'
              )}
            >
              <div>
                <h2 className='font-bold mb-2'>Річна</h2>
                <p className='text-sm max-w-[20ch]'>
                  Одноразова оплата раз весь рік
                </p>
              </div>
              <span>₴40/місяць</span>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <form
            method='POST'
            action='https://www.liqpay.ua/api/3/checkout'
            acceptCharset='utf-8'
            target='blank'
            className='w-full'
          >
            <input type='hidden' name='data' value={dataBase64} />
            <input type='hidden' name='signature' value={signatureBase64} />

            <Button
              disabled={amount === 0}
              type='submit'
              size='lg'
              className='w-full bg-gradient-to-r to-purple-500 from-purple-600 text-background'
            >
              Підключити
            </Button>
          </form>
        </CardFooter>
      </Card>
    </div>
  );
}
