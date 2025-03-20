import notFound from "@/app/not-found";
import { ProductWithFullName } from "@/types";
import { getProductById } from "@/utils/products";
import { ProductClient } from "./client";

export const revalidate = 3600;

export default async function Page({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const { id } = await params;

  if (isNaN(id)) return notFound();

  try {
    const product = await getProductById(id);

    if (!product) return notFound();

    return <ProductClient product={product as ProductWithFullName} />;
  } catch (error) {
    console.error("Error fetching product:", error);
    return notFound();
  }
}
