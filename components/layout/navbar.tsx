"use client";

import axios from "@/lib/axios";
import { getCookie } from "cookies-next";
import { Loader2, LogOut } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { AnimatedNumber } from "../motion-primitives/animated-number";
import { ThemeToggle } from "../theme/theme-toggle";

export default function Navbar() {
  const router = useRouter();
  const idUser = getCookie("idUser");

  const [itemNumber, setItemNumber] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  async function handleLogout() {
    try {
      await axios.post("/api/logout");
      toast.success("Logged out successfully");
      router.push("/login");
    } catch (error) {
      toast.error("Failed to logout. Please try again.");
      console.error("Logout error:", error);
    }
  }

  useEffect(() => {
    async function fetchCartItems() {
      if (!idUser) {
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setError(false);

      try {
        const response = await axios.get(`/api/cart?customerId=${idUser}`);
        setItemNumber(response.data.data.items?.length || 0);
      } catch (error) {
        console.error("Error fetching cart items:", error);
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }

    fetchCartItems();
  }, [idUser]);

  return (
    <div className="bg-background text-primary border-primary sticky inset-x-0 top-0 z-50 container mx-auto border-b">
      <div className="flex h-[55px] w-full items-center pr-4 pl-1">
        <div className="flex h-full w-full items-center justify-start text-2xl font-black text-orange-600">
          <Link href="/">
            <Image
              src={"/nationorange.avif"}
              alt="Nation Store"
              width={130}
              height={130}
              onContextMenu={(e) => e.preventDefault()}
            />
          </Link>
        </div>
        <Link href={"/product"}>
          <div className="hidden h-full w-full items-center justify-center text-sm sm:flex">
            Shop
          </div>
        </Link>
        <div className="flex h-full w-full items-center justify-end gap-2">
          <div
            onClick={handleLogout}
            className="cursor-pointer transition-colors hover:text-red-500"
          >
            <LogOut size={20} />
          </div>
          <ThemeToggle />
          <Link href="/cart" className="relative">
            <div className="relative flex cursor-pointer items-center justify-end">
              <div className="border-primary border px-1 text-sm">
                {isLoading ? (
                  <Loader2 className="my-1 h-4 w-4 animate-spin" />
                ) : error ? (
                  <span className="text-red-500">!</span>
                ) : (
                  <AnimatedNumber
                    springOptions={{
                      bounce: 0,
                      duration: 2000,
                    }}
                    value={itemNumber}
                  />
                )}
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
