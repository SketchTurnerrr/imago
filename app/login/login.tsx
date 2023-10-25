"use client";
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
import Image from "next/image";
import {
  Session,
  createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { useToast } from "@/components/ui/use-toast";
import { redirect } from "next/navigation";
import { useState } from "react";

const formSchema = z.object({
  email: z.string().email({ message: "Це не схоже на адресу" }).min(2, {
    message: "Username must be at least 2 characters.",
  }),
});

export function SignIn({ session }: { session: Session | null }) {
  const [disableOtpBtn, setDisableOtpBtn] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(5);
  const supabase = createClientComponentClient();

  if (session) {
    redirect("/discover");
  }

  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  async function signInWithGoogle() {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    });
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setDisableOtpBtn(true);
      await supabase.auth.signInWithOtp({
        email: values.email,
        options: {
          emailRedirectTo: `${location.origin}/auth/callback`,
          data: {
            email: values.email,
            name: null,
            avatar_url: null,
          },
        },
      });

      const timeout = setInterval(() => {
        return setSecondsLeft((prev) => prev - 1);
      }, 1000);

      setTimeout(() => {
        setDisableOtpBtn(false);
        setSecondsLeft(5);

        clearInterval(timeout);
      }, secondsLeft * 1000);
      console.log(" :", timeout);
    } catch (error) {
      console.log("error :", error);
    }

    toast({
      title: "Перевірте, будь ласка свою пошту",
      description: "У листі ви знайдете посилання для входу",
      duration: 10000,
      style: { backgroundColor: "#bbf7d0" },
    });
  }

  return (
    <div className="grid h-screen w-full place-items-center">
      <div className="w-full md:max-w-sm">
        <h1 className="mb-4 text-center text-4xl font-bold">Привіт!</h1>
        <div className="rounded-lg   p-5 ">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    {/* <FormLabel>Email</FormLabel> */}
                    <FormControl>
                      <Input
                        className="py-6"
                        placeholder="Електронна адреса"
                        type="email"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="rounded-sm border border-gray-400 p-2">
                <p className="text-sm text-gray-400">
                  ✨ Непотрібно ніяких паролів, ми відправимо вам на пошту
                  посилання для входу.
                </p>
              </div>
              <Button
                disabled={disableOtpBtn}
                className="w-full bg-purple-400 p-6 text-lg font-bold hover:bg-purple-500"
                type="submit"
              >
                Отримати посилання {secondsLeft < 60 && `(${secondsLeft})`}
              </Button>
              <p className="text-center">або</p>
            </form>
          </Form>
          <Button
            variant="outline"
            className="w-full p-6 text-lg font-bold"
            type="submit"
            onClick={signInWithGoogle}
          >
            <Image
              src="/google-logo.svg"
              alt="Google Logo"
              className="mr-2 dark:invert"
              width={24}
              height={24}
              priority
            />
            Увійти з Google
          </Button>
        </div>
      </div>
    </div>
  );
}
