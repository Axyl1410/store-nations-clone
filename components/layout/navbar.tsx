import Link from "next/link";

export default function Navbar() {
  return (
    <div className="border-b border-black text-black">
      <div className="flex h-[55px] w-full items-center px-4">
        <div className="flex h-full w-full items-center justify-start text-2xl font-black text-orange-600">
          <Link href={"/"} className="inline-block">
            NATION
          </Link>
        </div>
        <div className="flex h-full w-full items-center justify-center text-sm">
          Shop
        </div>
        <div className="flex h-full w-full items-center justify-end">
          <p className="border border-black px-1.5">0</p>
        </div>
      </div>
    </div>
  );
}
