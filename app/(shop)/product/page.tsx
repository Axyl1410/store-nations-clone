"use client";

import Loading from "@/components/common/loading";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import ProductCard from "@/components/ui/product-card";
import { cn } from "@/lib/utils";
import { Product } from "@/types";
import axios from "axios";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Page() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  async function getProducts() {
    const response = await axios.get("/api/product");

    setProducts(response.data.data);
    setLoading(false);
  }

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      <div className="border-primary flex h-16 items-center border-b px-4">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href={"/"}>Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>All Product</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="border-primary flex items-center border-b md:h-16">
        <div className="grid w-full grid-cols-1 md:grid-cols-3">
          <div className="border-primary flex h-16 items-center px-4 uppercase md:border-r">
            Products
          </div>
          <div className="border-primary hidden border-r md:block" />
          <div className="border-primary flex h-16 cursor-not-allowed items-center justify-between border-t px-4 uppercase md:border-t-0">
            <p>Filter</p>
            <ChevronDown className="h-5 w-5" />
          </div>
        </div>
      </div>
      <div className={cn("grid-cols-3", products.length > 0 && "md:grid")}>
        {loading ? (
          <div className="flex min-h-[calc(100vh-120px)] w-full items-center justify-center px-4 py-5">
            <Loading />
          </div>
        ) : products.length > 0 ? (
          products.map((product, index) => {
            // Calculate border classes based on position (0-indexed)
            const totalRows = Math.ceil(products.length / 3);
            const currentRow = Math.floor(index / 3) + 1;
            const isLastRow = currentRow === totalRows;

            const borderClass = cn(
              index % 4 === 0
                ? "md:border-r" // Items 1, 5, 9, etc. (index 0, 4, 8)
                : index % 4 === 2
                  ? "md:border-l" // Items 3, 7, 11, etc. (index 2, 6, 10)
                  : "",
              !isLastRow && "md:border-b", // Add bottom border if not in last row
            );

            return (
              <ProductCard
                key={product.ProductID}
                className={cn("border-primary", borderClass)}
                {...product}
              />
            );
          })
        ) : (
          <div className="flex min-h-[calc(100vh-120px)] w-full items-center justify-center px-4 py-5">
            <p className="text-gray-500">No products available</p>
          </div>
        )}
      </div>
    </>
  );
}
