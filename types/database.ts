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
  ImageURL: string;
  OrderDetailID: number;
  OrderID: number;
  ProductID: number;
  Quantity: number;
  Price: number;
}

export interface Cart {
  CartID: number;
  CustomerID: number;
  CreatedAt: string | Date;
}

export type CartItem = {
  CartItemID: number;
  ProductID: number;
  Quantity: number;
  Price: number;
  ProductName: string;
  Category: string;
  ImageURL?: string;
};

export interface Order {
  OrderID: number;
  CustomerID: number | null;
  OrderDate: Date | string;
  TotalAmount: number;
  Status: string;
}

export interface OrderDetail {
  OrderDetailID: number;
  OrderID: number;
  ProductID: number;
  Quantity: number;
  Price: number;
  ProductName?: string; // Thêm từ JOIN
  Category?: string; // Thêm từ JOIN
}

export interface Comment {
  CommentID: number;
  CustomerID: number;
  ProductID: number;
  FullName: string;
  ProductName: string;
  Content: string;
  CreatedAt: string;
}

export interface CartItemWithProduct extends CartItem {
  ProductName: string;
  Category: string;
  ImageURL?: string;
}

export type CustomerWithoutPassword = Omit<Customer, "Password">;

export type ProductWithFullName = Product & { FullName: string };
