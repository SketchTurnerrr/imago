import "./globals.css";
import type { Metadata } from "next";
import { Ysabeau } from "next/font/google";
import { cn } from "@/lib/utils";
import { Providers } from "./providers";

const ysabeau = Ysabeau({ subsets: ["cyrillic"] });

export const metadata: Metadata = {
  title: "Імаго",
  description: "Місце зустрічі для християн України",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn("h-[100svh]", ysabeau.className)}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
