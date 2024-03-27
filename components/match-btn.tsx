"use client";

import { Button } from "./ui/button";

import { useRouter } from "next/navigation";
import HandIcon from "@/public/hand-waving.svg";
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
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import Image from "next/image";
import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Prompt } from "./prompt";
import { createClient } from "@/lib/supabase/client";

interface IMatchDialog {
  liker: string;
  likee: string;
  firstName: string | null;
  src: string;
  likeData: { like: PhotoLike | PromptLike; type: string } | null;
}

const FormSchema = z.object({
  comment: z.string(),
});

export function MatchDialog({
  liker,
  likee,
  firstName,
  src,
  likeData,
}: IMatchDialog) {
  const supabase = createClient();
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      comment: "",
    },
  });

  const handleMatch = async (data: z.infer<typeof FormSchema>) => {
    const { comment } = data;

    const { data: conversation, error } = await supabase
      .from("conversations")
      .insert({
        participant1: liker,
        participant2: likee,
      })
      .returns<ConversationsType>()
      .select()
      .single();

    if (comment && conversation) {
      const { error: mError } = await supabase.from("messages").insert({
        content: comment,
        conversation_id: conversation.id,
        sender_id: liker,
      });
      console.log("mError :", mError);
    }

    console.log("error match:", error);
    setOpen(false);
    router.push("/matches");
  };

  if (!likeData) {
    return null; // TODO
  }

  return (
    <LDialog open={open} onOpenChange={setOpen}>
      <LDialogTrigger asChild>
        <div
          style={{ marginTop: 0 }}
          className="sticky top-[85%] z-30 h-0 self-end md:right-[9vw] md:top-[90%] lg:right-10"
        >
          <Button
            size="icon"
            className="h-12 w-12 rounded-full bg-white text-3xl hover:bg-white"
          >
            <HandIcon />
          </Button>
        </div>
      </LDialogTrigger>
      <LDialogContent className="max-w-xs border-none bg-transparent shadow-none md:min-w-[350px]">
        <LDialogHeader>
          <LDialogTitle className="text-3xl">
            {firstName ? firstName : ""}
          </LDialogTitle>
        </LDialogHeader>
        <div className="flex flex-col gap-8">
          {"photo" in likeData.like && (
            <div className="relative h-80">
              <Image
                priority
                src={likeData.like.photo.src}
                alt={firstName!}
                layout="fill"
                className="aspect-square rounded-lg object-cover"
              />
              <div className="absolute -bottom-4 w-fit rounded-lg rounded-bl-none bg-purple-400 p-2 text-sm font-semibold text-white">
                {likeData.like.comment
                  ? likeData.like.comment
                  : likeData.like.liker.gender === "male"
                  ? "Вподобав" + " ваше фото"
                  : "Вподобала" + " ваше фото"}
              </div>
            </div>
          )}

          {"prompt" in likeData.like && (
            <div className="relative">
              <Prompt
                likee=""
                liker=""
                id={likeData.like.id}
                question={likeData.like.prompt.question}
                answer={likeData.like.prompt.answer}
              />
              <div className="absolute -bottom-4 w-fit rounded-lg rounded-bl-none bg-purple-400 p-2 text-sm font-semibold text-white">
                {likeData.like.comment
                  ? likeData.like.comment
                  : likeData.like.liker.gender === "male"
                  ? "Вподобав" + " вашу відповідь"
                  : "Вподобала" + " вашу відповідь"}
              </div>
            </div>
          )}

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleMatch)}
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
                        placeholder="Відправити повідомлення"
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
                Познайомитись
              </Button>
            </form>
          </Form>
        </div>
      </LDialogContent>
    </LDialog>
  );
}
