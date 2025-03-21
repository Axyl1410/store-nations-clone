import { ThemeProvider } from "@/components/theme/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NextTopLoader from "nextjs-toploader";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nation",
  description: "NATION | Rave & Street Apparel | TRAP NATION",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "bg-background text-foreground min-h-screen font-[family-name:var(--font-geist-sans)] antialiased",
          geistSans.variable,
          geistMono.variable,
        )}
      >
        <NextTopLoader />
        <ThemeProvider defaultTheme="system">
          <main>{children}</main>
        </ThemeProvider>
        <Toaster closeButton position="top-right" />
      </body>
    </html>
  );
}
