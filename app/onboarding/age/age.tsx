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
  FormMessage,
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import uk from 'date-fns/locale/uk';
import { useWindowHeight } from '@/hooks/useWindowHeight';

const formSchema = z.object({
  dob: z.date({
    required_error: 'Будь ласка оберіть дату свого народження',
  }),
});

export default function Age({ user }: { user: User | undefined }) {
  const supabase = createClientComponentClient<Database>();
  const router = useRouter();
  const windowHeight = useWindowHeight();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const age = new Date()?.getFullYear() - values.dob?.getFullYear();

    if (user) {
      await supabase
        .from('profiles')
        .update({
          date_of_birth: values.dob,
          age: age,
        })
        .eq('id', user.id);

      router.push('gender');
    }
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  return (
    <div
      style={{ height: windowHeight }}
      className='p-4 h-screen flex flex-col justify-between'
    >
      <h1 className='text-5xl mt-20 font-bold'>Коли ви народились?</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='flex flex-col pt-10 h-full justify-between '
        >
          <FormField
            control={form.control}
            name='dob'
            render={({ field }) => (
              <FormItem className='flex flex-col'>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={'ghost'}
                        className={cn(
                          'rounded-none w-[150px] mx-auto pl-3 text-left border-b-purple-400 border-b-2 font-normal',
                          !field.value && 'text-muted-foreground'
                        )}
                      >
                        {field.value ? (
                          format(field.value, 'PPP', { locale: uk })
                        ) : (
                          <span>Оберіть дату</span>
                        )}
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className='w-auto p-0' align='start'>
                    <Calendar
                      captionLayout='dropdown-buttons'
                      mode='single'
                      selected={field.value}
                      onSelect={field.onChange}
                      fromYear={1977}
                      toYear={2006}
                      disabled={(date) =>
                        date > new Date() || date < new Date('1972-01-01')
                      }
                      initialFocus
                      className='border-none'
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
                <FormDescription className='text-center font-bold text-2xl text-black'>
                  Вам{' '}
                  {isNaN(new Date().getFullYear() - field.value?.getFullYear())
                    ? '17'
                    : new Date().getFullYear() - field.value?.getFullYear()}
                </FormDescription>
              </FormItem>
            )}
          />
          <Button
            type='submit'
            size='icon'
            className='rounded-full self-end bg-purple-400'
          >
            <ChevronRightIcon className='h-7 w-7' />
          </Button>
        </form>
      </Form>
    </div>
  );
}
