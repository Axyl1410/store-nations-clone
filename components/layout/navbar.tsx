"use client";

import useToggle from "@/hooks/use-state-toggle";
import axios from "@/lib/axios";
import { cn } from "@/lib/utils";
import { getCookie } from "cookies-next";
import { Menu, ShoppingBag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { AnimatedNumber } from "../motion-primitives/animated-number";
import { Button } from "../ui/button";
import CartList from "../ui/cart-list";
import SidebarMenu from "./sidebar-menu";

export default function Navbar() {
  const router = useRouter();
  const idUser = getCookie("idUser");
  const cart = useToggle();
  const menu = useToggle();

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
    <div className="bg-background text-primary border-primary sticky inset-x-0 top-0 z-40 container mx-auto border-b">
      <div className="flex h-[55px] w-full items-center justify-between px-4">
        <div className="sm:w-1/3">
          <div onClick={menu.toggle} className="w-fit cursor-pointer">
            <Menu className="h-5 w-5" />
          </div>
        </div>
        <div className="flex h-full w-full items-center justify-start text-2xl font-black sm:w-1/3">
          <Link href="/" className="flex w-full items-center justify-center">
            <Image
              src={"/navy-navy.avif"}
              alt="Nation Store"
              width={150}
              height={150}
              onContextMenu={(e) => e.preventDefault()}
              className="-mt-3"
            />
          </Link>
        </div>

        <div className="flex h-full items-center justify-end gap-1 sm:w-1/3">
          <Button
            onClick={cart.toggle}
            variant="ghost"
            className="group relative h-10"
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
      <SidebarMenu isOpen={menu.isOpen} onClose={menu.toggle} />
      {/* Menu */}
      <div
        className={cn(
          "bg-background border-primary absolute inset-x-0 top-[56px] z-30 overflow-hidden transition-all duration-300 lg:border-b",
          menu.isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0",
        )}
      >
        <div className="container mx-auto" onClick={menu.toggle}>
          <div className="hidden grid-cols-4 lg:grid">
            <Link href="/product">
              <div className="border-primary border-r p-5 font-bold">Shop</div>
            </Link>
            <Link href="/orders">
              <div className="border-primary border-r p-5 font-bold">
                Orders
              </div>
            </Link>
            <div className="border-primary border-r p-5 font-bold">
              About us
            </div>
            <div
              className="cursor-pointer p-5 font-bold"
              onClick={handleLogout}
            >
              Log out
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
