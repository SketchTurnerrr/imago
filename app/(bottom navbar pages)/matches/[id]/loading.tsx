import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

export default function LoadingMessages() {
  return (
    <div className="flex h-[100svh] flex-col md:mx-auto md:w-[700px]">
      <h1 className="w-full self-start p-6"></h1>
      <Separator />
      <div className="flex w-full items-center gap-4 p-4">
        <Skeleton className=" aspect-square h-20 w-20 rounded-full " />
        <div className=" w-4/5 ">
          <Skeleton className="mb-4 h-4 w-1/2 " />
          <Skeleton className=" h-4 " />
        </div>
      </div>
      {/* <div className="flex w-full items-center gap-4 p-4">
        <Skeleton className=" aspect-square h-20 w-20 rounded-full " />
        <div className=" w-4/5 ">
          <Skeleton className="mb-4 h-4 w-1/2 " />
          <Skeleton className=" h-4 " />
        </div>
      </div>
      <div className="flex w-full items-center gap-4 p-4">
        <Skeleton className=" aspect-square h-20 w-20 rounded-full " />
        <div className=" w-4/5 ">
          <Skeleton className="mb-4 h-4 w-1/2 " />
          <Skeleton className=" h-4 " />
        </div>
      </div> */}
    </div>
  );
}
