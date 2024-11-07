// "use client";
// import Image from "next/image";
// import { ReloadIcon, StarIcon, UploadIcon } from "@radix-ui/react-icons";
// import { Input } from "@/components/ui/input";
// import { useRef, useState } from "react";
// import { useRouter } from "next/navigation";
// import { toast } from "@/components/ui/use-toast";
// import { cn } from "@/lib/utils";
// import { createClient } from "@/lib/supabase/client";
// import { Photo } from "@/types";

// interface IPhotoGrid {
//   photos: Photo[];
//   user: { id: string };
// }
// export function PhotoGrid({ photos, user }: IPhotoGrid) {
//   const inputRef = useRef<HTMLInputElement>(null);
//   const [imgLoading, setImgLoading] = useState(true);
//   const [loading, setLoading] = useState(false);
//   const [fileName, setFilename] = useState("");
//   const [selectedPlaceholder, setSelectedPlaceholder] = useState<number | null>(
//     null,
//   );
//   const supabase = createClient();
//   const router = useRouter();
//   const filledPhotos = photos.concat(
//     Array.from({ length: Math.max(6 - photos.length, 0) }),
//   );

//   const handleDelete = async (id: string) => {
//     const { error } = await supabase.from("photos").delete().eq("id", id);
//     const { error: storageError } = await supabase.storage
//       .from("photos")
//       .remove([`${user.id}/${fileName}`]);
//     router.refresh();
//   };

//   const handlePlaceholderClick = (placeholderId: number) => {
//     if (!loading) {
//       inputRef.current?.click();
//       setSelectedPlaceholder(placeholderId);
//     }
//   };

//   const uploadPhoto: React.ChangeEventHandler<HTMLInputElement> = async (e) => {
//     if (!e.target.files || e.target.files.length === 0) {
//       return;
//     }

//     try {
//       setLoading(true);
//       if (!e.target.files || e.target.files.length === 0) {
//         throw new Error("Будь ласка оберіть фото");
//       }

//       const file = e.target.files[0];
//       setFilename(file.name);
//       const fileExt = file.name.split(".").pop();
//       const filePath = `${user?.id}/${file.name}`;
//       const { data, error: uploadError } = await supabase.storage
//         .from("photos")
//         .upload(filePath, file);

//       //@ts-ignore
//       if (uploadError?.statusCode === "409") {
//         toast({
//           variant: "destructive",
//           title: "Йой, щось пішло те так",
//           description: "Ви вже завантажили це фото",
//         });
//       }

//       //@ts-ignore
//       if (uploadError?.statusCode === "413") {
//         toast({
//           variant: "destructive",
//           title: "Йой, щось пішло те так",
//           description: "Фото має бути не більше ніж 3 мегабайти",
//         });
//       }

//       if (data) {
//         const baseUrl =
//           "https://beasnruicmydtdgqozev.supabase.co/storage/v1/object/public/photos/";

//         const { error: insertError } = await supabase.from("photos").insert({
//           profile_id: user.id,
//           src: `${baseUrl}/${data.path}`,
//         });

//         if (
//           insertError?.message ===
//           'duplicate key value violates unique constraint "photos_src_key"'
//         ) {
//         }
//       }

//       console.log("data :", data);
//     } catch (error) {
//       console.log(error, "catch error");
//     } finally {
//       setLoading(false);
//       setSelectedPlaceholder(null);
//       router.refresh();
//     }
//   };

//   async function setPhotoAsMain(photoId: string) {
//     const { error } = await supabase
//       .from("photos")
//       .update({
//         updated_at: new Date(),
//       })
//       .eq("id", photoId);
//     router.refresh();
//     console.log("error :", error);
//   }

//   return (
//     <>
//       <Input
//         name="photoUpload"
//         ref={inputRef}
//         onChange={uploadPhoto}
//         disabled={loading}
//         type="file"
//         accept="image/*"
//         className="pointer-events-none m-0 h-0 w-0 overflow-hidden p-0 leading-[0] opacity-0"
//       />
//       <div className="first-photo mx-auto mb-4 grid grid-cols-3 gap-2">
//         {filledPhotos.map(
//           (photo: { src: string; id: string }, index: number) => (
//             <div
//               key={index}
//               className="group first:col-start-1 first:col-end-3 first:row-start-1 first:row-end-3"
//             >
//               {photo?.src ? (
//                 <div className="relative">
//                   <div
//                     onClick={() => setPhotoAsMain(photo.id)}
//                     className="absolute z-10 grid h-full w-full cursor-pointer place-items-center text-sm text-white opacity-0 group-hover:opacity-100 md:text-base"
//                   >
//                     <p>Зробити головним</p>
//                   </div>

//                   <div className="aspect-square">
//                     <Image
//                       fill
//                       className={cn(
//                         "rounded-lg object-cover duration-700 ease-in-out",
//                         imgLoading
//                           ? "scale-90 blur-lg grayscale"
//                           : "scale-100 blur-0 grayscale-0",
//                       )}
//                       src={photo?.src}
//                       alt="person"
//                       onLoad={() => setImgLoading(false)}
//                     />
//                   </div>
//                   <div
//                     onClick={() => handleDelete(photo.id)}
//                     role="button"
//                     className="absolute -right-1 -top-1 z-10 rounded-full bg-white p-1 shadow-md"
//                   >
//                     <Image
//                       src="/x.svg"
//                       width={14}
//                       height={14}
//                       alt="close icon"
//                     />
//                   </div>
//                 </div>
//               ) : (
//                 <div
//                   key={index}
//                   onClick={() => handlePlaceholderClick(index)}
//                   className="flex h-full w-full items-center justify-center"
//                 >
//                   {loading && selectedPlaceholder === index ? (
//                     <ReloadIcon className="h-6 w-6 animate-spin text-purple-300" />
//                   ) : (
//                     <div className="relative flex items-center justify-center">
//                       <Image
//                         className="cursor-pointer rounded-lg border-2 border-dashed border-orange-300"
//                         src="/placeholder.png"
//                         width={150}
//                         height={150}
//                         alt="placeholder"
//                       />
//                       <UploadIcon className="absolute h-10 w-10 cursor-pointer text-white" />
//                     </div>
//                   )}
//                 </div>
//               )}
//             </div>
//           ),
//         )}
//       </div>
//     </>
//   );
// }
