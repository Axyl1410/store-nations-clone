"use client";

import Loading from "@/components/common/loading";
import ProductCard from "@/components/ui/product-card";
import axios from "@/lib/axios-config";
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
          products.map((product) => (
            <ProductCard
              key={product.ProductID}
              className="odd:border-primary odd:md:border-x"
              Price={product.Price}
              ProductID={product.ProductID}
              ProductName={product.ProductName}
              StockQuantity={product.StockQuantity}
              ImageURL={product.ImageURL}
            />
          ))
        ) : (
          <div className="flex w-full items-center justify-center px-4 py-5">
            <Loading />
          </div>
        )}
      </div>
    </>
  );
}
