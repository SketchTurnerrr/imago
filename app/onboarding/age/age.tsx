"use client";
import { format } from "date-fns";
// import { CalendarIcon } from 'lucide-react';
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { ChevronRightIcon } from "@radix-ui/react-icons";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { redirect, useRouter } from "next/navigation";
import { uk } from "date-fns/locale/uk";
import { createClient } from "@/lib/supabase/client";
import { User } from "@supabase/supabase-js";

const formSchema = z.object({
  dob: z.date({
    required_error: "Будь ласка оберіть дату свого народження",
  }),
});

export default function Age({
  user,
  onboarded,
}: {
  user: User | undefined;
  onboarded: boolean | undefined;
}) {
  const supabase = createClient();
  const router = useRouter();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const age = new Date()?.getFullYear() - values.dob?.getFullYear();

    if (user) {
      await supabase
        .from("profiles")
        .update({
          date_of_birth: values.dob,
          age: age,
        })
        .eq("id", user.id);

      router.push("gender");
    }
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  if (onboarded) {
    redirect("/discover");
  }

  return (
    <div className="flex h-[100svh] flex-col justify-between p-4 md:mx-auto md:w-[500px]">
      <h1 className="mt-20 text-5xl font-bold">Коли ви народились?</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex h-full flex-col justify-between pt-10 "
        >
          <FormField
            control={form.control}
            name="dob"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"ghost"}
                        className={cn(
                          "mx-auto w-[150px] rounded-none border-b-2 border-b-purple-400 pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground",
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP", { locale: uk })
                        ) : (
                          <span>Оберіть дату</span>
                        )}
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      captionLayout="dropdown-buttons"
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      fromYear={1977}
                      toYear={2006}
                      disabled={(date: Date) =>
                        date > new Date() || date < new Date("1972-01-01")
                      }
                      initialFocus
                      className="border-none"
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
                <FormDescription className="text-center text-2xl font-bold text-slate-800 dark:text-foreground">
                  Вам{" "}
                  {isNaN(new Date().getFullYear() - field.value?.getFullYear())
                    ? "17"
                    : new Date().getFullYear() - field.value?.getFullYear()}
                </FormDescription>
              </FormItem>
            )}
          />
          <Button
            type="submit"
            size="icon"
            className="self-end rounded-full bg-purple-400"
          >
            <ChevronRightIcon className="h-7 w-7" />
          </Button>
        </form>
      </Form>
    </div>
  );
}
