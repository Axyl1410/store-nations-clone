"use client";

import Loading from "@/components/common/loading";
import ProductCard from "@/components/ui/product-card";
import axios from "@/lib/axios";
import { cn } from "@/lib/utils";
import { Product } from "@/types";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  async function getProducts() {
    const response = await axios.get("/api/product/random");

    setProducts(response.data.data);
    setLoading(false);
  }

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      <div className="border-primary border-b">
        <div className="text-md flex items-center px-4 py-5 uppercase">
          Featured collection
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
      <div className="border-primary flex h-16 w-full items-center justify-center border-t text-sm [&_a]:hover:underline">
        <Link href={"/product"}>View all products</Link>
      </div>
    </>
  );
}
