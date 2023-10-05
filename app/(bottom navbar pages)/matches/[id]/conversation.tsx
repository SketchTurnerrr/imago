'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useEffect, useState } from 'react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const FormSchema = z.object({
  message: z
    .string()
    .min(1, { message: 'Це не схоже на повідомлення' })
    .max(140, {
      message: 'Максимум 140 символів',
    }),
});

interface IConversations {
  messages: IMessages[];
  userId: string;
  conversationId: string;
}

export function Conversation({
  messages,
  userId,
  conversationId,
}: IConversations) {
  const [rtMessages, setRTMessages] = useState(messages);
  const supabase = createClientComponentClient<Database>();

  useEffect(() => {
    const channel = supabase
      .channel('realtime-messages')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
        },
        (payload) => {
          setRTMessages([...rtMessages, payload.new as IMessages]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [rtMessages, setRTMessages, supabase]);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      message: '',
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    await supabase.from('messages').insert({
      content: data.message,
      conversation_id: conversationId,
      sender_id: userId,
    });
    form.resetField('message');
  }
  // console.log(
  //   'conversation_id.conversation_pid.id === userId :',
  //   messages[0].conversation_id.conversation_pid.id === userId
  //   );
  console.log('messages[0] :', messages[0]);
  // console.log('userId :', userId);
  // console.log(
  //   'messages[0].conversation_id.conversation_pid.id  :',
  //   messages[0].conversation_id.conversation_pid.id
  // );

  return (
    <div className='flex flex-col p-4'>
      <h1 className='text-3xl font-bold mb-4'>
        {messages[0].conversation_id.conversation_pid.id !== userId
          ? messages[1].conversation_id.conversation_pid.first_name
          : messages[0].conversation_id.conversation_pid.first_name}
      </h1>
      <Separator />
      {
        <div className='flex flex-col'>
          {rtMessages.map((message) => {
            return (
              <div key={message.id} className='flex flex-col'>
                {userId === String(message.sender_id) ? (
                  <div className='self-end'>{message.content}</div>
                ) : (
                  <div className='self-start'>{message.content}</div>
                )}
              </div>
            );
          })}
        </div>
      }

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='flex  gap-4'>
          <FormField
            control={form.control}
            name='message'
            render={({ field }) => (
              <FormItem>
                <FormControl className='w-full'>
                  <Input
                    style={{ width: '100%' }}
                    placeholder='Відправити повідомлення'
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <Button type='submit'>Submit</Button>
        </form>
      </Form>
    </div>
  );
}
