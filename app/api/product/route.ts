import { createProduct, getAllProducts } from "@/lib/mysql";
import { NextResponse } from "next/server";
import { z } from "zod";

const productSchema = z.object({
  ProductID: z.number().optional(),
  ProductName: z.string().min(1, "Product name is required"),
  Category: z.string().min(1, "Category is required"),
  Price: z.number().positive("Price must be positive"),
  StockQuantity: z
    .number()
    .int()
    .nonnegative("Stock quantity must be a non-negative integer"),
  ImageURL: z.string().url("Invalid URL").optional().nullable(),
  Description: z.string().optional(),
});

type Product = z.infer<typeof productSchema>;

export async function GET() {
  try {
    const result = await getAllProducts();
    return NextResponse.json({ data: result }, { status: 200 });
  } catch (error) {
    console.error("Error getting customers:", error);
    return NextResponse.json(
      { success: false, message: "An error occurred during login" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validation = productSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Validation failed",
          errors: validation.error.flatten().fieldErrors,
        },
        { status: 400 },
      );
    }

    const product = validation.data as Product;
    const result = await createProduct(
      product.ProductName,
      product.Category,
      product.Price,
      product.StockQuantity,
      product.ImageURL || undefined,
      product.Description,
    );

    if (result) {
      return NextResponse.json({ result }, { status: 200 });
    } else {
      return NextResponse.json(
        { success: false, message: "Product creation failed" },
        { status: 401 },
      );
    }
  } catch (error) {
    console.error("Error creating product:", error);
    return NextResponse.json(
      { success: false, message: "An error occurred during product creation" },
      { status: 500 },
    );
  }
}
