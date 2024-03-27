import { GoBack } from "@/components/go-back";
import { SignOut } from "@/components/signout-btn";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ChevronRightIcon } from "@radix-ui/react-icons";
import Link from "next/link";

export function Account() {
  return (
    <section className="mx-auto p-4 md:w-[500px]">
      <div className="flex items-center gap-3">
        <GoBack />
        <h1 className="text-3xl font-bold">Акаунт</h1>
      </div>
      <div className="mb-20 flex h-[100svh] flex-col p-4 pt-20">
        <Link className="text-xl font-bold" href={"account/privacy-policy"}>
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
        <SignOut />
      </div>
    </section>
  );
}
