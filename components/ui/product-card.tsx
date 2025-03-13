import { cn } from "@/lib/utils";
import Link from "next/link";
import { Button } from "./button";

type ProductCardProps = {
  ProductID: number;
  ProductName: string;
  Price: number;
  StockQuantity: number;
  ImageURL?: string;
  className?: string;
};

export default function ProductCard({
  ProductID,
  ImageURL,
  className,
  Price,
  ProductName,
  StockQuantity,
}: ProductCardProps) {
  return (
    <Link href={`/product/${ProductID}`}>
      <div className={cn("group flex flex-col", className)}>
        <picture className="relative">
          <img
            className="aspect-square w-full object-cover"
            src={ImageURL}
            alt="Broke Hoodie"
            width={1280}
            height={1280}
            loading="lazy"
            sizes="(max-width:777px) 100vw, (min-width:778px) 33vw, 100vw"
          />
          <div className="absolute top-4 left-4 font-light text-white uppercase mix-blend-difference">
            <div className="flex flex-col gap-2">
              <p>{ProductName}</p>
              <p>{Price}$</p>
            </div>
          </div>
        </picture>
        <div className="bg-background">
          <div
            className={cn(
              "border-primary h-[44px] items-center border-t opacity-0 transition-opacity duration-200 group-hover:opacity-100",
              StockQuantity > 0 && "flex",
            )}
          >
            {StockQuantity > 0 ? (
              <>
                <div className="flex flex-1 items-center justify-center">
                  {Price}$
                </div>
                <Button className="h-full w-full flex-1 rounded-none uppercase">
                  add to cart
                </Button>
              </>
            ) : (
              <div className="flex h-full w-full items-center justify-center">
                sold out
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
