"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import Payment from "./payment";

export default function Footer() {
  const backToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <div className="border-primary border-t">
        <div
          className="hover:bg-primary hover:text-secondary flex cursor-pointer items-center justify-center px-4 py-5 font-semibold tracking-wide uppercase duration-200 motion-safe:transition-colors"
          onClick={backToTop}
        >
          Back to top
        </div>
      </div>
      <div className="border-primary text-primary border-t text-sm">
        <div className="flex w-full flex-col md:flex-row">
          <div className="border-primary flex-1 p-5 md:border-r [&_p]:mb-2.5 [&_span]:font-bold">
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
          <div className="border-primary grid flex-1 gap-1 border-t p-5 md:border-0">
            <p>Get 10% off your next purchase. Subscribe to our newsletter.</p>
            <Input
              className="border-primary w-full rounded-none"
              placeholder="your@email.address"
            />
            <Button className="w-full rounded-none uppercase">subcribe</Button>
          </div>
          <div className="border-primary flex flex-1 flex-col gap-2.5 border-t p-5 md:border-t-0 md:border-l [&_a]:hover:underline">
            <Link href={"#"}>Terms of Service</Link>
            <Link href={"#"}>Privacy Policy</Link>
            <Link href={"#"}>Refund policy</Link>
          </div>
        </div>
      </div>
      <div className="border-primary border-y">
        <div className="flex items-center justify-center px-4 py-5 text-sm">
          Instagram
        </div>
      </div>
      <div className="flex w-full flex-col md:flex-row">
        <div className="flex flex-1 flex-wrap justify-center gap-1 px-4 py-5 md:justify-normal">
          <Payment />
        </div>
        <div className="border-primary flex flex-1 items-center justify-center border-t py-5 md:justify-end md:border-0 md:pr-4">
          <Select>
            <SelectTrigger className="border-primary w-[180px] rounded-none">
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
