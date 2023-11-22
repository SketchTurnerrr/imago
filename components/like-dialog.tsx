"use client";
import { Button } from "@/components/ui/button";
import {
  LDialog,
  LDialogContent,
  LDialogHeader,
  LDialogTitle,
  LDialogTrigger,
} from "@/components/ui/custom-like-dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import ThumbsUp from "@/public/thumbs-up.svg";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Image from "next/image";
import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Prompt } from "./prompt";

interface ILikeDialog {
  itemId: string;
  liker: string;
  likee: string;
  type: "prompt" | "photo" | "match";
  firstName: string | null;
  src: string | null;
  question: string | null;
  answer: string | null;
}

const FormSchema = z.object({
  comment: z.string(),
});

export function LikeDialog({
  itemId,
  liker,
  likee,
  type,
  firstName,
  src,
  question,
  answer,
}: ILikeDialog) {
  const supabase = createClientComponentClient<Database>();
  const [open, setOpen] = useState(false);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      comment: "",
    },
  });
  const handleLike = async (data: z.infer<typeof FormSchema>) => {
    const { comment } = data;

    if (type === "photo" && itemId) {
      const { error } = await supabase.from("photo_likes").insert({
        photo: itemId,
        liker: liker,
        likee: likee,
        comment: comment ? comment : null,
      });

      console.log(" like error:", error);
    }

    if (type === "prompt") {
      const { error } = await supabase.from("prompt_likes").insert({
        prompt: itemId,
        liker: liker,
        likee: likee,
        comment: comment ? comment : null,
      });
      console.log(" like error:", error);
    }

    setOpen(false);
  };

  return (
    <LDialog open={open} onOpenChange={setOpen}>
      <LDialogTrigger asChild>
        <Button
          size="icon"
          className="absolute bottom-2 right-2 h-12 w-12 rounded-full bg-white text-primary"
        >
          <ThumbsUp />
        </Button>
      </LDialogTrigger>
      <LDialogContent className="max-w-[350px] border-none bg-transparent shadow-none">
        <LDialogHeader>
          <LDialogTitle className="text-3xl">
            {type === "photo" ? firstName : ""}
          </LDialogTitle>
        </LDialogHeader>
        <div className="flex flex-col gap-2">
          {src && (
            <Image
              src={src}
              alt={firstName!}
              width={300}
              height={300}
              className="aspect-square w-full rounded-lg object-cover"
            />
          )}
          {type === "prompt" && (
            <div className="relative space-y-4 rounded-lg bg-primary px-4 py-10 text-primary-foreground md:w-[500px]">
              <p className="text-md font-semibold">{question}</p>
              <h2 className="text-3xl font-bold">{answer}</h2>
            </div>
          )}
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleLike)}
              className="flex flex-col gap-2"
            >
              <FormField
                control={form.control}
                name="comment"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        className="bg-white"
                        maxLength={140}
                        autoComplete="off"
                        placeholder="Залишити коментар"
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                className="text-base font-bold"
                type="submit"
                // onClick={handleLike}
              >
                Вподобати
              </Button>
            </form>
          </Form>
        </div>
      </LDialogContent>
    </LDialog>
  );
}
