import { ArrowRight, Cross, X } from "lucide-react";
import React from "react";

export const NextProfileFiller = React.forwardRef(({ hey }) => {
  return (
    <div
      ref={hey}
      className="skip absolute z-20 -m-4 flex h-svh w-full items-center justify-center bg-slate-100 opacity-0"
    >
      <ArrowRight className="h-[100px] w-[100px]" />
    </div>
  );
});
