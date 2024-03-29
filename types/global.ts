import { Database as DB } from "@/types/database.types";

declare global {
  type Database = DB;
}
