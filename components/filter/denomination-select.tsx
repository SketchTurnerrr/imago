"use client";

import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";

export function DenominationSelect({
  onChange,
  FormSchema,
}: {
  onChange: (denomination: string) => void;
  FormSchema: z.ZodObject<{ denomination: z.ZodString }>;
}) {
  const form = useForm<z.infer<typeof FormSchema>>({
    //@ts-ignore
    resolver: zodResolver(FormSchema),
  });

  // function onSubmit(data: z.infer<typeof FormSchema>) {

  // }

  return (
    <Select onValueChange={onChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Оберіть конфесію" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="Католізм">Католізм</SelectItem>
          <SelectItem value="Православ'я">Православ&apos;я</SelectItem>
          <SelectItem value="Євангелізм">Євангелізм</SelectItem>
          <SelectItem value="Баптизм">Баптизм</SelectItem>
          <SelectItem value="П'ятидесятництво">
            П&apos;ятидесятництво
          </SelectItem>
          <SelectItem value="Неконфесійна">Неконфесійна</SelectItem>
          <SelectItem value="Інше">Інше</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
