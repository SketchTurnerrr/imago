import { Separator } from "@/components/ui/separator";
import { ChevronRightIcon } from "@radix-ui/react-icons";
import Link from "next/link";

export function Account({ userId }: { userId: string }) {
  return (
    <section className="p-4">
      <h1 className="text-3xl font-bold">Акаунт</h1>
      <div className="mb-20 flex h-screen flex-col p-4 pt-20">
        <Link className="text-xl font-bold" href={"/profile/edit"}>
          <div className="flex items-center justify-between">
            Політика конфіденціальності
            <ChevronRightIcon className="h-5 w-5" />
          </div>
        </Link>
        <Separator className="my-4" />
        <Link className="text-xl font-bold" href={"account/verify"}>
          <div className="flex items-center justify-between">
            Верифікувати акаунт
            <ChevronRightIcon className="h-5 w-5" />
          </div>
        </Link>
        <Separator className="my-4" />
      </div>
    </section>
  );
}
