import { createServerClient } from '@/lib/supabase-server';
import { Profile } from '../../discover/profile';
import Image from 'next/image';
import { Prompt } from '@/components/prompt';
import { redirect } from 'next/navigation';

export default async function Page({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: {
    l: string;
  };
}) {
  const supabase = createServerClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const { data: profile } = await supabase
    .from('profiles')
    .select('*, prompts(*), photos(*)')
    .eq('id', params.id)
    .returns<FullProfile>()
    .single();

  // ph photoId
  // p promptId

  const { l } = searchParams;
  const likeId = l.split(':')[0];
  const type = l.split(':')[1];

  const likesQuery =
    type === 'ph'
      ? supabase
          .from('photo_likes')
          .select('photo(src), comment, liker(gender)')
          .eq('id', likeId)
          .returns<PhotoLike[]>()
          .single()
      : supabase
          .from('prompt_likes')
          .select('prompt(*), comment, liker(gender)')
          .eq('id', likeId)
          .returns<PromptLike[]>()
          .single();

  const { data: like, error: likeError } = await likesQuery;

  if (!like) {
    redirect('/likes');
  }

  const renderLike =
    'photo' in like ? (
      <div className='mb-8'>
        <div className='relative p-4'>
          <Image
            src={like.photo.src}
            width={400}
            height={100}
            alt={'k'}
            className='rounded-lg aspect-[32/9] object-cover'
          />

          <div className='absolute p-2 rounded-lg bg-indigo-200 -bottom-2 left-4'>
            {like.comment
              ? like.comment
              : like.liker.gender === 'male'
              ? 'Вподобав' + ' ваше фото'
              : 'Вподобала' + ' ваше фото'}

            <span className='h-[0.6rem] w-[0.6rem] absolute -bottom-[4px] -left-[3px] _clip-path rotate-[207deg] bg-inherit'></span>
          </div>
        </div>
      </div>
    ) : (
      <div className='relative mb-4 p-4'>
        <div className='px-2 py-6 bg-purple-50  relative rounded-lg space-y-4'>
          <h2 className='text-xl font-semibold truncate'>
            {like.prompt.answer}
          </h2>
        </div>
        <div className='absolute p-2 rounded-lg bg-indigo-200 -bottom-2 left-4'>
          {like.comment
            ? like.comment
            : like.liker.gender === 'male'
            ? 'Вподобав' + ' вашу відповідь'
            : 'Вподобала' + ' вашу відповідь'}

          <span className='h-[0.6rem] w-[0.6rem] absolute -bottom-[4px] -left-[3px] _clip-path rotate-[207deg] bg-inherit'></span>
        </div>
      </div>
    );

  if (!profile || !session) {
    return; //TODO;
  }

  return (
    <>
      {renderLike}

      <Profile userId={session.user.id} profile={profile} likeData={like} />
    </>
  );
}
