'use client';
import Image from 'next/image';
import Link from 'next/link';

interface IMatches {
  conversations: IConversations[];
  userId: string;
}

export function Matches({ conversations, userId }: IMatches) {
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
            {conversation.participant2.id === userId ? (
              <Image
                className='rounded-full aspect-square object-cover'
                src={conversation.participant1.photos[0].src}
                width={75}
                height={75}
                alt='me'
              />
            ) : (
              <Image
                className='rounded-full aspect-square object-cover'
                src={conversation.participant2.photos[0].src}
                width={75}
                height={75}
                alt='me'
              />
            )}

            <div className=''>
              <p className='font-bold text-base'>
                {conversation.participant2.id === userId
                  ? conversation.participant1.first_name
                  : conversation.participant2.first_name}
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
