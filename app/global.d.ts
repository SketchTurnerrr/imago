import { Database as DB } from '@/types/database.types';

declare global {
  type Database = DB;

  type ProfileType = DB['public']['Tables']['profiles']['Row'];
  type PromptsType = DB['public']['Tables']['prompts']['Row'][];
  type PhotosType = DB['public']['Tables']['photos']['Row'];
  interface FullProfile extends ProfileType {
    prompts: PromptsType;
    photos: PhotosType;
  }
}
