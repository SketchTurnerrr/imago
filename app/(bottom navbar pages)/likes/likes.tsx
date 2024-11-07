"use client";
import { Separator } from "@/components/ui/separator";
import { LikesType } from "@/types";
import Image from "next/image";
import Link from "next/link";

export function Likes({ likes }: { likes: LikesType }) {
  return (
    <main className="flex min-h-[100svh] flex-col gap-4 p-4 md:mx-auto md:w-[700px]">
      {/* IF EMPTY PAGE */}
      <h1 className="self-start text-4xl font-bold md:mb-4">Вподобали вас</h1>
      <Separator className="md:hidden" />
      {likes.length === 0 && (
        <>
          <Image
            src="/no-likes.png"
            width={300}
            height={300}
            alt="illustration"
            className="self-center dark:bg-foreground"
          />
          <p className="self-center">
            <span className="font-bold">Поки що</span>, немає вподобань
          </p>
        </>
      )}

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:mx-auto lg:min-w-[550px]">
        {likes.map((like) => {
          const gender =
            like?.sender?.gender === "male" ? "Вподобав" : "Вподобала";
          const type = !like?.prompt ? "фото" : "відповідь";
          const conjunction = !like?.prompt ? "ваше" : "вашу";
          return (
            <div key={like.id} className="mb-8">
              <div className="relative ">
                <div className="w-full rounded-lg rounded-bl-none bg-secondary p-2 text-sm">
                  {like.comment
                    ? like.comment
                    : `${gender} ${conjunction} ${type}`}
                </div>
              </div>

              <Link
                href={{
                  pathname: `/likes/${like.id}`,
                }}
              >
                <span className="mb-4 text-4xl font-bold capitalize">
                  {like?.sender?.name}
                </span>
                <Image
                  src={like.sender?.photos[0]?.url || "/error-image.jpg"}
                  width={800}
                  height={800}
                  alt={"person"}
                  className="aspect-square rounded-lg object-cover"
                />
              </Link>
            </div>
          );
        })}
      </div>
    </main>
  );
}
