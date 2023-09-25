import { Database as DB } from '@/lib/database.types';

declare global {
  type Database = DB;

  type ProfileType = DB['public']['Tables']['profiles']['Row'];
}
