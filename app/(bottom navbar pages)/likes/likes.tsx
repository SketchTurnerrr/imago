import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import Link from "next/link";

interface PageProps {
  photoLikes: PhotoLike[];
  promptLikes: PromptLike[];
}

export function Likes({ photoLikes, promptLikes }: PageProps) {
  return (
    <main className="flex min-h-[100svh] flex-col gap-4 p-4 md:mx-auto md:w-[700px]">
      {/* IF EMPTY PAGE */}
      <h1 className="self-start text-4xl font-bold md:mb-4">Вподобали вас</h1>
      <Separator className="md:hidden" />
      {photoLikes.length === 0 && promptLikes.length === 0 && (
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

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:mx-auto lg:max-w-2xl">
        {photoLikes?.map((item) => (
          <div key={item.id} className="mb-8">
            <div className="relative ">
              <div className="w-fit rounded-lg rounded-bl-none bg-secondary p-2 text-sm">
                {item.comment
                  ? item.comment
                  : item.liker.gender === "male"
                  ? "Вподобав" + " ваше фото"
                  : "Вподобала" + " ваше фото"}
              </div>
            </div>

            <Link
              href={{
                pathname: `/likes/${item.liker.id}`,
                query: {
                  likeId: item.id,
                  t: "ph",
                },
              }}
            >
              <h1 className="mb-4 text-4xl font-bold capitalize">
                {item.liker.first_name}
              </h1>
              <Image
                src={item.liker.photos[0].src}
                width={800}
                height={800}
                alt={"person"}
                className="aspect-square rounded-lg object-cover"
              />
            </Link>
          </div>
        ))}

        {promptLikes?.map((item) => (
          <div key={item.id} className="mb-8">
            <div className="relative ">
              <div className="w-fit rounded-lg rounded-bl-none bg-secondary p-2 text-[13px] ">
                {item.liker.gender === "male" ? "Вподобав " : "Вподобала "}
                вашу відповідь
              </div>
            </div>
            <Link
              href={{
                pathname: `/likes/${item.liker.id}`,
                query: {
                  likeId: item.id,
                  t: "p",
                },
              }}
            >
              <h1 className="mb-4 text-4xl font-bold capitalize">
                {item.liker.first_name}
              </h1>
              <Image
                src={item.liker.photos[0].src}
                width={800}
                height={800}
                alt={item.liker.first_name}
                className="aspect-square rounded-lg object-cover"
              />
            </Link>
          </div>
        ))}
      </div>
    </main>
  );
}
