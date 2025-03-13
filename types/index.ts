export interface Product {
  ProductID: number;
  ProductName: string;
  category: string;
  Price: number;
  StockQuantity: number;
  ImageURL?: string;
  description?: string;
}

// If you need a type for creating new products (without the auto-incremented ID)
export type CreateProductInput = Omit<Product, "productId"> & {
  productId?: never;
};

// If you need a type for updating products
export type UpdateProductInput = Partial<Product> & { productId: number };
