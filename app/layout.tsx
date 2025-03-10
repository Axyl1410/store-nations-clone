import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

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
    <html lang="en">
      <body
        className={cn(
          "bg-secondary text-primary min-h-screen font-[family-name:var(--font-geist-sans)] antialiased",
          geistSans.variable,
          geistMono.variable,
        )}
      >
        <main>{children}</main>
        <Toaster closeButton />
      </body>
    </html>
  );
}
