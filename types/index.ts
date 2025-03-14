export interface Customer {
  CustomerID: number;
  FullName: string;
  Email: string;
  Password?: string;
  PhoneNumber: string;
  Address?: string | null;
  CreateAt: string | Date;
}

export interface Product {
  ProductID: number;
  ProductName: string;
  Category: string;
  Price: number;
  StockQuantity: number;
  ImageURL?: string;
  Description?: string | null;
  CustomerID?: number | null;
}

export interface Order {
  OrderID: number;
  CustomerID: number | null;
  OrderDate: string | Date;
  TotalAmount: number;
  Status: string;
}

export interface OrderDetail {
  OrderDetailID: number;
  OrderID: number;
  ProductID: number;
  Quantity: number;
  Price: number;
}

export type CustomerWithoutPassword = Omit<Customer, "Password">;

export type ProductWithFullName = Product & { FullName: string };
