import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import Link from "next/link";

interface PageProps {
  photoLikes: PhotoLike[];
  promptLikes: PromptLike[];
}

export function Likes({ photoLikes, promptLikes }: PageProps) {
  return (
    <main className="flex min-h-screen flex-col gap-4 p-4">
      {/* IF EMPTY PAGE */}
      <h1 className="self-start text-4xl font-bold">Вподобали вас</h1>
      <Separator />
      {photoLikes.length === 0 && promptLikes.length === 0 && (
        <>
          <a
            target="_blank"
            rel="noopener noreferrer"
            className="self-center"
            href={
              "https://www.behance.net/gallery/176439917/02-Our-little-heart?tracking_source=search_projects|heart+illustration"
            }
          >
            <Image
              src="/likes_you.png"
              width={300}
              height={300}
              alt="https://www.behance.net/gallery/176439917/02-Our-little-heart?tracking_source=search_projects|heart+illustration"
            />
          </a>
          <p className="self-center">
            <span className="font-bold">Поки що</span>, немає вподобань
          </p>
        </>
      )}

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:mx-auto lg:max-w-2xl">
        {photoLikes?.map((item) => (
          <div key={item.id} className="mb-8">
            <div className="relative ">
              <div className="w-fit rounded-lg rounded-bl-none bg-indigo-200 p-2 text-sm">
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
              <div className="w-fit rounded-lg rounded-bl-none bg-purple-300 p-2 text-[13px] text-white">
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
