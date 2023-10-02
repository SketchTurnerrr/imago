import { Database as DB } from '@/types/database.types';

declare global {
  type Database = DB;

  type ProfileType = DB['public']['Tables']['profiles']['Row'];
  type PromptsType = DB['public']['Tables']['prompts']['Row'];
  type PhotosType = DB['public']['Tables']['photos']['Row'];
  type PhotoLikesType = DB['public']['Tables']['photo_likes']['Row'];
  type PromptLikesType = DB['public']['Tables']['prompt_likes']['Row'];
  interface FullProfile extends ProfileType {
    prompts: PromptsType[];
    photos: PhotosType[];
  }
  interface ProfileWithPhotos extends ProfileType {
    photos: PhotosType[];
  }

  interface PhotoLike extends PhotoLikesType {
    photo: { src: string };
    liker: {
      first_name: string;
      gender: string;
      id: string;
      photos: PhotosType[];
    };
  }
  interface PromptLike extends PromptLikesType {
    prompt: PromptsType;
    liker: {
      first_name: string;
      gender: string;
      id: string;
      photos: PhotosType[];
    };
  }
}
