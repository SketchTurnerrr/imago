// 'use client';
import { createServerClient } from '@/lib/supabase-server';
import Image from 'next/image';
import Link from 'next/link';

interface IMatches {
  conversations: IConversations[];
  // parties: IParticipants[];
  userId: string;
}

export async function Matches({ conversations, userId }: IMatches) {
  // console.log('conversations :', conversations);

  const supabase = createServerClient();
  const { data: parties, error } = await supabase
    .from('conversation_participants')
    .select('*, profile_id(id,first_name, photos(src))')
    .returns<IParticipants[]>();

  // console.log('parties err:', error);

  if (!parties) {
    return <div>ad</div>;
  }

  return (
    <>
      {conversations.length === 0 && (
        <div className='flex p-4 flex-col gap-3 items-center'>
          <h1 className='text-4xl font-bold self-start'>Метчі</h1>
          <div>
            <Image
              className='mx-auto'
              src='/keanu.jpg'
              width={200}
              height={200}
              alt='Sad Keanu'
            />
            <p className='text-md text-gray-500 font-semibold'>
              Тут будуть ваші метчі, але поки що нічого
            </p>
          </div>
        </div>
      )}
      {conversations.map((conversation) => (
        <div key={conversation.id} className='flex flex-col p-4 '>
          <Link
            href={`/matches/${conversation.id}`}
            className='flex gap-4 items-center'
          >
            {conversation.conversation_pid.id === userId ? (
              <Image
                className='rounded-full aspect-square object-cover'
                src={parties[0].profile_id.photos[0].src}
                width={75}
                height={75}
                alt='me'
              />
            ) : (
              <Image
                className='rounded-full aspect-square object-cover'
                src={parties[1].profile_id.photos[0].src}
                width={75}
                height={75}
                alt='me'
              />
            )}

            <div className=''>
              <p className='font-bold text-base'>
                {conversation.conversation_pid.id === userId
                  ? parties[0].profile_id.first_name
                  : parties[1].profile_id.first_name}
              </p>
              <p className='text-gray-400'>
                {conversation.last_message?.content}
              </p>
            </div>
          </Link>
        </div>
      ))}
    </>
  );
}
