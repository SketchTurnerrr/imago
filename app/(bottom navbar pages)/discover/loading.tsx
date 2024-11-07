import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <main className="flex min-h-[100svh] flex-col space-y-4 p-4 md:items-center">
      <Skeleton className="h-4 w-[150px]" />

      <Skeleton className="h-[400px]" />

      <Skeleton className="h-20 " />

      <Skeleton className="h-[400px]" />

      <Skeleton className="h-4 w-[250px]" />

      <div className="pb-20"></div>
    </main>
  );
}
