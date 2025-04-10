import {
  createErrorResponse,
  createResponse,
  getErrorMessage,
} from "@/lib/utils";
import { getRandomProducts } from "@/services/products";

export const revalidate = 3600;

export async function GET() {
  try {
    const result = await getRandomProducts(5);
    return createResponse(result);
  } catch (error) {
    return createErrorResponse(getErrorMessage(error), 500);
  }
}
