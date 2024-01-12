import { createServerClient } from "@/lib/supabase-server";
import { formatDistance } from "date-fns";
import uk from "date-fns/locale/uk";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { SkippedProfiles } from "./skipped-profiles";
import { GoBack } from "@/components/go-back";
import { Separator } from "@/components/ui/separator";

export default async function SkippedProfilesPage() {
  redirect("/discover");
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

  // const { data: skippedProfiles, error } = await supabase
  //   .from("skipped_profiles")
  //   .select("id,created_at, object(id,first_name, photos(src))")
  //   .eq("subject", session.user.id)
  //   .returns<ISkippedProfiles[]>();

  return (
    <div className="flex flex-col gap-4 p-4 pb-20 md:mx-auto md:w-fit">
      <h1 className="mb-0 flex w-full items-center gap-3 self-start text-3xl font-bold md:mb-4">
        <GoBack />
        Переглянуті профілі
      </h1>
      <Separator className="md:hidden" />
      {/* <SkippedProfiles profiles={skippedProfiles ?? []} /> */}
    </div>
  );
}
