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
import { uk } from "date-fns/locale/uk";
import { createClient } from "@/lib/supabase/client";

const formSchema = z.object({
  dob: z.date({
    required_error: "Будь ласка оберіть дату свого народження",
  }),
});

export function Age({
  userId,
  onComplete,
}: {
  userId: string;
  onComplete: () => void;
}) {
  const supabase = createClient();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (userId) {
      await supabase
        .from("profiles")
        .update({
          date_of_birth: values.dob.toLocaleDateString(),
        })
        .eq("id", userId);
    }
    onComplete();
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  return (
    <>
      <h1 className="mt-20 text-center text-4xl font-bold">
        Коли ви народились?
      </h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex h-full flex-col justify-between pt-10"
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
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      startMonth={new Date(1977, 0, 1)}
                      endMonth={new Date(2006, 0, 1)}
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
                <FormDescription className="dark:text-foreground text-center text-2xl font-bold text-slate-800">
                  {field.value
                    ? `Вам  ${
                        new Date().getFullYear() - field.value?.getFullYear()
                      }`
                    : null}
                </FormDescription>
              </FormItem>
            )}
          />
          <Button type="submit" className="self-end">
            Далі <ChevronRightIcon className="ml-2 h-4 w-4" />
          </Button>
        </form>
      </Form>
    </>
  );
}
