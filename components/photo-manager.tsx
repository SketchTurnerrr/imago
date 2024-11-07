"use client";
import React, { useState } from "react";
import Image from "next/image";

import { ChevronRight, Loader2, UploadIcon } from "lucide-react";
import { Button } from "./ui/button";
import { UploadDropzone } from "@/lib/uploadthing";
import { createClient } from "@/lib/supabase/client";
import { useGetUserPhotos } from "@/hooks/useGetUserPhotos";

const PHOTO_COUNT = 6;

export function PhotoManager({
  userId,
  onComplete,
  onboarding,
}: {
  userId: string;
  onComplete?: () => void;
  onboarding?: boolean;
}) {
  const supabase = createClient();
  const [uploadingIndex, setUploadingIndex] = useState<number | null>(null);
  const { data: photos } = useGetUserPhotos({ userId: userId });
  console.log("photos :", photos);

  if (!photos) {
    return null;
  }
  const isComplete = photos ? photos.length <= 3 : false;

  const handleUpload = async (index: number, url: string) => {
    try {
      setUploadingIndex(null);
    } catch (error) {
      console.error("Error adding photo:", error);
    }
  };

  // const handleRemove = async (photoId: Id<"photos">, photoUrl: string) => {
  //   console.log(" hey:");
  //   try {
  //     await removePhoto({ id: photoId });

  //     await deleteFromUploadThing({ url: photoUrl });
  //   } catch (error) {
  //     console.error("Error removing photo:", error);
  //   }
  // };

  if (photos === undefined) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {onboarding && (
        <h1 className="mb-4 mt-20 text-3xl">Додайте мінімум 3 фото</h1>
      )}
      <div className="grid grid-cols-3 gap-4">
        {Array.from({ length: PHOTO_COUNT }).map((_, index) => {
          const photo = photos.find((p) => p.order === index);
          return (
            <div
              key={index}
              className="group relative flex aspect-square items-center justify-center
              *:mt-0 first:col-start-1 first:col-end-3 first:row-start-1 first:row-end-3"
            >
              {photo ? (
                <>
                  <Image
                    src={photo.url}
                    alt={`Photo ${index + 1}`}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-md"
                  />
                  {!isComplete ? (
                    <div
                      // onClick={() => handleRemove(photo._id, photo.url)}
                      role="button"
                      className="absolute -right-1 -top-1 rounded-full border bg-white p-1 shadow-md dark:border-none"
                    >
                      <Image
                        src="/x.svg"
                        width={14}
                        height={14}
                        alt="close icon"
                        className=""
                      />
                    </div>
                  ) : null}
                </>
              ) : (
                <UploadDropzone
                  endpoint="imageUploader"
                  onClientUploadComplete={(res) => {
                    console.log("res :", res);
                    if (res && res[0]) {
                      handleUpload(index, res[0].url);
                    }
                  }}
                  onUploadBegin={() => setUploadingIndex(index)}
                  onUploadError={(error: Error) => {
                    console.log("error :", error);
                    // Do something with the error.
                    alert(`ERROR! ${error.message}`);
                  }}
                  className="h-full w-full cursor-pointer rounded-lg border-none bg-[url('/placeholder.png')] bg-cover bg-center bg-no-repeat outline-dashed outline-2 outline-orange-300"
                  appearance={{
                    label: "hidden",
                    button: "hidden",
                    allowedContent: "hidden",
                  }}
                  content={{
                    uploadIcon:
                      uploadingIndex === index ? (
                        <Loader2 className="h-10 w-10 animate-spin text-purple-50" />
                      ) : (
                        <UploadIcon className="h-10 w-10 text-white" />
                      ),
                  }}
                  config={{
                    mode: "auto",
                  }}
                />
              )}
            </div>
          );
        })}
      </div>
      {onboarding && (
        <p className="mt-4 text-sm font-semibold text-gray-400">
          Додайте мінімум 3 фото.
        </p>
      )}
      {onboarding && (
        <Button
          onClick={onComplete}
          disabled={!isComplete}
          className="mt-auto self-end"
        >
          {isComplete ? "Далі" : `Додайте ще ${3 - photos.length} фото`}
          <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      )}
    </>
  );
}
