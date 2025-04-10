"use client";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import axios from "@/lib/axios";
import { getCookie } from "cookies-next";
import {
  MinusCircle,
  PlusCircle,
  ShoppingCart,
  Trash2,
  XIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import Loading from "../common/loading";
import { Separator } from "./separator";

type CartItem = {
  CartItemID: number;
  ProductID: number;
  Quantity: number;
  Price: number;
  ProductName: string;
  Category: string;
  ImageURL?: string;
};

type CartListProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function CartList({ isOpen, onClose }: CartListProps) {
  const router = useRouter();
  const customerId = getCookie("idUser");
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<number | null>(null);

  const totalItems = cartItems.reduce((sum, item) => sum + item.Quantity, 0);
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.Price * item.Quantity,
    0,
  );

  const fetchCartItems = useCallback(async () => {
    if (!customerId) return;

    setLoading(true);
    try {
      const response = await axios.get(`/api/cart?customerId=${customerId}`);
      setCartItems(response.data.data.items || []);
    } catch {
      toast.error("Could not load your cart");
    } finally {
      setLoading(false);
    }
  }, [customerId]);

  useEffect(() => {
    if (isOpen && customerId) {
      fetchCartItems();
    }
  }, [isOpen, customerId, fetchCartItems]);

  const updateQuantity = async (cartItemId: number, newQuantity: number) => {
    if (newQuantity < 1) return removeItem(cartItemId);

    setUpdating(cartItemId);
    try {
      await axios.patch("/api/cart/items", {
        cartItemId,
        quantity: newQuantity,
      });

      // Update local state
      setCartItems((prev) =>
        prev.map((item) =>
          item.CartItemID === cartItemId
            ? { ...item, Quantity: newQuantity }
            : item,
        ),
      );
      router.refresh(); // Refresh cart count in navbar
    } catch (error) {
      console.error("Error updating quantity:", error);
      toast.error("Failed to update quantity");
    } finally {
      setUpdating(null);
    }
  };

  const removeItem = async (cartItemId: number) => {
    setUpdating(cartItemId);
    try {
      await axios.delete("/api/cart/items", {
        data: { cartItemId },
      });

      // Update local state
      setCartItems((prev) =>
        prev.filter((item) => item.CartItemID !== cartItemId),
      );
      toast.success("Item removed from cart");
      router.refresh(); // Refresh cart count in navbar
    } catch (error) {
      console.error("Error removing item:", error);
      toast.error("Failed to remove item");
    } finally {
      setUpdating(null);
    }
  };

  return (
    <Drawer open={isOpen} onOpenChange={onClose} direction="right">
      <DrawerContent className="h-full w-full max-w-md sm:max-w-lg">
        <div className="mx-auto h-full w-full max-w-lg px-4">
          <DrawerHeader className="flex flex-row items-center justify-between px-0 py-4">
            <div>
              <DrawerTitle className="text-xl">Your Cart</DrawerTitle>
              <DrawerDescription>
                {totalItems} {totalItems === 1 ? "item" : "items"} in your cart
              </DrawerDescription>
            </div>
            <DrawerClose asChild>
              <Button variant="ghost" size="icon">
                <XIcon className="h-5 w-5" />
              </Button>
            </DrawerClose>
          </DrawerHeader>

          <div
            className="flex flex-col overflow-auto"
            style={{ height: "calc(100vh - 200px)" }}
          >
            {loading ? (
              <div className="flex h-32 items-center justify-center">
                <Loading text="Loading your cart..." />
              </div>
            ) : cartItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center gap-4 py-8">
                <ShoppingCart className="text-muted-foreground h-12 w-12" />
                <h3 className="text-lg font-semibold">Your cart is empty</h3>
                <p className="text-muted-foreground text-sm">
                  Looks like you haven&apos;t added anything to your cart yet.
                </p>
                <Button
                  variant="outline"
                  onClick={() => {
                    onClose();
                    router.push("/product");
                  }}
                >
                  Continue Shopping
                </Button>
              </div>
            ) : (
              <div className="space-y-4 px-0 py-2">
                {cartItems.map((item) => (
                  <div key={item.CartItemID} className="flex items-start gap-4">
                    <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border">
                      {item.ImageURL ? (
                        <Image
                          src={`https:${item.ImageURL}`}
                          alt={item.ProductName}
                          width={80}
                          height={80}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="bg-muted flex h-full w-full items-center justify-center">
                          <ShoppingCart className="text-muted-foreground h-8 w-8" />
                        </div>
                      )}
                    </div>

                    <div className="flex flex-1 flex-col">
                      <div className="flex justify-between">
                        <Link
                          href={`/product/${item.ProductID}`}
                          className="text-sm font-medium hover:underline"
                          onClick={onClose}
                        >
                          {item.ProductName}
                        </Link>
                        <span className="text-sm font-medium">
                          ${item.Price * item.Quantity}
                        </span>
                      </div>

                      <p className="text-muted-foreground text-xs">
                        ${item.Price} each
                      </p>

                      <div className="mt-2 flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-6 w-6"
                          onClick={() =>
                            updateQuantity(item.CartItemID, item.Quantity - 1)
                          }
                          disabled={updating === item.CartItemID}
                        >
                          <MinusCircle className="h-3 w-3" />
                        </Button>

                        <span className="w-6 text-center text-sm">
                          {item.Quantity}
                        </span>

                        <Button
                          variant="outline"
                          size="icon"
                          className="h-6 w-6"
                          onClick={() =>
                            updateQuantity(item.CartItemID, item.Quantity + 1)
                          }
                          disabled={updating === item.CartItemID}
                        >
                          <PlusCircle className="h-3 w-3" />
                        </Button>

                        <Button
                          variant="ghost"
                          size="icon"
                          className="ml-auto h-8 w-8 text-red-500 hover:bg-red-50 hover:text-red-600"
                          onClick={() => removeItem(item.CartItemID)}
                          disabled={updating === item.CartItemID}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <DrawerFooter className="px-0 pt-2">
            <div className="space-y-4">
              <Separator />
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Subtotal</span>
                <span className="text-right text-sm font-medium">
                  ${subtotal}
                </span>
              </div>
              <Link href={"/checkout"} onClick={onClose}>
                <Button
                  disabled={cartItems.length === 0 || loading}
                  className="w-full"
                >
                  Checkout
                </Button>
              </Link>
            </div>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
