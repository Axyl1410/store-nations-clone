import { useDevice } from "@/hooks/use-device";
import axios from "@/lib/axios";
import { XIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "../ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "../ui/drawer";

type SidebarProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function SidebarMenu({ isOpen, onClose }: SidebarProps) {
  const router = useRouter();
  const { isDesktop } = useDevice();

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
  return (
    <>
      {!isDesktop && (
        <Drawer open={isOpen} onOpenChange={onClose} direction="right">
          <DrawerContent className="h-full w-full max-w-md sm:max-w-lg">
            <div className="mx-auto h-full w-full max-w-lg px-4">
              <DrawerHeader className="border-primary flex flex-row items-center justify-between border-b px-0 py-4">
                <div>
                  <DrawerTitle className="text-xl">
                    <Image
                      src={"/navy-navy.avif"}
                      alt="Nation Store"
                      width={150}
                      height={150}
                      onContextMenu={(e) => e.preventDefault()}
                      className="-mt-3"
                    />
                  </DrawerTitle>
                </div>
                <DrawerClose asChild>
                  <Button variant="ghost" size="icon">
                    <XIcon className="h-6 w-6" />
                  </Button>
                </DrawerClose>
              </DrawerHeader>
              <div className="flex flex-col" onClick={onClose}>
                <Link href="/product">
                  <div className="border-primary border-b py-2 font-bold">
                    Shop
                  </div>
                </Link>
                <Link href="/orders">
                  <div className="border-primary border-b py-2 font-bold">
                    Orders
                  </div>
                </Link>
                <div className="border-primary border-b py-2 font-bold">
                  About us
                </div>
                <div
                  className="border-primary cursor-pointer border-b py-2 font-bold"
                  onClick={handleLogout}
                >
                  Log out
                </div>
              </div>
            </div>
          </DrawerContent>
        </Drawer>
      )}
    </>
  );
}
