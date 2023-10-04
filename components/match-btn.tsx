'use client';

import { Button } from './ui/button';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter, useSearchParams } from 'next/navigation';
import Message from '@/public/message.svg';
import {
  LDialog,
  LDialogContent,
  LDialogHeader,
  LDialogTitle,
  LDialogTrigger,
} from '@/components/ui/custom-like-dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import Image from 'next/image';
import { useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Prompt } from './prompt';

interface IMatchDialog {
  liker: string;
  likee: string;
  firstName: string | null;
  src: string;
  likeData: PhotoLike | PromptLike;
}

const FormSchema = z.object({
  comment: z.string(),
});

export function MatchDialog({
  liker,
  likee,
  firstName,
  src,
  likeData,
}: IMatchDialog) {
  const supabase = createClientComponentClient<Database>();
  console.log('likeData :', likeData);
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const btnRef = useRef(null);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      comment: '',
    },
  });
  const handleMatch = async (data: z.infer<typeof FormSchema>) => {
    const { comment } = data;

    setOpen(false);
  };

  gsap.registerPlugin(ScrollTrigger);
  useEffect(() => {
    const showBtn = gsap
      .fromTo(
        btnRef.current,
        {
          top: '92%',
        },
        {
          top: '83%',
          duration: 0.3,
        }
      )
      .progress(1);

    ScrollTrigger.create({
      start: 'top top',
      end: 'max',
      onUpdate: (self) => {
        self.direction === -1 ? showBtn.play() : showBtn.reverse();
      },
    });
  }, []);

  return (
    <LDialog open={open} onOpenChange={setOpen}>
      <LDialogTrigger className='h-0' asChild>
        <div
          ref={btnRef}
          style={{ margin: 0 }}
          className='h-0 z-30 left-4 self-end sticky top-[83%]'
        >
          <Button
            variant='outline'
            size='icon'
            className=' h-12 w-12 rounded-full  bg-white'
          >
            <Message />
          </Button>
        </div>
      </LDialogTrigger>
      <LDialogContent className='max-w-[350px] bg-transparent border-none shadow-none'>
        <LDialogHeader>
          <LDialogTitle className='text-3xl'>
            {firstName ? firstName : ''}
          </LDialogTitle>
        </LDialogHeader>
        <div className='flex flex-col gap-2'>
          {'photo' in likeData && (
            <Image
              src={likeData?.photo?.src}
              alt={firstName!}
              width={300}
              height={300}
              className='rounded-lg object-cover w-full aspect-square'
            />
          )}

          {'prompt' in likeData && (
            <Prompt
              likee=''
              liker=''
              id={likeData.id}
              question={likeData.prompt.question}
              answer={likeData.prompt.answer}
            />
          )}

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleMatch)}
              className='flex flex-col gap-2'
            >
              <FormField
                control={form.control}
                name='comment'
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        className='bg-white'
                        maxLength={140}
                        placeholder='Залишити коментар'
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                className='font-bold text-base'
                type='submit'
                // onClick={handleLike}
              >
                Познайомитись
              </Button>
            </form>
          </Form>
        </div>
      </LDialogContent>
    </LDialog>
  );
}
