import {
  createErrorResponse,
  createResponse,
  getErrorMessage,
} from "@/lib/utils";
import { clearCart, deleteCart, getOrCreateCart } from "@/utils/cart";
import { z } from "zod";

// Get cart schema
const getCartSchema = z.object({
  customerId: z.coerce.number().int().positive(),
});

// Create cart schema
const createCartSchema = z.object({
  customerId: z.number().int().positive(),
});

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const customerId = searchParams.get("customerId");

    if (!customerId) return createErrorResponse("Customer ID is required", 400);

    const validation = getCartSchema.safeParse({ customerId });

    if (!validation.success)
      return createErrorResponse("Invalid Customer ID", 400);

    const { customerId: parsedCustomerId } = validation.data;
    const cart = await getOrCreateCart(parsedCustomerId);

    return createResponse(cart);
  } catch (error) {
    return createErrorResponse(getErrorMessage(error), 500);
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validation = createCartSchema.safeParse(body);

    if (!validation.success)
      return createErrorResponse("Invalid request data", 400);

    const { customerId } = validation.data;
    const cart = await getOrCreateCart(customerId);

    return createResponse(cart, true, 201);
  } catch (error) {
    return createErrorResponse(getErrorMessage(error), 500);
  }
}

export async function DELETE(request: Request) {
  try {
    const body = await request.json();
    const cartSchema = z.object({
      cartId: z.number().int().positive(),
      clearOnly: z.boolean().optional().default(false),
    });

    const validation = cartSchema.safeParse(body);

    if (!validation.success)
      return createErrorResponse("Invalid request data", 400);

    const { cartId, clearOnly } = validation.data;

    if (clearOnly) {
      const result = await clearCart(cartId);
      return createResponse(result);
    } else {
      const result = await deleteCart(cartId);
      return createResponse(result);
    }
  } catch (error) {
    return createErrorResponse(getErrorMessage(error), 500);
  }
}
