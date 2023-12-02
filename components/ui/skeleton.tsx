import { cn } from "@/lib/utils";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-slate-300 dark:bg-secondary",
        className,
      )}
      {...props}
    />
  );
}

export { Skeleton };
