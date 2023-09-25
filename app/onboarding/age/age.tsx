'use client';
import { format } from 'date-fns';
// import { CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { ChevronRightIcon } from '@radix-ui/react-icons';
import {
  createClientComponentClient,
  User,
} from '@supabase/auth-helpers-nextjs';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';

const formSchema = z.object({
  dob: z.date({
    required_error: 'A date of birth is required.',
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
          date_of_birth: values.dob,
        })
        .eq('id', user.id);

      router.push('gender');
    }

    console.log(' :', values.dob);
  }

  const form = useForm<z.infer<typeof formSchema>>({
    //@ts-ignore
    resolver: zodResolver(formSchema),
  });

  return (
    <div className='px-4 pt-20 h-screen flex flex-col justify-between'>
      <h1 className='text-5xl font-bold mb-4'>Коли ви народились?</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='mb-4 flex flex-col pt-10 h-full justify-between '
        >
          <FormField
            control={form.control}
            name='dob'
            render={({ field }) => (
              <FormItem className='flex flex-col'>
                <FormLabel>Дата народження</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={'ghost'}
                        className={cn(
                          'rounded-none w-full pl-3 text-left border-b-purple-400 border-b-2 font-normal',
                          !field.value && 'text-muted-foreground'
                        )}
                      >
                        {field.value ? (
                          format(field.value, 'PPP')
                        ) : (
                          <span>Оберить дату</span>
                        )}
                        {/* <CalendarIcon className='ml-auto h-4 w-4 opacity-50' /> */}
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className='w-auto p-0' align='start'>
                    <Calendar
                      mode='single'
                      selected={field.value}
                      onSelect={field.onChange}
                      toYear={2006}
                      disabled={(date) =>
                        date > new Date() || date < new Date('1972-01-01')
                      }
                      initialFocus
                      className='border-none'
                    />
                  </PopoverContent>
                </Popover>
                <FormDescription className='text-center font-bold text-2xl text-black'>
                  Вам{' '}
                  {isNaN(new Date().getFullYear() - field.value?.getFullYear())
                    ? '17'
                    : new Date().getFullYear() - field.value?.getFullYear()}
                </FormDescription>
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
