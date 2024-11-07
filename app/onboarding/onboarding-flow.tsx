"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Toggle } from "@/components/ui/toggle";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { locations } from "@/lib/constants";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Age } from "./age/age";
import { PhotoManager } from "@/components/photo-manager";
import { PromptManager } from "@/components/prompt-manager";
import { createClient } from "@/lib/supabase/client";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Ім`я має бути не менше 2 символів",
  }),
  dateOfBirth: z.date(),
  denomination: z.enum([
    "Католізм",
    "Православ'я",
    "Євангелізм",
    "Баптизм",
    "П'ятидесятництво",
    "Неконфесійна",
    "Інше",
  ]),
  gender: z.enum(["male", "female"]),
  location: z.string(),
  custom_location: z.string().optional(),
});

const steps = [
  "Name",
  "Date of Birth",
  "Gender",
  "Denomination",
  "Location",
  "Prompts",
  "Photos",
  "Finish",
];

export function OnboardingFlow({ userId }: { userId: string }) {
  const [currentStep, setCurrentStep] = useState(0);

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      dateOfBirth: new Date(2007, 0, 17),
      gender: "male",
      denomination: "Інше",
      location: "Київ",
      custom_location: "",
    },
  });

  const nextStep = () => {
    console.log("currentStep :", currentStep);
    console.log("steps.length :", steps.length);
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("values :", values);
    const supabase = createClient();

    if (currentStep === steps.length) {
      const { error } = await supabase
        .from("profiles")
        .update({
          name: values.name,
          gender: values.gender,
          location: values.location,
          custom_location: values.custom_location
            ? values.custom_location
            : null,
          onboarded: true,
          verified: false,
        })
        .eq("id", userId);

      console.log("error :", error);
      // Optionally, redirect the user after successful submission

      router.push("/");
    } else {
      nextStep();
    }
  }

  const handleNextStep = () => {
    console.log("steps :", steps);
    console.log(" here:");
    if (isStepValid()) {
      if (currentStep === steps.length) {
        form.handleSubmit(onSubmit)();
      } else {
        nextStep();
      }
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <WelcomeStep />;

      case 2:
        return <DateOfBirthStep />;
      case 3:
        return <GenderStep />;
      case 4:
        return <DenominationStep />;
      case 5:
        return <LocationStep />;
      case 6:
        return <PromptStep />;
      case 7:
        return <PhotoStep />;
      case 8:
        return <FinishStep />;
      default:
        return null;
    }
  };

  const isStepValid = () => {
    console.log(currentStep, "currentStep");
    switch (currentStep) {
      case 0:
        return true;
      case 1:
        return !!form.getValues("name") && form.formState.isValid;
      case 2:
        return !!form.getValues("gender");
      case 2:
        return !!form.getValues("denomination");
      case 3:
        return !!form.getValues("dateOfBirth");
      case 4:
        return !!form.getValues("location");
      case 5:
        // prompts
        return true;
      case 6:
        // photos
        return true;

      default:
        return true;
    }
  };

  return (
    <Form {...form}>
      <div className="mx-auto flex h-[100svh] max-w-md flex-col rounded-lg p-6 md:w-[500px]">
        <div className="mb-6 flex items-center gap-4">
          {currentStep > 1 && (
            <Button type="button" onClick={prevStep} variant="ghost">
              <ChevronLeft className="h-4 w-4 " />
            </Button>
          )}
          {currentStep !== 0 && (
            <>
              <span className="block whitespace-nowrap text-sm text-gray-500">
                {currentStep} з 8
              </span>

              <div className="h-2 w-full rounded-full bg-gray-200 ">
                <div
                  className="h-2 rounded-full bg-blue-600 transition-all duration-300 ease-in-out"
                  style={{ width: `${(currentStep / 8) * 100}%` }}
                ></div>
              </div>
            </>
          )}
        </div>
        {currentStep === 1 && (
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="mt-20 self-center">
                <FormLabel className="text-4xl font-bold uppercase">
                  Як вас звати?
                </FormLabel>
                <FormControl>
                  <Input placeholder="Ваше ім'я" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        {currentStep !== 1 && renderStep()}
        {currentStep !== 2 && currentStep !== 6 && currentStep !== 7 && (
          <div className="mt-auto flex justify-between">
            <Button
              disabled={!isStepValid()}
              type="button"
              onClick={handleNextStep}
              className="ml-auto"
            >
              {currentStep === steps.length ? "Завершити" : "Далі"}
              {currentStep !== steps.length && (
                <ChevronRight className="ml-2 h-4 w-4" />
              )}
            </Button>
          </div>
        )}
      </div>
    </Form>
  );

  function WelcomeStep() {
    return (
      <div className="mt-20">
        <h1 className="mb-10 text-xl">
          Давайте спершу заповнимо базову інформацію
        </h1>
        <Image
          src="/start-onboarding.png"
          alt="start onboarding"
          width={500}
          height={500}
          className="rounded-md dark:bg-slate-300"
        />
      </div>
    );
  }

  function DateOfBirthStep() {
    return <Age userId={userId} onComplete={nextStep} />;
  }

  function GenderStep() {
    return (
      <FormField
        control={form.control}
        name="gender"
        render={({ field }) => (
          <FormItem className="mt-20 self-center">
            <FormLabel className="mb-5 block text-4xl font-bold uppercase">
              Стать
            </FormLabel>
            <FormControl>
              <div className="flex flex-col gap-8">
                <div className="flex items-center gap-2">
                  <Toggle
                    className="bg-accent data-[state=on]:bg-purple-400 data-[state=on]:text-white"
                    pressed={field.value === "male"}
                    onClick={() => field.onChange("male")}
                    id="male"
                  >
                    Чоловіча
                  </Toggle>
                  <Toggle
                    className="bg-accent data-[state=on]:bg-purple-400 data-[state=on]:text-white"
                    pressed={field.value === "female"}
                    onClick={() => field.onChange("female")}
                    id="female"
                  >
                    Жіноча
                  </Toggle>
                </div>
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    );
  }

  function DenominationStep() {
    return (
      <FormField
        control={form.control}
        name="denomination"
        render={({ field }) => (
          <FormItem className="mt-20 self-center">
            <FormLabel className="mb-5 block text-4xl font-bold uppercase">
              Ваша конфесія?
            </FormLabel>
            <FormControl>
              <div className="flex flex-col gap-8">
                <div className="flex flex-wrap items-center gap-3">
                  <Toggle
                    className="bg-accent font-semibold data-[state=on]:bg-purple-400 data-[state=on]:text-white"
                    pressed={field.value === "Католізм"}
                    onClick={() => field.onChange("Католізм")}
                  >
                    Католізм
                  </Toggle>

                  <Toggle
                    className="bg-accent font-semibold data-[state=on]:bg-purple-400 data-[state=on]:text-white"
                    onClick={() => field.onChange("Православ'я")}
                    pressed={field.value === "Православ'я"}
                    id="ortho"
                  >
                    Православ&apos;я
                  </Toggle>

                  <Toggle
                    className="bg-accent font-semibold data-[state=on]:bg-purple-400 data-[state=on]:text-white"
                    onClick={() => field.onChange("Баптизм")}
                    pressed={field.value === "Баптизм"}
                    id="baptist"
                  >
                    Баптизм
                  </Toggle>

                  <Toggle
                    className="bg-accent font-semibold data-[state=on]:bg-purple-400 data-[state=on]:text-white"
                    onClick={() => field.onChange("П'ятидесятництво")}
                    pressed={field.value === "П'ятидесятництво"}
                    id="pentecostal"
                  >
                    П&apos;ятидесятництво
                  </Toggle>

                  <Toggle
                    className="bg-accent font-semibold data-[state=on]:bg-purple-400 data-[state=on]:text-white"
                    onClick={() => field.onChange("Неконфесійна")}
                    pressed={field.value === "Неконфесійна"}
                    id="nondeno"
                  >
                    Неконфесійна
                  </Toggle>

                  <Toggle
                    className="bg-accent font-semibold data-[state=on]:bg-purple-400 data-[state=on]:text-white"
                    onClick={() => field.onChange("Інше")}
                    pressed={field.value === "Інше"}
                    id="other"
                  >
                    Інше
                  </Toggle>
                </div>
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    );
  }

  function LocationStep() {
    return (
      <>
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem className="mt-20 ">
              <FormLabel className="mb-5 block text-4xl font-bold uppercase">
                Звідки ви?
              </FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Місто" />
                  </SelectTrigger>
                  <SelectContent className="max-h-[20rem] overflow-y-auto">
                    <SelectGroup>
                      {locations.map((item) => (
                        <SelectItem
                          key={item.value}
                          value={item.value}
                          className="flex items-center gap-2"
                        >
                          <span>{item.label}</span>
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="custom_location"
          render={({ field }) => (
            <FormItem className="mt-4 ">
              <FormLabel className="mb-5 block text-xl font-bold uppercase">
                Або введіть ваш місто
              </FormLabel>
              <FormControl>
                <Input
                  type="text"
                  className="w-[180px]"
                  {...field}
                  placeholder="Біла Церква"
                />
              </FormControl>
            </FormItem>
          )}
        />
      </>
    );
  }

  function PromptStep() {
    return <PromptManager onComplete={nextStep} userId={userId} />;
  }

  function PhotoStep() {
    return (
      <PhotoManager onComplete={nextStep} onboarding={true} userId={userId} />
    );
  }

  function FinishStep() {
    return (
      <div className="mt-20">
        <h1 className="mb-10 text-4xl">Нарешті все готово!</h1>
        <Image
          src="/finish-onboarding.png"
          alt="finish onboarding"
          width={500}
          height={500}
          className="rounded-md dark:bg-slate-300"
        />
      </div>
    );
  }
}
