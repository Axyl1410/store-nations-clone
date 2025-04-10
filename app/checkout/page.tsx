/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import Loading from "@/components/common/loading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import axios from "@/lib/axios";
import { CartItem } from "@/types";
import { getCookie } from "cookies-next";
import { CheckCircle, Loader2, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function Page() {
  const router = useRouter();
  const customerId = getCookie("idUser");
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [orderLoading, setOrderLoading] = useState(false);
  const [cartId, setCartId] = useState<number | null>(null);
  const [orderSuccess, setOrderSuccess] = useState(false);

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.Price * item.Quantity,
    0,
  );

  useEffect(() => {
    const fetchCartItems = async () => {
      if (!customerId) return;

      setLoading(true);
      try {
        const response = await axios.get(`/api/cart?customerId=${customerId}`);
        setCartItems(response.data.data.items || []);
        setCartId(response.data.data.CartID);
      } catch {
        toast.error("Could not load your cart");
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, [customerId]);

  const handlePayNow = async () => {
    if (!customerId || !cartId) {
      toast.error("You need to be logged in to place an order");
      return;
    }

    if (cartItems.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    setOrderLoading(true);
    try {
      const response = await axios.post("/api/orders", {
        customerId: Number(customerId),
        cartId: cartId,
        status: "Placed",
      });

      if (response.status === 201) {
        toast.success("Order placed successfully!");
        setOrderSuccess(true);

        // Redirect to order confirmation after a short delay
        setTimeout(() => {
          router.push(`/orders/${response.data.data.OrderID}`);
        }, 2000);
      }
    } catch (error: any) {
      console.error("Error creating order:", error);

      // Handle specific stock validation errors
      if (error.response?.data?.error?.includes("Not enough stock")) {
        toast.error(error.response.data.error);
      } else {
        toast.error("Failed to place your order");
      }
    } finally {
      setOrderLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid-cols-2 md:grid">
      <div className="border-accent col-span-2 flex h-24 w-full justify-center border-b px-9 py-4 md:block">
        <div className="w-fit">
          <Link href="/">
            <Image
              src={"/nationorange.avif"}
              alt="Nation Store"
              width={180}
              height={60}
            />
          </Link>
        </div>
      </div>
      <div className="border-accent border-b p-10 md:border-r md:border-b-0">
        <Link href={"/"}>
          <p className="hover:underline">Back to home</p>
        </Link>
        <h2 className="text-2xl font-semibold">Checkout</h2>
        <p className="text-muted-foreground mt-2">
          Complete your order by providing your shipping and payment details
        </p>

        {orderSuccess ? (
          <div className="mt-8 flex flex-col items-center justify-center gap-4 text-center">
            <div className="rounded-full bg-green-100 p-3">
              <CheckCircle className="h-10 w-10 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold">
              Order Placed Successfully!
            </h3>
            <p className="text-muted-foreground">
              Thank you for your order. We&apos;re redirecting you to the order
              confirmation page.
            </p>
          </div>
        ) : (
          <Button
            size="lg"
            className="mt-4 w-full"
            onClick={handlePayNow}
            disabled={orderLoading || loading || cartItems.length === 0}
          >
            {orderLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              "Pay now"
            )}
          </Button>
        )}
      </div>

      <div className="bg-accent sticky top-0 h-screen overflow-auto p-10">
        <div className="space-y-6">
          <h2 className="text-xl font-semibold">Order Summary</h2>

          {loading ? (
            <div className="flex h-32 items-center justify-center">
              <Loading text="Loading your cart..." />
            </div>
          ) : cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-4 py-8">
              <ShoppingCart className="text-muted-foreground h-12 w-12" />
              <h3 className="text-lg font-semibold">Your cart is empty</h3>
              <p className="text-muted-foreground text-center text-sm">
                Looks like you haven&apos;t added anything to your cart yet.
              </p>
              <Link
                href="/product"
                className="text-primary font-medium hover:underline"
              >
                Browse products
              </Link>
            </div>
          ) : (
            <>
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.CartItemID} className="flex gap-4">
                    <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border">
                      {item.ImageURL ? (
                        <Image
                          src={`https:${item.ImageURL}`}
                          alt={item.ProductName}
                          width={64}
                          height={64}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="bg-muted flex h-full w-full items-center justify-center">
                          <ShoppingCart className="text-muted-foreground h-4 w-4" />
                        </div>
                      )}
                    </div>
                    <div className="flex flex-1 flex-col">
                      <div className="flex justify-between">
                        <h3 className="text-sm font-medium">
                          {item.ProductName}
                        </h3>
                        <p className="text-sm font-medium">
                          ${item.Price * item.Quantity}
                        </p>
                      </div>
                      <div className="text-muted-foreground mt-1 flex text-xs">
                        <p>
                          ${item.Price} × {item.Quantity}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <Separator />

              <div className="flex cursor-not-allowed gap-4">
                <Input disabled placeholder="Discount code" />
                <Button disabled variant={"outline"}>
                  Apply
                </Button>
              </div>

              <Separator />

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">Subtotal</span>
                  <span className="text-sm font-medium">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Shipping</span>
                  <span className="text-sm font-medium">
                    Calculated at next step
                  </span>
                </div>
              </div>

              <Separator />

              <div className="flex justify-between">
                <span className="text-base font-medium">Total</span>
                <span className="text-base font-bold">
                  ${subtotal.toFixed(2)}
                </span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
