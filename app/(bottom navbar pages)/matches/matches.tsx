import Image from 'next/image';

export function Matches() {
  return (
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
  );
}
