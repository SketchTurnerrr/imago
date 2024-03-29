"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { useState } from "react";
import promptQuestions from "./options";
import { User } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/client";

const FormSchema = z.object({
  question: z.string({
    required_error: "Будь ласка, оберіть фразу",
  }),
  answer: z
    .string({
      required_error: "Це поле обов'язкове",
    })
    .max(179, "Максимум 180 символів"),
});

export function AddPromptDialog({ user }: { user: User }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const supabase = createClient();

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    if (user) {
      await supabase.from("prompts").insert({
        question: data.question,
        answer: data.answer,
        profile_id: user.id,
      });
    }

    router.refresh();

    setOpen(false);
    form.reset();
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className="relative flex flex-col rounded-lg border-2 border-dashed border-gray-300 bg-slate-50 p-4 text-sm font-bold text-gray-500 dark:bg-secondary dark:text-gray-300">
          <p>Оберіть фразу</p>
          <p>І дайте на неї відповідь</p>
          <Image
            src="/plus.svg"
            width={24}
            height={24}
            alt="plus icon"
            className="absolute -right-2 -top-2"
          />
        </div>
      </DialogTrigger>
      <DialogContent className="w-[350px] md:w-[400px]">
        <DialogHeader>
          <DialogTitle className="font-bold">Оберіть фразу</DialogTitle>
          <DialogDescription>
            Ваші відповіді допоможуть почати розмову
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="question"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Фраза</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Оберіть фразу" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="max-h-[10rem] overflow-y-auto">
                      {promptQuestions.map((prompt) => (
                        <SelectItem key={prompt} value={prompt}>
                          {prompt}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="answer"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Відповідь</FormLabel>

                  <Textarea maxLength={180} {...field} id="answer" />
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit">Зберегти</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
