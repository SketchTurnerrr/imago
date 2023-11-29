import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <main className="flex min-h-[100svh] flex-col space-y-4 p-4 md:items-center">
      <Skeleton className="h-4 w-[150px]" />

      {/*       
      ----- INFO 
      */}

      <Skeleton className="h-[400px]" />

      {/*       
      ----- PHOTO1
      */}

      <Skeleton className="h-20 " />

      {/*       
      ----- PHOTO2
      */}

      <Skeleton className="h-[400px]" />

      <Skeleton className="h-4 w-[250px]" />

      {/*       
      ----- PHOTO3
      */}

      {/*       
      ----- PHOTO4
      */}

      {/*       
      ----- PHOTO5
      */}

      <div className="pb-20"></div>
    </main>
  );
}
