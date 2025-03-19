"use client";

import notFound from "@/app/not-found";
import Loading from "@/components/common/loading";
import {
  MorphingDialog,
  MorphingDialogClose,
  MorphingDialogContainer,
  MorphingDialogContent,
  MorphingDialogImage,
  MorphingDialogTrigger,
} from "@/components/motion-primitives/morphing-dialog";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { ProductWithFullName } from "@/types";
import { XIcon } from "lucide-react";
import { useEffect, useState } from "react";

export function Client({ id }: { id: number }) {
  const [products, setProducts] = useState<ProductWithFullName>();
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

  if (!products && !loading) return notFound();

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
              <MorphingDialog
                transition={{
                  duration: 0.3,
                  ease: "easeInOut",
                }}
              >
                <MorphingDialogTrigger>
                  <MorphingDialogImage
                    src={`https:${products.ImageURL}`}
                    className="cursor-pointer"
                    alt=""
                  />
                </MorphingDialogTrigger>
                <MorphingDialogContainer>
                  <MorphingDialogContent className="relative">
                    <MorphingDialogImage
                      src={`https:${products.ImageURL}`}
                      alt=""
                      className="h-auto w-full max-w-[90vw] object-cover md:h-[90vh]"
                    />
                  </MorphingDialogContent>
                  <MorphingDialogClose
                    className="bg-primary fixed top-6 right-6 h-fit w-fit cursor-pointer rounded-full p-1"
                    variants={{
                      initial: { opacity: 0 },
                      animate: {
                        opacity: 1,
                        transition: { delay: 0.3, duration: 0.1 },
                      },
                      exit: { opacity: 0, transition: { duration: 0 } },
                    }}
                  >
                    <XIcon className="text-background h-5 w-5" />
                  </MorphingDialogClose>
                </MorphingDialogContainer>
              </MorphingDialog>
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-gray-200">
                No image available
              </div>
            )}
          </div>
        )}
        <div className="border-primary flex flex-col gap-2 border-t p-4 md:border-t-0 md:border-l">
          {loading ? (
            <>
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
            </>
          ) : (
            <>
              <p className="cursor-pointer text-sm hover:underline">
                {products?.FullName}
              </p>
              <p className="uppercase">{products?.ProductName}</p>
              <div>
                <p>{products?.Price}$</p>
                <p className="text-xs [&_span]:cursor-pointer [&_span]:underline">
                  <span>Shipping</span> calculated at checkout.
                </p>
              </div>
              <div className="flex flex-col gap-2 pt-4">
                <p className="text-sm font-bold">Size</p>
                <Select>
                  <SelectTrigger className="border-primary w-full rounded-none">
                    <SelectValue placeholder="S" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Size</SelectLabel>
                      <SelectItem value="S">S</SelectItem>
                      <SelectItem value="M">M</SelectItem>
                      <SelectItem value="L">L</SelectItem>
                      <SelectItem value="XL">XL</SelectItem>
                      <SelectItem value="2XL">2XL</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <Button
                className="border-primary mt-2 w-full cursor-pointer rounded-none uppercase"
                variant={"outline"}
                size={"lg"}
              >
                Add to cart
              </Button>
              <Button
                className="border-primary w-full cursor-pointer rounded-none bg-indigo-600 text-white uppercase hover:bg-indigo-700"
                size={"lg"}
              >
                Buy now
              </Button>
              <div className="mt-2 w-full text-center text-sm font-bold underline">
                <p className="cursor-not-allowed">More payment options</p>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
