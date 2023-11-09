import { createServerClient } from "@/lib/supabase-server";
import { formatDistance } from "date-fns";
import uk from "date-fns/locale/uk";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

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
    .select("created_at, object(id,first_name, photos(src))")
    .eq("subject", session.user.id)
    .returns<ISkippedProfiles[]>();
  console.log("skippedProfiles :", skippedProfiles?.[0].created_at);

  return (
    <div className="flex flex-col gap-4 p-4 pb-20 md:mx-auto md:w-fit">
      <h1 className="mb-4 w-full self-start text-4xl font-bold">
        Переглянуті профілі
        <div className="mt-4 h-[1px] shrink-0 bg-border"></div>
      </h1>

      {skippedProfiles?.map((profile) => {
        const when = formatDistance(new Date(profile.created_at), new Date(), {
          addSuffix: true,
          locale: uk,
        });

        return (
          <div className="flex gap-4 md:mx-auto md:min-w-[500px] ">
            <img
              className="aspect-square h-14 w-14 rounded-full object-cover"
              src={profile.object.photos[0].src}
              alt="a"
              width={50}
              height={50}
            />
            <div className="self-center">
              <p className="font-bold dark:font-normal">
                {profile.object.first_name}
              </p>
              <p className="text-muted-foreground">{when}</p>
            </div>

            <Link
              className="ml-auto self-center"
              href={`skipped-profiles/${profile.object.id}`}
            >
              <ChevronRight />
            </Link>
          </div>
        );
      })}
    </div>
  );
}
