import notFound from "@/app/not-found";
import { getProductById } from "@/services/products";
import { ProductWithFullName } from "@/types";
import { Suspense } from "react";
import { ProductClient } from "./client";
import { ProductSkeleton } from "./skeleton";

export const revalidate = 3600;

// This component handles the actual data fetching
async function ProductDetail({ id }: { id: number }) {
  try {
    const product = await getProductById(id);

    if (!product) return notFound();

    return <ProductClient product={product as ProductWithFullName} />;
  } catch (error) {
    console.error("Error fetching product:", error);
    return notFound();
  }
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string | number }>;
}) {
  let { id } = await params;

  if (typeof id === "string") id = parseInt(id, 10);

  if (isNaN(id)) return notFound();

  return (
    <Suspense fallback={<ProductSkeleton />}>
      <ProductDetail id={id} />
    </Suspense>
  );
}
