"use client";
import { useEffect, useState } from "react";
import * as React from "react";
//@ts-ignore
import confetti from "canvas-confetti";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { toast } from "@/components/ui/use-toast";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { differenceInMinutes } from "date-fns";
import { CheckIcon } from "@radix-ui/react-icons";

export function Subscription({
  userId,
  sub,
}: {
  userId: string;
  sub: SubscriptionType | null;
}) {
  // console.log('sub :', sub);
  const [amount, setAmount] = useState(0);
  const [periodicity, setPeriodicity] = useState("month");
  const [dataBase64, setDataBase64] = useState("");

  const [signatureBase64, setSignatureBase64] = useState("");

  const supabase = createClientComponentClient<Database>();
  const router = useRouter();

  useEffect(() => {
    const liqpay = async () => {
      await fetch("/api/liqpay", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ orderId: userId, amount, periodicity }),
        cache: "no-store",
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setDataBase64(data.dataBase64);
          setSignatureBase64(data.signature);
        })
        .catch((error) => {
          console.error(error);
        });
    };

    liqpay();
  }, [amount, periodicity, userId, supabase]);

  const benefits = [
    {
      title: "Необмежена кількість вподобань",
    },
    {
      title: "Можливість фільтрувати стрічку",
    },
    {
      title: "Можливість повернутись до попереднього профілю",
    },
  ];

  const handlePlan = ({
    amount,
    periodicity,
  }: {
    amount: number;
    periodicity: string;
  }) => {
    setAmount(amount);
    setPeriodicity(periodicity);
  };

  const handleCancelSubscription = async () => {
    try {
      const response = await fetch("/api/liqpay/cancel-subscription", {
        method: "POST",
        body: JSON.stringify({ order_id: userId }),
      });

      if (response.ok) {
        const result = await response.json();
        if ((result.status = "unsubscribed")) {
          await supabase
            .from("subscriptions")
            .delete()
            .eq("profile_id", userId);
          router.refresh();
          toast({
            variant: "default",
            title: "Підписку скасовано",
          });
        } else {
          toast({
            variant: "destructive",
            title: "Йой, щось пішло те так",
          });
        }

        console.log("Cancellation Result:", result);
        // Handle the result as needed
      } else {
        console.error(
          "Failed to cancel subscription:",
          response.status,
          response.statusText,
        );
        // Handle the error
      }
    } catch (error) {
      console.error("Error:", error);
      // Handle network or other errors
    }
  };

  let diff =
    differenceInMinutes(new Date(), new Date(sub?.created_at || "")) || null;
  useEffect(() => {
    if (diff && diff < 30) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    }
  }, [sub?.created_at, diff]);

  return (
    <>
      <h1 className="pl-4 pt-4 text-4xl font-bold">Підписка</h1>

      <blockquote></blockquote>
      <Card className="mx-auto mt-10 w-[350px]">
        <CardHeader>
          <CardTitle className="text-lg">Переваги підписки</CardTitle>
        </CardHeader>
        <CardContent>
          {benefits.map((benefit, index) => (
            <div key={index} className="mb-4 flex items-center gap-2 pb-4 ">
              {/* <span className='flex h-2 w-2 translate-y-1 rounded-full bg-purple-600' /> */}
              <CheckIcon className="h-6 w-6 text-purple-600" />

              <p className="text-sm font-medium leading-none">
                {benefit.title}
              </p>
            </div>
          ))}
          {!sub && (
            <div className="flex flex-col gap-4">
              <div
                onClick={() => handlePlan({ amount: 77, periodicity: "month" })}
                className={cn(
                  "flex cursor-pointer items-center justify-between rounded-lg p-4",
                  amount === 77
                    ? "bg-gradient-to-r from-purple-600 to-purple-500 text-background"
                    : "bg-accent",
                )}
              >
                <div>
                  <h2 className="mb-2 font-bold">Щомісячна</h2>
                  <p className="max-w-[24ch] text-sm">
                    Оплата раз на місяць, скасування в будь який час
                  </p>
                </div>
                <span>₴77/місяць</span>
              </div>

              <div
                onClick={() => handlePlan({ amount: 40, periodicity: "year" })}
                className={cn(
                  "flex cursor-pointer items-center justify-between rounded-lg p-4",
                  amount === 40
                    ? "bg-gradient-to-r from-purple-600 to-purple-500 text-background"
                    : "bg-accent",
                )}
              >
                <div>
                  <h2 className="mb-2 font-bold">Річна</h2>
                  <p className="max-w-[20ch] text-sm">
                    Одноразова оплата раз весь рік
                  </p>
                </div>
                <span>₴40/місяць</span>
              </div>
            </div>
          )}

          {sub && (
            <div className="flex cursor-pointer items-center justify-between rounded-lg bg-gradient-to-r from-purple-600 to-purple-500 p-4 text-background">
              <div>
                <h2 className="mb-2 font-bold">
                  {sub.amount === 77 ? "Щомісячна" : "Річна"}
                </h2>
                <p className="max-w-[24ch] text-sm">
                  {sub.amount === 77
                    ? "Оплата раз на місяць, скасування в будь який час"
                    : "Одноразова оплата раз весь рік"}
                </p>
              </div>
              <span>{sub.amount === 77 ? "₴77/місяць" : "₴40/місяць"}</span>
            </div>
          )}
        </CardContent>
        <CardFooter className="block">
          <form
            method="POST"
            action="https://www.liqpay.ua/api/3/checkout"
            acceptCharset="utf-8"
            target="blank"
            className="mb-4 w-full"
          >
            {!sub && <input type="hidden" name="data" value={dataBase64} />}
            {!sub && (
              <input type="hidden" name="signature" value={signatureBase64} />
            )}

            {!sub && (
              <Button
                disabled={amount === 0}
                type="submit"
                size="lg"
                className="w-full bg-gradient-to-r from-purple-600 to-purple-500 text-lg text-background"
              >
                Підключити
              </Button>
            )}
          </form>
          {sub && (
            <Button
              // disabled={amount === 0}
              size="lg"
              onClick={handleCancelSubscription}
              className="w-full bg-gradient-to-r from-purple-600 to-purple-500 text-lg text-background"
            >
              Скасувати підписку
            </Button>
          )}
        </CardFooter>
      </Card>
    </>
  );
}
