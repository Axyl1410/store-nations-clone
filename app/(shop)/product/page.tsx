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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ProductCard from "@/components/ui/product-card";
import { cn } from "@/lib/utils";
import { Product } from "@/types";
import axios from "axios";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

type SortOption = "default" | "price-low" | "price-high";
type AvailabilityFilter = "all" | "in-stock" | "out-of-stock";

export default function Page() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortOption, setSortOption] = useState<SortOption>("default");
  const [availabilityFilter, setAvailabilityFilter] =
    useState<AvailabilityFilter>("all");

  async function getProducts() {
    const response = await axios.get("/api/product");
    const productsData = response.data.data;
    setProducts(productsData);
    setFilteredProducts(productsData);
    setLoading(false);
  }

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    let result = [...products];

    // Apply availability filter
    if (availabilityFilter === "in-stock") {
      result = result.filter((product) => product.StockQuantity > 0);
    } else if (availabilityFilter === "out-of-stock") {
      result = result.filter((product) => product.StockQuantity <= 0);
    }

    // Apply sort
    if (sortOption === "price-low") {
      result.sort((a, b) => a.Price - b.Price);
    } else if (sortOption === "price-high") {
      result.sort((a, b) => b.Price - a.Price);
    }

    setFilteredProducts(result);
  }, [sortOption, availabilityFilter, products]);

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
        <div className="grid w-full grid-cols-1 md:grid-cols-4">
          <div className="border-primary flex h-16 items-center px-4 uppercase md:border-r">
            Products
          </div>
          <div className="border-primary hidden border-r md:block" />
          <div className="border-primary hidden border-r md:block" />
          <DropdownMenu>
            <DropdownMenuTrigger>
              <div className="border-primary flex h-16 cursor-pointer items-center justify-between border-t px-4 uppercase md:border-t-0">
                <p>Filter</p>
                <ChevronDown className="h-5 w-5" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="min-w-56">
              <DropdownMenuLabel className="uppercase">
                Sort by
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup
                value={sortOption}
                onValueChange={(value) => setSortOption(value as SortOption)}
              >
                <DropdownMenuRadioItem
                  value="default"
                  className="cursor-pointer"
                >
                  Default
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem
                  value="price-low"
                  className="cursor-pointer"
                >
                  Price: Low to High
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem
                  value="price-high"
                  className="cursor-pointer"
                >
                  Price: High to Low
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>

              <DropdownMenuSeparator />
              <DropdownMenuLabel className="uppercase">
                Availability
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup
                value={availabilityFilter}
                onValueChange={(value) =>
                  setAvailabilityFilter(value as AvailabilityFilter)
                }
              >
                <DropdownMenuRadioItem value="all" className="cursor-pointer">
                  All Products
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem
                  value="in-stock"
                  className="cursor-pointer"
                >
                  In Stock
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem
                  value="out-of-stock"
                  className="cursor-pointer"
                >
                  Out of Stock
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="cursor-pointer uppercase"
                onClick={() => {
                  setSortOption("default");
                  setAvailabilityFilter("all");
                }}
              >
                Clear
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div
        className={cn("grid-cols-4", filteredProducts.length > 0 && "md:grid")}
      >
        {loading ? (
          <div className="flex min-h-[calc(100vh-120px)] w-full items-center justify-center px-4 py-5">
            <Loading />
          </div>
        ) : filteredProducts.length > 0 ? (
          filteredProducts.map((product, index) => {
            // Calculate border classes based on position (0-indexed)
            const totalRows = Math.ceil(filteredProducts.length / 3);
            const currentRow = Math.floor(index / 3) + 1;
            const isLastRow = currentRow === totalRows;

            const borderClass = cn(
              (index + 1) % 4 !== 0 ? "md:border-r" : "",
              !isLastRow && "md:border-b",
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
