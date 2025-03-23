"use client";

import Loading from "@/app/loading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import axios from "@/lib/axios";
import { formatDate } from "@/lib/utils";
import { OrderDetail } from "@/types";
import { getCookie } from "cookies-next";
import {
  AlertCircle,
  ArrowLeft,
  CheckCircle,
  Clock,
  Loader2,
  Package,
  ShoppingCart,
  Truck,
  XCircle,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

type OrderStatus =
  | "Pending"
  | "Processing"
  | "Shipped"
  | "Delivered"
  | "Cancelled";

type OrderWithDetails = {
  OrderID: number;
  CustomerID: number;
  OrderDate: string;
  TotalAmount: number;
  Status: OrderStatus;
  FullName: string;
  Email: string;
  PhoneNumber: string;
  Address: string;
  details: OrderDetail[];
};

export default function OrderDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const customerId = getCookie("idUser");
  const [order, setOrder] = useState<OrderWithDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [cancelLoading, setCancelLoading] = useState(false);

  useEffect(() => {
    const fetchOrder = async () => {
      if (!id) return;
      setLoading(true);

      try {
        const response = await axios.get(`/api/orders?orderId=${id}`);
        setOrder(response.data.data);

        // If order doesn't belong to the logged-in user, redirect to orders page
        if (response.data.data.CustomerID !== Number(customerId)) {
          toast.error("You don't have permission to view this order");
          router.push("/orders");
        }
      } catch (error) {
        toast.error("Failed to load order details");
        console.error("Error fetching order:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id, customerId, router]);

  const handleCancelOrder = async () => {
    if (!order || !id) return;

    setCancelLoading(true);
    try {
      await axios.post("/api/orders/cancel", {
        orderId: Number(id),
      });

      toast.success("Order cancelled successfully");

      // Refresh order data
      const response = await axios.get(`/api/orders?orderId=${id}`);
      setOrder(response.data.data);
    } catch (error) {
      toast.error("Failed to cancel order");
      console.error("Error cancelling order:", error);
    } finally {
      setCancelLoading(false);
    }
  };

  // Helper function to get status icon and color
  const getStatusDisplay = (status: OrderStatus) => {
    switch (status) {
      case "Pending":
        return {
          icon: <Clock className="h-5 w-5 text-amber-500" />,
          label: "Pending",
          color: "text-amber-500",
          bgColor: "bg-amber-50",
        };
      case "Processing":
        return {
          icon: <Package className="h-5 w-5 text-blue-500" />,
          label: "Processing",
          color: "text-blue-500",
          bgColor: "bg-blue-50",
        };
      case "Shipped":
        return {
          icon: <Truck className="h-5 w-5 text-violet-500" />,
          label: "Shipped",
          color: "text-violet-500",
          bgColor: "bg-violet-50",
        };
      case "Delivered":
        return {
          icon: <CheckCircle className="h-5 w-5 text-green-500" />,
          label: "Delivered",
          color: "text-green-500",
          bgColor: "bg-green-50",
        };
      case "Cancelled":
        return {
          icon: <XCircle className="h-5 w-5 text-red-500" />,
          label: "Cancelled",
          color: "text-red-500",
          bgColor: "bg-red-50",
        };
      default:
        return {
          icon: <AlertCircle className="h-5 w-5 text-gray-500" />,
          label: status,
          color: "text-gray-500",
          bgColor: "bg-gray-50",
        };
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (!order) {
    return (
      <div className="container mx-auto">
        <div className="flex h-screen flex-col items-center justify-center text-center">
          <AlertCircle className="mb-4 h-12 w-12 text-red-500" />
          <h2 className="text-2xl font-semibold">Order Not Found</h2>
          <p className="text-muted-foreground mt-2 mb-4">
            We couldn&apos;t find the order you&apos;re looking for.
          </p>
          <Link href="/orders">
            <Button>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Orders
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const statusDisplay = getStatusDisplay(order.Status);
  const canCancel = ["Pending", "Processing"].includes(order.Status);

  return (
    <div className="container mx-auto py-6 md:py-12">
      <div className="mb-6 flex items-center gap-2">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/orders">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to orders
          </Link>
        </Button>
      </div>

      <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1>Order #{order.OrderID}</h1>
          <p className="text-muted-foreground">
            Placed on {formatDate(new Date(order.OrderDate))}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div
            className={`flex items-center gap-2 rounded-full px-3 py-1 ${statusDisplay.bgColor}`}
          >
            {statusDisplay.icon}
            <span className={`text-sm font-medium ${statusDisplay.color}`}>
              {statusDisplay.label}
            </span>
          </div>

          {canCancel && order.Status !== "Cancelled" && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleCancelOrder}
              disabled={cancelLoading}
            >
              {cancelLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Cancelling...
                </>
              ) : (
                "Cancel Order"
              )}
            </Button>
          )}
        </div>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        {/* Order items - takes 2/3 of the space on larger screens */}
        <div className="md:col-span-2">
          <div className="bg-card rounded-lg border shadow-sm">
            <div className="p-6">
              <h3 className="mb-4 text-lg font-semibold">Order Items</h3>
              <div className="space-y-4">
                {order.details.map((item) => (
                  <div key={item.OrderDetailID} className="flex gap-4">
                    <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border">
                      {item.ImageURL ? (
                        <Image
                          src={`https:${item.ImageURL}`}
                          alt={item.ProductName || "Product image"}
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
                        <h4 className="text-sm font-medium">
                          <Link
                            href={`/product/${item.ProductID}`}
                            className="hover:text-primary hover:underline"
                          >
                            {item.ProductName}
                          </Link>
                        </h4>
                        <p className="text-sm font-medium">
                          ${item.Price * item.Quantity}
                        </p>
                      </div>
                      <div className="text-muted-foreground mt-1 flex text-xs">
                        <p>
                          ${item.Price} × {item.Quantity}
                        </p>
                      </div>
                      <div className="mt-1">
                        <span className="text-muted-foreground inline-flex items-center rounded-full bg-gray-100 px-2 py-0.5 text-xs">
                          {item.Category}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            <div className="p-6">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground text-sm">
                    Subtotal
                  </span>
                  <span className="text-sm font-medium">
                    ${order.TotalAmount}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground text-sm">
                    Shipping
                  </span>
                  <span className="text-sm font-medium">Free</span>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span className="text-base font-medium">Total</span>
                  <span className="text-base font-bold">
                    ${order.TotalAmount}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Customer info - takes 1/3 of the space on larger screens */}
        <div>
          <div className="bg-card rounded-lg border shadow-sm">
            <div className="p-6">
              <h3 className="mb-4 text-lg font-semibold">
                Customer Information
              </h3>
              <div className="space-y-4">
                <div>
                  <h4 className="text-muted-foreground text-sm">Name</h4>
                  <p className="text-sm font-medium">{order.FullName}</p>
                </div>
                <div>
                  <h4 className="text-muted-foreground text-sm">Email</h4>
                  <p className="text-sm font-medium">{order.Email}</p>
                </div>
                <div>
                  <h4 className="text-muted-foreground text-sm">Phone</h4>
                  <p className="text-sm font-medium">{order.PhoneNumber}</p>
                </div>
                <Separator />
                <div>
                  <h4 className="text-muted-foreground text-sm">
                    Shipping Address
                  </h4>
                  <p className="text-sm font-medium">
                    {order.Address || "No address provided"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
