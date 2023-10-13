'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useEffect, useRef, useState } from 'react';
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
import Image from 'next/image';
import { ThreeDotsMenu } from '@/components/three-dots-menu';
import { TooltipTime } from '@/components/msg-time-tooltip';
import Send from '@/public/send.svg';

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
  const supabase = createClientComponentClient<Database>();
  const [rtMessages, setRTMessages] = useState(messages);
  const scrollToLastMsgRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    scrollToLastMsgRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [rtMessages]);

  function shouldShowAvatar(previous: IMessages, message: IMessages) {
    const isFirst = !previous;
    if (isFirst) return true;

    const differentUser = message.sender_id.id !== previous.sender_id.id;

    if (differentUser) {
      return true;
    } else {
      return false;
    }
  }

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
              '*, conversation_id(participant1(id,first_name), participant2(first_name)),sender_id(id, first_name,photos(src))'
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
    <div className='flex flex-col '>
      <div className='flex p-4 items-center justify-between '>
        <h1 className='text-3xl  font-bold '>
          {messages[0].conversation_id.participant1.id !== userId
            ? messages[0].conversation_id.participant1.first_name
            : messages[0].conversation_id.participant2.first_name}
        </h1>
        <ThreeDotsMenu conversationId={conversationId} participantId={userId} />
      </div>
      <Separator className='' />
      {
        <div className='flex flex-col overflow-y-scroll p-4 gap-1 h-[calc(100vh-12.3rem)] hide-scrollbar'>
          {rtMessages.map((message, index) => {
            const previous = messages[index - 1];
            const showAvatar = shouldShowAvatar(previous, message);
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
                  <div
                    className={`${
                      showAvatar ? 'mt-6' : 'mt-0'
                    } flex items-center gap-2`}
                  >
                    {showAvatar ? (
                      <Image
                        src={message.sender_id.photos[0].src}
                        width={35}
                        height={35}
                        className='object-cover aspect-square rounded-full'
                        alt={
                          message.conversation_id.participant1.id ===
                          message.sender_id.id
                            ? message.conversation_id.participant1.first_name
                            : message.conversation_id.participant2.first_name
                        }
                      />
                    ) : (
                      <div className='w-[35px] h-[35px]'></div>
                    )}

                    <div className='flex gap-2 p-2 max-w-[30ch] bg-slate-100 rounded-lg rounded-bl-none'>
                      {message.content}

                      <TooltipTime created_at={message.created_at} />
                    </div>
                  </div>
                ) : (
                  <div
                    className={`${
                      showAvatar ? 'mt-6' : 'mt-0'
                    } flex gap-2 p-2 max-w-[30ch]  bg-purple-400 text-white rounded-lg rounded-br-none`}
                  >
                    {message.content}
                    <TooltipTime created_at={message.created_at} side='right' />
                  </div>
                )}
              </div>
            );
          })}
          <div ref={scrollToLastMsgRef} role='none'></div>
        </div>
      }
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='flex gap-3 mb-auto px-4 pt-2'
        >
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
                {/* <FormMessage /> */}
              </FormItem>
            )}
          />
          <Button
            className='aspect-square rounded-full'
            size='icon'
            type='submit'
          >
            <Send />
          </Button>
        </form>
      </Form>
    </div>
  );
}
