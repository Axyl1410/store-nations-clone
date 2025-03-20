import {
  createErrorResponse,
  createResponse,
  getErrorMessage,
} from "@/lib/utils";
import { getRandomProducts } from "@/utils/products";

export async function GET() {
  try {
    const result = await getRandomProducts();
    return createResponse(result);
  } catch (error) {
    return createErrorResponse(getErrorMessage(error), 500);
  }
}
