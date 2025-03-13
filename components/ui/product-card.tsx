import Link from "next/link";

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
}: ProductCardProps) {
  //Todo - visible on hover name, price, add to cart button
  return (
    <Link href={`/product/${ProductID}`}>
      <div className={className}>
        <div className="secondary">
          <picture>
            <img
              className="aspect-square w-full object-cover"
              src={ImageURL}
              alt="Broke Hoodie"
              width={1280}
              height={1280}
              loading="lazy"
              sizes="(max-width:777px) 100vw, (min-width:778px) 33vw, 100vw"
            />
          </picture>
        </div>
      </div>
    </Link>
  );
}
