"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronRightIcon } from "@radix-ui/react-icons";
import {
  createClientComponentClient,
  User,
} from "@supabase/auth-helpers-nextjs";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { redirect, useRouter } from "next/navigation";
import { useState } from "react";

const formSchema = z.object({
  first_name: z
    .string()
    .min(2, {
      message: "Це поле обов'язкове.",
    })
    .max(12),
});

export default function FirstName({
  user,
  onboarded,
}: {
  user: User | undefined;
  onboarded: boolean | undefined;
}) {
  const supabase = createClientComponentClient<Database>();
  const router = useRouter();
  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (user) {
      await supabase
        .from("profiles")
        .update({
          first_name:
            values.first_name.charAt(0).toUpperCase() +
            values.first_name.slice(1),
        })
        .eq("id", user.id);

      router.push("age");
    }
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      first_name: "",
    },
  });

  if (onboarded) {
    redirect("/discover");
  }

  return (
    <div className="flex h-[100svh] flex-col justify-between p-4 md:mx-auto md:w-[500px]">
      <h1 className="mb-10 mt-20 text-5xl font-bold">Як вас звати?</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className=" flex h-full flex-col justify-between "
        >
          <FormField
            control={form.control}
            name="first_name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    className="h-16 rounded-none border-x-0 border-b-[3px] border-t-0 border-b-purple-400 text-3xl shadow-none transition-colors duration-300 ease-linear focus:border-b-purple-500 focus-visible:ring-0"
                    type="text"
                    placeholder="Ваше ім`я"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            size="icon"
            type="submit"
            disabled={!form.formState.isValid}
            className="self-end rounded-full bg-purple-400"
          >
            <ChevronRightIcon className="h-7 w-7" />
          </Button>
        </form>
      </Form>
    </div>
  );
}
