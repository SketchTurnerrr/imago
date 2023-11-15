"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import React, { useEffect } from "react";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

export function Providers({ children }: { children: React.ReactNode }) {
  const supabase = createClientComponentClient<Database>();
  const router = useRouter();

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      if (event == "SIGNED_OUT" || event == "TOKEN_REFRESHED") {
        router.refresh();
      }
    });
  }, [supabase]);

  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: Infinity,
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        {children}
        <Toaster />
      </ThemeProvider>
      {<ReactQueryDevtools initialIsOpen={false} />}
    </QueryClientProvider>
  );
}
