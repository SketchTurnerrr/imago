import { createServerClient } from '@/lib/supabase-server';
import { Likes } from './likes';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export default async function LikesPage() {
  const supabase = createServerComponentClient<Database>({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    return <div>a</div>;
  }
  const { data: photoLikes, error } = await supabase
    .from('photo_likes')
    .select('*, photo(src, id), liker(first_name, id, gender, photos(src)) ')
    .eq('likee', session.user.id)
    .returns<PhotoLike[]>();

  // console.log('error :', error);
  const { data: promptLikes } = await supabase
    .from('prompt_likes')
    .select('*, prompt(*), liker(first_name, id, gender, photos(src))')
    .eq('likee', session.user.id)
    .returns<PromptLike[]>();

  console.log('promptLikes :', promptLikes);
  console.log('photoLikes :', photoLikes);

  return (
    <Likes photoLikes={photoLikes || []} promptLikes={promptLikes || []} />
  );
}
