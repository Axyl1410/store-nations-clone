"use client";

import useToggle from "@/hooks/use-state-toggle";
import axios from "@/lib/axios";
import { getCookie } from "cookies-next";
import { LogOut, ShoppingBag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { AnimatedNumber } from "../motion-primitives/animated-number";
import { ThemeToggle } from "../theme/theme-toggle";
import { Button } from "../ui/button";
import CartList from "../ui/cart-list";

export default function Navbar() {
  const router = useRouter();
  const idUser = getCookie("idUser");
  const cart = useToggle();

  const [itemNumber, setItemNumber] = useState(0);
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
      if (!idUser) return;

      setError(false);

      try {
        const response = await axios.get(`/api/cart?customerId=${idUser}`);
        setItemNumber(response.data.data.items?.length || 0);
      } catch (error) {
        console.error("Error fetching cart items:", error);
        setError(true);
      }
    }

    fetchCartItems();

    const intervalId = setInterval(fetchCartItems, 6000);

    return () => clearInterval(intervalId);
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
        <div className="flex h-full w-full items-center justify-end gap-1">
          <Button
            onClick={handleLogout}
            variant="ghost"
            size="icon"
            className="transition-colors hover:text-red-500"
            aria-label="Logout"
          >
            <LogOut size={20} />
          </Button>

          <ThemeToggle />

          <Button
            onClick={cart.toggle}
            variant="ghost"
            className="group relative h-10 px-2"
            aria-label={`Shopping cart with ${itemNumber} items`}
          >
            <ShoppingBag className="h-5 w-5 transition-transform group-hover:scale-110" />
            <span className="border-primary absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full border text-xs font-medium">
              {error ? (
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
            </span>
          </Button>
        </div>
      </div>
      <CartList isOpen={cart.isOpen} onClose={cart.toggle} />
    </div>
  );
}
