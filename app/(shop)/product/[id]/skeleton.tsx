import { Skeleton } from "@/components/ui/skeleton";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";

export function ProductSkeleton() {
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
              <BreadcrumbLink asChild>
                <Link href="/product">All Product</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>
                <Skeleton className="h-4 w-32" />
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="grid-cols-2 md:grid">
        <div className="flex w-full justify-center p-4">
          <Skeleton className="aspect-square h-auto max-h-[80vh] w-full max-w-md" />
        </div>
        <div className="border-primary flex flex-col gap-4 border-t p-4 md:border-t-0 md:border-l">
          {/* Brand */}
          <Skeleton className="h-4 w-32" />

          {/* Product name */}
          <Skeleton className="h-6 w-64" />

          {/* Price */}
          <div className="space-y-2">
            <Skeleton className="h-5 w-16" />
            <Skeleton className="h-3 w-48" />
          </div>

          {/* Size selector */}
          <div className="space-y-2 pt-4">
            <Skeleton className="h-4 w-8" />
            <Skeleton className="h-10 w-full" />
          </div>

          {/* Add to cart button */}
          <Skeleton className="mt-2 h-12 w-full" />

          {/* Buy now button */}
          <Skeleton className="h-12 w-full" />

          {/* More payment options */}
          <div className="mt-2 flex justify-center">
            <Skeleton className="h-4 w-40" />
          </div>
        </div>
      </div>
    </>
  );
}
