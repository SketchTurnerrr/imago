"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import { ThumbsUp } from "lucide-react";
import { toast, useToast } from "./ui/use-toast";

interface ILikeDialog {
  itemId: string;
  liker?: string;
  likee?: string;
  type: "prompt" | "photo" | "match";
  name?: string | undefined;
  url?: string | null;
  question?: string | null;
  answer?: string | null;
}

const FormSchema = z.object({
  comment: z.string(),
});

export function LikeDialog({
  itemId,
  liker,
  likee,
  type,
  name,
  url,
  question,
  answer,
}: ILikeDialog) {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      comment: "",
    },
  });

  const handleLike = async (data: z.infer<typeof FormSchema>) => {
    const { comment } = data;

    if (type === "photo" && itemId && liker && likee) {
      try {
      } catch (error) {
        toast({
          title: "Йой",
          description: "Ви вже вподобали це фото",
          variant: "warning",
        });
      }
    }

    if (type === "prompt" && itemId && liker && likee) {
      try {
      } catch (error) {
        toast({
          title: "Йой",
          description: "Ви вже вподобали цю відповідь",
          variant: "warning",
        });
      }
    }

    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          size="icon"
          className="absolute bottom-2 right-2 h-12 w-12 rounded-full bg-white text-primary hover:bg-white"
        >
          <ThumbsUp />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[350px] border-none bg-transparent shadow-none lg:border-inherit lg:bg-background lg:shadow-md">
        <DialogHeader>
          <DialogTitle className="text-3xl">
            {type === "photo" ? name : ""}
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-2">
          {url && (
            <Image
              src={url}
              alt={name!}
              width={300}
              height={300}
              className="aspect-square w-full rounded-lg object-cover"
            />
          )}
          {type === "prompt" && (
            <div className="relative space-y-4 rounded-lg bg-primary px-4 py-10 text-primary-foreground ">
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
                        className=""
                        maxLength={140}
                        autoComplete="off"
                        placeholder="Залишити коментар"
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button className="text-base font-bold" type="submit">
                Вподобати
              </Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
