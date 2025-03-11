"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
} from "../ui/select";
import Payment from "./payment";

export default function Footer() {
  const backToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <div className="border-t border-black">
        <div
          className="hover:bg-primary hover:text-secondary flex cursor-pointer items-center justify-center px-4 py-5 font-semibold tracking-wide uppercase duration-200 motion-safe:transition-colors"
          onClick={backToTop}
        >
          Back to top
        </div>
      </div>
      <div className="border-t border-black text-sm text-black">
        <div className="flex w-full">
          <div className="flex-1 border-r border-black p-5 [&_p]:mb-2.5 [&_span]:font-bold">
            <p>NATION ® is owned and operated by CBMG, LLC</p>
            <p>
              <span>Headquarters</span> 1320 N Wilton Pl, Los Angeles, CA 90028,
              USA
            </p>
            <p>
              <span>Contact</span> hello@nations.io
            </p>
            <p>
              <span>Hours</span> 9:00 AM - 17:00 PM EST
            </p>
          </div>
          <div className="grid flex-1 gap-1 p-5">
            <p>Get 10% off your next purchase. Subscribe to our newsletter.</p>
            <Input
              className="w-full rounded-none border-black"
              placeholder="your@email.address"
            />
            <Button className="w-full rounded-none uppercase">subcribe</Button>
          </div>
          <div className="flex flex-1 flex-col gap-2.5 border-l border-black p-5 [&_a]:hover:underline">
            <Link href={"#"}>Terms of Service</Link>
            <Link href={"#"}>Privacy Policy</Link>
            <Link href={"#"}>Refund policy</Link>
          </div>
        </div>
      </div>
      <div className="border-y border-black">
        <div className="flex cursor-pointer items-center justify-center px-4 py-5 text-sm">
          Instagram
        </div>
      </div>
      <div className="flex w-full">
        <div className="flex flex-1 gap-1 px-4 py-5">
          <Payment />
        </div>
        <div className="flex flex-1 items-center justify-end pr-4">
          <Select>
            <SelectTrigger className="w-[180px] rounded-none border-black">
              <SelectValue placeholder="VIETNAM (VND)" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Country</SelectLabel>
                <SelectItem value="VIETNAM">Vietnam</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
    </>
  );
}
