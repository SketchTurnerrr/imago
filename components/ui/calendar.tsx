"use client";

import * as React from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { uk } from "date-fns/locale/uk";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({ className, classNames, ...props }: CalendarProps) {
  return (
    <DayPicker
      captionLayout="dropdown"
      locale={uk}
      className="p-3"
      showOutsideDays
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";

export { Calendar };
