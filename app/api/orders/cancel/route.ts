import {
  createErrorResponse,
  createResponse,
  getErrorMessage,
} from "@/lib/utils";
import { cancelOrder } from "@/utils/orders";
import { z } from "zod";

// Cancel order schema
const cancelOrderSchema = z.object({
  orderId: z.number().int().positive(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validation = cancelOrderSchema.safeParse(body);

    if (!validation.success) {
      return createErrorResponse("Invalid request data", 400);
    }

    const { orderId } = validation.data;
    const result = await cancelOrder(orderId);

    return createResponse(result);
  } catch (error) {
    return createErrorResponse(getErrorMessage(error), 500);
  }
}
