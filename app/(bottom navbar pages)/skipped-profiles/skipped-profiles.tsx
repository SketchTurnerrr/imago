"use client";
import { FullProfile, SkippedProfile } from "@/types";
import { formatDistance } from "date-fns";
import { uk } from "date-fns/locale";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface ISkippedProfiles extends Omit<SkippedProfile, "object"> {
  object: FullProfile;
}

export function SkippedProfiles({
  profiles,
}: {
  profiles: ISkippedProfiles[];
}) {
  return (
    <>
      {profiles.map((profile) => {
        const when = formatDistance(new Date(profile.created_at), new Date(), {
          addSuffix: true,
          locale: uk,
        });

        return (
          <div
            key={profile.id}
            className="flex gap-4 md:mx-auto md:min-w-[500px] "
          >
            <Image
              className="aspect-square h-14 w-14 rounded-full object-cover"
              src={profile.object.photos[0]?.src || "/placeholder.png"}
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
    </>
  );
}
