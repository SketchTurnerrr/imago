"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Command, CommandGroup, CommandItem } from "@/components/ui/command";
import { Command as CommandPrimitive } from "cmdk";
import { createClient } from "@/lib/supabase/client";

type Denominations = Record<"value" | "label", string>;
const denominationOptions = [
  {
    value: "Католізм",
    label: "Католізм",
  },
  {
    value: "Православ'я",
    label: "Православ'я",
  },
  {
    value: "Євангелізм",
    label: "Євангелізм",
  },
  {
    value: "Баптизм",
    label: "Баптизм",
  },
  {
    value: "П'ятидесятництво",
    label: "П'ятидесятництво",
  },
  {
    value: "Неконфесійна",
    label: "Неконфесійна",
  },
  {
    value: "Інше",
    label: "Інше",
  },
] satisfies Denominations[];

export function MultiSelect({ userId }: { userId: string }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [initialLoad, setInitialLoad] = useState(false);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Denominations[]>([]);
  const [inputValue, setInputValue] = useState("");
  const supabase = createClient();

  useEffect(() => {
    async function fetchFilters() {
      const { data, error } = await supabase
        .from("filters")
        .select("denomination")
        .eq("profile_id", userId)
        .single();

      if (data && data.denomination) {
        setSelected(
          data.denomination.map((value) => ({ value, label: value })),
        );
      }

      setInitialLoad(true);
    }

    fetchFilters();
  }, [userId]);

  useEffect(() => {
    async function setFilters() {
      if (initialLoad) {
        const { error: existsError, count } = await supabase
          .from("filters")
          .select("", { head: true, count: "exact" });

        if (count === 0 && selected.length > 0) {
          const { error } = await supabase.from("filters").insert({
            denomination: selected.map((denomination) => denomination.value),
            profile_id: userId,
          });
          console.log("error :", error);
        } else {
          const { error } = await supabase
            .from("filters")
            .update({
              denomination: selected.map((denomination) => denomination.value),
            })
            .eq("profile_id", userId);
          console.log("error :", error);
        }
      }
    }

    setFilters();
  }, [initialLoad, selected, supabase, userId]);

  const handleUnselect = useCallback((denomination: Denominations) => {
    setSelected((prev) => prev.filter((s) => s.value !== denomination.value));
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      const input = inputRef.current;
      if (input) {
        if (e.key === "Delete" || e.key === "Backspace") {
          if (input.value === "") {
            setSelected((prev) => {
              const newSelected = [...prev];
              newSelected.pop();
              return newSelected;
            });
          }
        }
        // This is not a default behaviour of the <input /> field
        if (e.key === "Escape") {
          input.blur();
        }
      }
    },
    [],
  );

  const selectables = denominationOptions.filter(
    (denomination) => !selected.includes(denomination),
  );

  return (
    <Command
      onKeyDown={handleKeyDown}
      className="overflow-visible bg-transparent"
    >
      <div className="group rounded-md border border-input px-3 py-2 text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
        <div className="flex flex-wrap gap-1">
          {selected.map((denomination) => {
            return (
              <Badge key={denomination.value} variant="secondary">
                {denomination.label}
                <button
                  className="ml-1 rounded-full outline-hidden ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleUnselect(denomination);
                    }
                  }}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  onClick={() => handleUnselect(denomination)}
                >
                  <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                </button>
              </Badge>
            );
          })}
          {/* Avoid having the "Search" Icon */}
          <CommandPrimitive.Input
            ref={inputRef}
            value={inputValue}
            onValueChange={setInputValue}
            onBlur={() => setOpen(false)}
            onFocus={() => setOpen(true)}
            placeholder="Оберіть конфесію"
            className="ml-2 flex-1 bg-transparent outline-hidden placeholder:text-muted-foreground"
          />
        </div>
      </div>
      <div className="relative mt-2">
        {open && selectables.length > 0 ? (
          <div className="absolute top-0 z-10 w-full rounded-md border bg-popover text-popover-foreground shadow-md outline-hidden animate-in">
            <CommandGroup className="h-full overflow-auto">
              {selectables.map((denomination) => {
                return (
                  <CommandItem
                    key={denomination.value}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                    onSelect={(value) => {
                      setInputValue("");
                      setSelected((prev) => {
                        return [...prev, denomination];
                      });
                    }}
                    className={"cursor-pointer"}
                  >
                    {denomination.label}
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </div>
        ) : null}
      </div>
    </Command>
  );
}
