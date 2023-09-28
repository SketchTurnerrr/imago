import { Database as DB } from '@/types/database.types';

declare global {
  type Database = DB;

  type ProfileType = DB['public']['Tables']['profiles']['Row'];
  type PromptsType = DB['public']['Tables']['prompts']['Row'][];
  interface ProfileWithPrompts extends ProfileType {
    prompts: PromptsType;
  }
}
