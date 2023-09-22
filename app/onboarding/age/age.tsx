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

const formSchema = z.object({
  first_name: z.string().min(2, {
    message: 'Мінімум 2 літери.',
  }),
});

export default function Age({ user }: { user: User | undefined }) {
  const supabase = createClientComponentClient<Database>();
  const router = useRouter();
  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (user) {
      await supabase
        .from('profiles')
        .update({
          first_name: values.first_name,
        })
        .eq('id', user.id);

      router.push('age');
    }
  }

  console.log(' :', user);
  const form = useForm<z.infer<typeof formSchema>>({
    //@ts-ignore
    resolver: zodResolver(formSchema),
    defaultValues: {
      first_name: '',
    },
  });

  return (
    <div className='px-4 pt-20 h-screen flex flex-col justify-between'>
      <h1 className='text-5xl font-bold mb-4'>Коли ви народились?</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='mb-4 flex flex-col h-full justify-between '
        >
          <FormField
            control={form.control}
            name='first_name'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    className='border-t-0 border-x-0 rounded-none border-b-[3px] shadow-none border-b-purple-400 focus:border-b-purple-500 focus-visible:ring-0 duration-300 transition-colors ease-linear'
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
            type='submit'
            size='icon'
            className='rounded-full self-end  bg-purple-400'
          >
            <ChevronRightIcon className='h-4 w-4' />
          </Button>
        </form>
      </Form>
    </div>
  );
}
