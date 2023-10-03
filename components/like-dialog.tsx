import { Button } from '@/components/ui/button';
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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import Heart from '@/public/heart.svg';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import Image from 'next/image';
import { useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Prompt } from './prompt';

interface ILikeDialog {
  itemId: string;
  liker: string;
  likee: string;
  type: string;
  firstName: string | null;
  src: string | null;
  question: string | null;
  answer: string | null;
}

const FormSchema = z.object({
  comment: z.string(),
});

export function LikeDialog({
  itemId,
  liker,
  likee,
  type,
  firstName,
  src,
  question,
  answer,
}: ILikeDialog) {
  const supabase = createClientComponentClient<Database>();
  const [open, setOpen] = useState(false);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      comment: '',
    },
  });
  const handleLike = async (data: z.infer<typeof FormSchema>) => {
    const { comment } = data;

    if (type === 'photo' && itemId) {
      const { error } = await supabase.from('photo_likes').insert({
        photo: itemId,
        liker: liker,
        likee: likee,
        comment: comment ? comment : null,
      });

      console.log(' like error:', error);
    }

    if (type === 'prompt') {
      const { error } = await supabase.from('prompt_likes').insert({
        prompt: itemId,
        liker: liker,
        likee: likee,
        comment: comment ? comment : null,
      });
      console.log(' like error:', error);
    }

    setOpen(false);
  };

  return (
    <LDialog open={open} onOpenChange={setOpen}>
      <LDialogTrigger asChild>
        <Button
          variant='outline'
          size='icon'
          className='rounded-full text-purple-400 hover:text-purple-500 w-12 h-12 bottom-2 absolute right-2 bg-white'
        >
          <Heart width={24} height={24} />
        </Button>
      </LDialogTrigger>
      <LDialogContent className='max-w-[350px] bg-transparent border-none shadow-none'>
        <LDialogHeader>
          <LDialogTitle className='text-3xl'>
            {type === 'photo' ? firstName : ''}
          </LDialogTitle>
        </LDialogHeader>
        <div className='flex flex-col gap-2'>
          {src && (
            <Image
              src={src}
              alt={firstName!}
              width={300}
              height={300}
              className='rounded-lg object-cover aspect-square'
            />
          )}
          {type === 'prompt' && (
            <Prompt
              discover={false}
              question={question}
              answer={answer}
              id={itemId}
              likee={likee}
              liker={liker}
            />
          )}
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleLike)}
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
                Вподобати
              </Button>
            </form>
          </Form>
        </div>
      </LDialogContent>
    </LDialog>
  );
}
