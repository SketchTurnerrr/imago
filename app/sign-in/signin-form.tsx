"use client";

import { signInWithGoogle, signInWithEmail } from "./actions";
import { SignBtn } from "./signin-btn";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export const SignInForm = () => {
  const [isEmailVisible, setIsEmailVisible] = useState(false);

  return (
    <div className="space-y-4">
      <form action={signInWithGoogle}>
        <SignBtn />
      </form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative mx-2 flex justify-center">
          <span className="bg-background text-muted-foreground px-2">або</span>
        </div>
      </div>

      <div className="rounded-sm border border-gray-400 p-2">
        <p className="text-sm text-gray-400">
          ✨ Непотрібно ніяких паролів, ми відправимо вам на пошту посилання для
          входу.
        </p>
      </div>

      <form action={signInWithEmail} className="space-y-2">
        <Input
          type="email"
          name="email"
          placeholder="Електронна адреса"
          required
        />
        <button
          type="submit"
          className="bg-primary text-primary-foreground hover:bg-primary/90 w-full rounded-md px-3 py-2 text-sm font-semibold shadow-sm"
        >
          Отримати посилання
        </button>
      </form>
    </div>
  );
};
