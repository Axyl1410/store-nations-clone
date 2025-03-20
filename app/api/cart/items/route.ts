import {
  createErrorResponse,
  createResponse,
  getErrorMessage,
} from "@/lib/utils";
import { addToCart, removeFromCart, updateCartItem } from "@/utils/cart";
import { z } from "zod";

// Add to cart schema
const addToCartSchema = z.object({
  cartId: z.number().int().positive(),
  productId: z.number().int().positive(),
  quantity: z.number().int().positive(),
});

// Update cart item schema
const updateCartItemSchema = z.object({
  cartItemId: z.number().int().positive(),
  quantity: z.number().int().min(0),
});

// Delete cart item schema
const removeCartItemSchema = z.object({
  cartItemId: z.number().int().positive(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validation = addToCartSchema.safeParse(body);

    if (!validation.success)
      return createErrorResponse("Invalid request data", 400);

    const { cartId, productId, quantity } = validation.data;
    const result = await addToCart(cartId, productId, quantity);

    return createResponse(result, true, 201);
  } catch (error) {
    return createErrorResponse(getErrorMessage(error), 500);
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const validation = updateCartItemSchema.safeParse(body);

    if (!validation.success)
      return createErrorResponse("Invalid request data", 400);

    const { cartItemId, quantity } = validation.data;
    const result = await updateCartItem(cartItemId, quantity);

    return createResponse(result);
  } catch (error) {
    return createErrorResponse(getErrorMessage(error), 500);
  }
}

export async function DELETE(request: Request) {
  try {
    const body = await request.json();
    const validation = removeCartItemSchema.safeParse(body);

    if (!validation.success)
      return createErrorResponse("Invalid request data", 400);

    const { cartItemId } = validation.data;
    const result = await removeFromCart(cartItemId);

    return createResponse(result);
  } catch (error) {
    return createErrorResponse(getErrorMessage(error), 500);
  }
}
