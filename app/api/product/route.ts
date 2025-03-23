import {
  createErrorResponse,
  createResponse,
  getErrorMessage,
} from "@/lib/utils";
import { createProduct, getAllProducts } from "@/utils/products";
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

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const result = await getAllProducts();
    return createResponse(result);
  } catch (error) {
    return createErrorResponse(getErrorMessage(error), 500);
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validation = productSchema.safeParse(body);

    if (!validation.success)
      return createErrorResponse("Invalid request data", 400);

    const product = validation.data as Product;
    const result = await createProduct(
      product.ProductName,
      product.Category,
      product.Price,
      product.StockQuantity,
      product.ImageURL || undefined,
      product.Description,
    );

    if (result) return createResponse(result, true, 201);

    return createErrorResponse("Product creation failed", 500);
  } catch (error) {
    return createErrorResponse(getErrorMessage(error), 500);
  }
}
