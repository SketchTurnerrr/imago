import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { redirect } from "next/navigation";
import { User } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/client";
import Image from "next/image";
import { SignInForm } from "./signin-form";

const formSchema = z.object({
  email: z.string().email({ message: "Це не схоже на адресу" }),
});

export default function SignInPage() {
  // async function onSubmit(values: z.infer<typeof formSchema>) {
  //   try {
  //     setDisableOtpBtn(true);
  //     const { error } = await supabase.auth.signInWithOtp({
  //       email: values.email,
  //     });
  //     console.log("error :", error);

  //     const timeout = setInterval(() => {
  //       return setSecondsLeft((prev) => prev - 1);
  //     }, 1000);

  //     setTimeout(() => {
  //       setDisableOtpBtn(false);
  //       setSecondsLeft(60);

  //       clearInterval(timeout);
  //     }, secondsLeft * 1000);
  //   } catch (error) {
  //     console.log("error :", error);
  //   }

  //   toast({
  //     title: "Перевірте, будь ласка свою пошту",
  //     description: "У листі ви знайдете посилання для входу",
  //     duration: 10000,
  //     variant: "success",
  //   });
  // }

  return (
    <div className="grid h-[100svh] w-full place-items-center">
      <div className="w-full md:max-w-sm">
        <Image
          className="mx-auto mb-16 block dark:hidden"
          src={"/logo.svg"}
          width={250}
          height={150}
          alt="imago logo"
        />
        <Image
          className="mx-auto mb-16 hidden dark:block"
          src={"/logo-dark.svg"}
          width={250}
          height={150}
          alt="imago logo"
        />

        <div className="rounded-lg p-5">
          <SignInForm />
        </div>
      </div>
    </div>
  );
}
