import { formatDistance } from "date-fns";
import { uk } from "date-fns/locale/uk";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { SkippedProfiles } from "./skipped-profiles";
import { Separator } from "@/components/ui/separator";
import { createClient } from "@/lib/supabase/server";
import { FullProfile, SkippedProfile } from "@/types";
import { GoBackBtn } from "@/components/go-back-btn";

export default async function SkippedProfilesPage() {
  redirect("/discover");
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  interface ISkippedProfiles extends Omit<SkippedProfile, "object"> {
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
        <GoBackBtn />
        Переглянуті профілі
      </h1>
      <Separator className="md:hidden" />
      {/* <SkippedProfiles profiles={skippedProfiles ?? []} /> */}
    </div>
  );
}
