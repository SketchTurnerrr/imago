'use client';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import {
  User,
  createClientComponentClient,
} from '@supabase/auth-helpers-nextjs';
import { useState } from 'react';

const FormSchema = z.object({
  question: z.string({
    required_error: 'Please select an email to display.',
  }),
  answer: z.string().max(179, 'Максимум 180 символів'),
});

export function AddPromptDialog({ user }: { user: User }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const supabase = createClientComponentClient<Database>();

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    if (user) {
      await supabase.from('prompts').insert({
        question: data.question,
        answer: data.answer,
        profile_id: user.id,
      });
    }

    // setPrompts([...prompts, data]);
    router.refresh();

    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className='flex relative flex-col  p-4 rounded-lg bg-slate-50 border-2 border-dashed font-bold text-gray-500 text-sm border-gray-300'>
          <p>Оберіть фразу</p>
          <p>І дайте на неї відповідь</p>
          <Image
            src='/plus.svg'
            width={24}
            height={24}
            alt='plus icon'
            className='absolute  -top-2 -right-2'
          />
        </div>
      </DialogTrigger>
      <DialogContent className='w-[350px]'>
        <DialogHeader>
          <DialogTitle className='font-bold'>Оберіть фразу</DialogTitle>
          <DialogDescription>
            Ваші відповіді допоможуть почати розмову
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='w-2/3 space-y-6'
          >
            <FormField
              control={form.control}
              name='question'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Фраза</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder='Оберіть фразу' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className='overflow-y-auto max-h-[10rem]'>
                      <SelectItem value='Моя улюблена книга Біблії'>
                        Моя улюблена книга Біблії
                      </SelectItem>
                      <SelectItem value='Я божеволію від'>
                        Я божеволію від
                      </SelectItem>
                      <SelectItem value='Моя типова неділя'>
                        Моя типова неділя
                      </SelectItem>
                      {/* <SelectItem value=''></SelectItem> */}
                      {/* <SelectItem value='Люди дивуються, коли я кажу'>
                    Люди дивуються, коли я кажу
                </SelectItem> */}
                      {/* <SelectItem disabled={true} value='Не люблю, коли люди'>
                    <Separator className='w-full bg-red-400' />
                    Християнство
                  </SelectItem> */}
                      <SelectItem value='Люди дивуються, коли я кажу'>
                        Люди дивуються, коли я кажу
                      </SelectItem>
                      <SelectItem value="Цього року, я обов'язково">
                        Цього року, я обов&apos;язково
                      </SelectItem>
                      <SelectItem value='Хочеш - вір, хочеш - ні'>
                        Хочеш - вір, хочеш - ні
                      </SelectItem>
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='answer'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Відповідь</FormLabel>

                  <Textarea maxLength={180} {...field} id='answer' />
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* <Button type='submit'>Зберегти</Button> */}

            <DialogFooter>
              <Button type='submit'>Зберегти</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
