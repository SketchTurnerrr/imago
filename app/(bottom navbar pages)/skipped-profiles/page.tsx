import { createServerClient } from "@/lib/supabase-server";
import { formatDistance } from "date-fns";
import uk from "date-fns/locale/uk";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { SkippedProfiles } from "./skipped-profiles";

export default async function SkippedProfilesPage() {
  const supabase = createServerClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/login");
  }

  interface ISkippedProfiles extends Omit<SkippedProfilesType, "object"> {
    object: FullProfile;
  }

  const { data: skippedProfiles, error } = await supabase
    .from("skipped_profiles")
    .select("id,created_at, object(id,first_name, photos(src))")
    .eq("subject", session.user.id)
    .returns<ISkippedProfiles[]>();
  console.log("skippedProfiles :", skippedProfiles?.[0].created_at);

  return (
    <div className="flex flex-col gap-4 p-4 pb-20 md:mx-auto md:w-fit">
      <h1 className="mb-4 w-full self-start text-4xl font-bold">
        Переглянуті профілі
        <div className="mt-4 h-[1px] shrink-0 bg-border"></div>
      </h1>

      <SkippedProfiles profiles={skippedProfiles ?? []} />
    </div>
  );
}
