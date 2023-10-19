'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import Image from 'next/image';
import {
  Session,
  createClientComponentClient,
} from '@supabase/auth-helpers-nextjs';
import { useToast } from '@/components/ui/use-toast';
import { redirect } from 'next/navigation';

const formSchema = z.object({
  email: z.string().email({ message: 'Це не схоже на адресу' }).min(2, {
    message: 'Username must be at least 2 characters.',
  }),
});

export function SignIn({ session }: { session: Session | null }) {
  const supabase = createClientComponentClient();

  if (session) {
    redirect('/discover');
  }

  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
    },
  });

  async function signInWithGoogle() {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    });
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await supabase.auth.signInWithOtp({
        email: values.email,
        options: {
          emailRedirectTo: `${location.origin}/auth/callback`,
          data: {
            email: values.email,
            name: null,
            avatar_url: null,
          },
        },
      });
    } catch (error) {
      console.log('error :', error);
    }

    toast({
      title: 'Перевірте, будь ласка свою пошту',
      description: 'У листі ви знайдете посилання для входу',
      duration: 10000,
      style: { backgroundColor: '#bbf7d0' },
    });
  }

  return (
    <div className='h-screen w-full grid place-items-center'>
      <div className='w-full md:max-w-sm'>
        <h1 className='text-center text-4xl font-bold mb-4'>Привіт!</h1>
        <div className='rounded-lg   p-5 '>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    {/* <FormLabel>Email</FormLabel> */}
                    <FormControl>
                      <Input
                        className='py-6'
                        placeholder='Електронна адреса'
                        type='email'
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className='border border-gray-400 rounded-sm p-2'>
                <p className='text-gray-400 text-sm'>
                  ✨ Непотрібно ніяких паролів, ми відправимо вам на пошту
                  посилання для входу.
                </p>
              </div>
              <Button
                className='w-full p-6 hover:bg-purple-500 bg-purple-400 text-lg font-bold'
                type='submit'
              >
                Увійти
              </Button>
              <p className='text-center'>або</p>
            </form>
          </Form>
          <Button
            variant='outline'
            className='w-full p-6  text-lg font-bold'
            type='submit'
            onClick={signInWithGoogle}
          >
            <Image
              src='/google-logo.svg'
              alt='Google Logo'
              className='dark:invert mr-2'
              width={24}
              height={24}
              priority
            />
            Увійти з Google
          </Button>
        </div>
      </div>
    </div>
  );
}
