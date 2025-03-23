"use client";

import { Button } from "@/components/ui/button";
import axios from "@/lib/axios";
import { formatDate } from "@/lib/utils";
import { getCookie } from "cookies-next";
import {
  AlertCircle,
  ArrowRight,
  CheckCircle,
  Clock,
  Package,
  ShoppingBag,
  Truck,
  XCircle,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import Loading from "../loading";

type OrderStatus =
  | "Pending"
  | "Processing"
  | "Shipped"
  | "Delivered"
  | "Cancelled";

type Order = {
  OrderID: number;
  CustomerID: number;
  OrderDate: string;
  TotalAmount: number;
  Status: OrderStatus;
};

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const customerId = getCookie("idUser");

  useEffect(() => {
    // If no customer ID, redirect to login
    if (!customerId) {
      toast.error("Please log in to view your orders");
      router.push("/login?redirect=/orders");
      return;
    }

    const fetchOrders = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `/api/orders?customerId=${customerId}`,
        );
        setOrders(response.data.data);
      } catch (error) {
        toast.error("Failed to load your orders");
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [customerId, router]);

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

  if (orders.length === 0) {
    return (
      <div className="container mx-auto py-12">
        <h1>Your Orders</h1>
        <div className="mt-12 flex flex-col items-center justify-center text-center">
          <ShoppingBag className="mb-4 h-12 w-12 text-gray-400" />
          <h2 className="text-2xl font-semibold">No orders yet</h2>
          <p className="text-muted-foreground mt-2 mb-6 max-w-md">
            Looks like you haven&apos;t placed any orders yet. Start shopping to
            see your orders here.
          </p>
          <Link href="/product">
            <Button>Shop Now</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6 md:py-12">
      <h1>Your Orders</h1>
      <p className="text-muted-foreground mb-8">
        View and manage your order history
      </p>

      <div className="space-y-4">
        {orders.map((order) => {
          const statusDisplay = getStatusDisplay(order.Status);

          return (
            <div
              key={order.OrderID}
              className="group bg-card rounded-lg border p-6 shadow-sm transition-all hover:shadow-md"
            >
              <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                  <h3 className="text-lg font-semibold">
                    Order #{order.OrderID}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    Placed on {formatDate(new Date(order.OrderDate))}
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <div
                    className={`flex items-center gap-2 rounded-full px-3 py-1 ${statusDisplay.bgColor}`}
                  >
                    {statusDisplay.icon}
                    <span
                      className={`text-sm font-medium ${statusDisplay.color}`}
                    >
                      {statusDisplay.label}
                    </span>
                  </div>

                  <div className="text-lg">${order.TotalAmount}</div>

                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/orders/${order.OrderID}`}>
                      View Details
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
