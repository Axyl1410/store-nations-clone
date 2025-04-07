import {
  createErrorResponse,
  createResponse,
  getErrorMessage,
} from "@/lib/utils";
import { getProductById } from "@/services/products";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id: idString } = await params;
    const id = parseInt(idString, 10);

    if (isNaN(id)) return createErrorResponse("Invalid product ID", 400);

    const product = await getProductById(id);

    if (!product) return createErrorResponse("Product not found", 404);

    return createResponse(product);
  } catch (error) {
    return createErrorResponse(getErrorMessage(error), 500);
  }
}
