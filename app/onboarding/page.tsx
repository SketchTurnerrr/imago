import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { OnboardingFlow } from "./onboarding-flow";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function Onboarding() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <OnboardingFlow userId={user.id || ""} />
    // <div className="flex h-[100svh] flex-col items-center justify-center p-4">
    //   <div className="flex flex-col items-center gap-40">
    //     <div className="">
    //       <Image
    //         src="/start-onboarding.png"
    //         alt="Illustration from absurd.design"
    //         width={300}
    //         height={300}
    //         className="mx-auto mb-4 dark:bg-foreground"
    //       />
    //       <h1 className=" px-8 text-2xl font-bold">
    //         Давайте спершу заповнимо базову інформацію
    //       </h1>
    //     </div>
    //     <Button
    //       className="bg-purple-400 px-8 py-6 text-2xl font-bold hover:bg-purple-500"
    //       asChild
    //     >
    //       <Link href={"onboarding/first-name"}>Почати</Link>
    //     </Button>
    //   </div>
    // </div>
  );
}
