import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <div className="bg-secondary fixed inset-x-0 top-0 z-50 border-b border-black text-black">
      <div className="flex h-[55px] w-full items-center px-4">
        <div className="flex h-full w-full items-center justify-start text-2xl font-black text-orange-600">
          <Link href="/">
            <Image src={"/nationorange.avif"} alt="" width={130} height={130} />
          </Link>
        </div>
        <div className="hidden h-full w-full items-center justify-center text-sm sm:flex">
          Shop
        </div>
        <div className="flex h-full w-full items-center justify-end">
          <p className="border border-black px-1 text-sm">0</p>
        </div>
      </div>
    </div>
  );
}
