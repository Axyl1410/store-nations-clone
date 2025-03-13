"use client";

import Loading from "@/components/common/loading";
import ProductCard from "@/components/ui/product-card";
import axios from "@/lib/axios";
import { cn } from "@/lib/utils";
import { Product } from "@/types";
import { useEffect, useState } from "react";

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);

  async function getProducts() {
    const response = await axios.get("/api/product");

    setProducts(response.data.data);
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
        {products.length > 0 ? (
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
                Price={product.Price}
                ProductID={product.ProductID}
                ProductName={product.ProductName}
                StockQuantity={product.StockQuantity}
                ImageURL={product.ImageURL}
              />
            );
          })
        ) : (
          <div className="flex w-full items-center justify-center px-4 py-5">
            <Loading />
          </div>
        )}
      </div>
    </>
  );
}
