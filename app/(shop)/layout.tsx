"use client";

import Footer from "@/components/layout/footer";
import Navbar from "@/components/layout/navbar";
import { Button } from "@/components/ui/button";
import {
  ResponsiveDialog,
  ResponsiveDialogDescription,
  ResponsiveDialogFooter,
  ResponsiveDialogHeader,
  ResponsiveDialogTitle,
} from "@/components/ui/responsive-dialog";
import { getCookie } from "cookies-next";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [showAuthDialog, setShowAuthDialog] = useState(false);

  const checkAuthToken = async () => {
    const myCookie = getCookie("authToken");

    if (!myCookie) setShowAuthDialog(true);
  };

  useEffect(() => {
    const handleClick = () => checkAuthToken();

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <>
      <Navbar />
      <div className="mt-[56px]">{children}</div>
      <Footer />

      <ResponsiveDialog open={showAuthDialog} onOpenChange={setShowAuthDialog}>
        <ResponsiveDialogHeader>
          <ResponsiveDialogTitle>Authentication Required</ResponsiveDialogTitle>
          <ResponsiveDialogDescription>
            You need to sign in to continue.
          </ResponsiveDialogDescription>
        </ResponsiveDialogHeader>
        <ResponsiveDialogFooter>
          <Link href="/login">
            <Button>Ok</Button>
          </Link>
        </ResponsiveDialogFooter>
      </ResponsiveDialog>
    </>
  );
}
