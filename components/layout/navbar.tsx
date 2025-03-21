"use client";

import Image from "next/image";
import Link from "next/link";
import { ThemeToggle } from "../common/theme-toggle";
import { useCounterStore } from "@/providers/counter-store-provider";

export default function Navbar() {
  const { count } = useCounterStore((state) => state);

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
          <ThemeToggle />
          <div className="flex items-center justify-end">
            <p className="border-primary border px-1 text-sm">{count}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
