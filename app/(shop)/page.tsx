"use client";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <div className="hidden lg:block">
        <AspectRatio ratio={16 / 9} className="bg-muted">
          <Image
            src="/nh_bia.webp"
            alt="Photo by Drew Beamer"
            fill
            className="h-full w-full rounded-md object-cover"
          />
        </AspectRatio>
      </div>
      <div className="lg:hidden">
        <AspectRatio ratio={9 / 16}>
          <Image
            src="/nh_bia2.webp"
            alt="Photo by Drew Beamer"
            fill
            className="h-full w-full object-cover lg:hidden"
          />
        </AspectRatio>
      </div>
    </>
  );
}
