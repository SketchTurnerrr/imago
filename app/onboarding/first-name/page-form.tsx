'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ChevronRightIcon } from '@radix-ui/react-icons';
import {
  createClientComponentClient,
  User,
} from '@supabase/auth-helpers-nextjs';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useWindowHeight } from '@/hooks/useWindowHeight';

const formSchema = z.object({
  first_name: z
    .string()
    .min(2, {
      message: "Це поле обов'язкове.",
    })
    .max(12),
});

export default function FirstName({ user }: { user: User | undefined }) {
  const [height, setHeight] = useState<number>();
  const windowHeight = useWindowHeight();
  const supabase = createClientComponentClient<Database>();
  const router = useRouter();
  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (user) {
      await supabase
        .from('profiles')
        .update({
          first_name:
            values.first_name.charAt(0).toUpperCase() +
            values.first_name.slice(1),
        })
        .eq('id', user.id);

      router.push('age');
    }
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      first_name: '',
    },
  });

  return (
    <div
      style={{ height: windowHeight }}
      className='flex flex-col justify-between h-screen p-4'
    >
      <h1 className='text-5xl font-bold mt-20 mb-10'>Як вас звати?</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className=' flex flex-col h-full justify-between '
        >
          <FormField
            control={form.control}
            name='first_name'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    className='border-t-0 border-x-0 h-16 rounded-none border-b-[3px] shadow-none border-b-purple-400 focus:border-b-purple-500 focus-visible:ring-0 duration-300 text-3xl transition-colors ease-linear'
                    type='text'
                    placeholder='Ваше ім`я'
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            size='icon'
            type='submit'
            disabled={!form.formState.isValid}
            className='rounded-full self-end bg-purple-400'
          >
            <ChevronRightIcon className='h-7 w-7' />
          </Button>
        </form>
      </Form>
    </div>
  );
}
