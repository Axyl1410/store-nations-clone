"use client";

import axios from "@/lib/axios";
import { LogOut } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { ThemeToggle } from "../theme/theme-toggle";

export default function Navbar() {
  const router = useRouter();

  async function handleLogout() {
    await axios.post("/api/logout");
    toast.success("Logged out successfully");
    router.push("/login");
  }

  return (
    <div className="bg-background text-primary border-primary fixed inset-x-0 top-0 z-50 border-b">
      <div className="flex h-[55px] w-full items-center pr-4 pl-1">
        <div className="flex h-full w-full items-center justify-start text-2xl font-black text-orange-600">
          <Link href="/">
            <Image src={"/nationorange.avif"} alt="" width={130} height={130} />
          </Link>
        </div>
        <div className="hidden h-full w-full items-center justify-center text-sm sm:flex">
          Shop
        </div>
        <div className="flex h-full w-full items-center justify-end gap-2">
          <div onClick={handleLogout}>
            <LogOut className="cursor-pointer" size={20} />
          </div>
          <ThemeToggle />
          <div className="flex items-center justify-end">
            <p className="border-primary border px-1 text-sm">0</p>
          </div>
        </div>
      </div>
    </div>
  );
}
