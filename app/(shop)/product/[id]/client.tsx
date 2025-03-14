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
import { Skeleton } from "@/components/ui/skeleton";
import { Product } from "@/types";
import { useEffect, useState } from "react";

export function Client({ id }: { id: number }) {
  const [products, setProducts] = useState<Product>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getProduct() {
      const response = await fetch(`/api/product/${id}`);
      const data = await response.json();

      setProducts(data.data);
      setLoading(false);
    }

    getProduct();
  }, [id]);

  return (
    <>
      <div className="border-primary flex h-16 items-center border-b px-4">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/product">All Product</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>
                {products?.ProductName ? products.ProductName : <Loading />}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="grid-cols-2 md:grid">
        {loading ? (
          <Skeleton className="h-[calc(100vh-120px)] w-full rounded-none" />
        ) : (
          <div className="flex w-full justify-center">
            {products?.ImageURL ? (
              <picture>
                <img
                  src={`https:${products.ImageURL}`}
                  alt={products.ProductName}
                />
              </picture>
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-gray-200">
                No image available
              </div>
            )}
          </div>
        )}
        <div className="border-primary flex flex-col gap-4 border-t p-4 md:border-t-0 md:border-l">
          <Skeleton className="h-[20px] w-1/4" />
          <Skeleton className="h-[20px] w-2/4" />
          <Skeleton className="h-[30px] w-2/4" />
          <Skeleton className="h-[15px] w-1/4" />
          <Skeleton className="h-[50px] w-full" />
          <Skeleton className="h-[50px] w-full" />
          <Skeleton className="h-[50px] w-full" />
          <div className="flex w-full justify-center">
            <Skeleton className="h-[20px] w-1/4" />
          </div>
        </div>
      </div>
    </>
  );
}
