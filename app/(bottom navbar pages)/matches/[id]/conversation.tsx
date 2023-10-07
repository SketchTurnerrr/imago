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
import { Textarea } from '@/components/ui/textarea';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

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
          table: 'messages',
          filter: `conversation_id=eq.${conversationId}`,
        },

        async (payload: any) => {
          let { data: newMessage, error } = await supabase
            .from('messages')
            .select(
              '*, conversation_id(conversation_pid(first_name, id, photos(src))),sender_id(id,first_name,photos(src))'
            )
            .eq('id', payload.new.id)
            .returns<IMessages[]>()
            .maybeSingle();

          if (error) {
            console.log('error :', error);
          }
          setRTMessages([...rtMessages, newMessage as IMessages]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [rtMessages, setRTMessages]);

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

  return (
    <div className='flex flex-col p-4 gap-2'>
      <div>
        <h1 className='text-3xl font-bold mb-4'>
          {messages[0].conversation_id.conversation_pid.id !== userId
            ? messages[1].conversation_id.conversation_pid.first_name
            : messages[0].conversation_id.conversation_pid.first_name}
        </h1>
        <Separator />
      </div>
      {
        <div className='flex flex-col overflow-y-scroll gap-1 h-[calc(100vh-12.3rem)] hide-scrollbar'>
          {rtMessages.map((message) => {
            return (
              <div
                key={message.id}
                className={`${
                  userId !== message.sender_id.id
                    ? 'justify-start'
                    : 'justify-end'
                } flex `}
              >
                {userId !== message.sender_id?.id ? (
                  <div className='flex  items-center gap-2'>
                    <Image
                      src={message.sender_id.photos[0].src}
                      width={35}
                      height={35}
                      className='object-cover aspect-square rounded-full'
                      alt={
                        message.sender_id?.first_name ||
                        message.conversation_id.conversation_pid.first_name
                      }
                    />

                    <div className=' p-2 max-w-[25ch] bg-slate-100 rounded-lg rounded-bl-none'>
                      {message.content}
                    </div>
                  </div>
                ) : (
                  <div className=' p-2 max-w-[25ch] bg-purple-400 text-white rounded-lg rounded-br-none'>
                    {message.content}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      }
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='flex mb-auto'>
          <FormField
            control={form.control}
            name='message'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormControl>
                  <Input
                    type='text'
                    placeholder='Написати повідомлення'
                    {...field}
                    className='min-h-[20px] '
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <Button variant='ghost' type='submit'>
            Відправити
          </Button>
        </form>
      </Form>
    </div>
  );
}
