import {
  createErrorResponse,
  createResponse,
  getErrorMessage,
} from "@/lib/utils";
import {
  createOrder,
  createOrderFromCart,
  getAllOrders,
  getOrderById,
  updateOrderStatus,
} from "@/services/orders";
import { z } from "zod";

// Get orders schema
const getOrdersSchema = z.object({
  customerId: z.coerce.number().int().positive().optional(),
});

// Create order from cart schema
const createOrderFromCartSchema = z.object({
  customerId: z.number().int().positive(),
  cartId: z.number().int().positive(),
  status: z.string().optional().default("Pending"),
});

// Create direct order schema
const createOrderSchema = z.object({
  customerId: z.number().int().positive(),
  items: z.array(
    z.object({
      productId: z.number().int().positive(),
      quantity: z.number().int().positive(),
    }),
  ),
  status: z.string().optional().default("Pending"),
});

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const customerId = searchParams.get("customerId");
    const orderId = searchParams.get("orderId");

    if (orderId) {
      // Get specific order
      const order = await getOrderById(parseInt(orderId));
      if (!order) return createErrorResponse("Order not found", 404);

      return createResponse(order);
    }

    // Get all orders with optional customer filter
    const validation = getOrdersSchema.safeParse({
      customerId: customerId || undefined,
    });

    if (!validation.success)
      return createErrorResponse("Invalid request parameters", 400);

    const { customerId: parsedCustomerId } = validation.data;
    const orders = await getAllOrders(parsedCustomerId);

    return createResponse(orders);
  } catch (error) {
    return createErrorResponse(getErrorMessage(error), 500);
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Check if the request is to create from cart or direct
    if ("cartId" in body) {
      const validation = createOrderFromCartSchema.safeParse(body);
      if (!validation.success)
        return createErrorResponse("Invalid request data", 400);

      const { customerId, cartId, status } = validation.data;
      const order = await createOrderFromCart(customerId, cartId, status);
      return createResponse(order, true, 201);
    } else {
      const validation = createOrderSchema.safeParse(body);
      if (!validation.success)
        return createErrorResponse("Invalid request data", 400);

      const { customerId, items, status } = validation.data;
      const order = await createOrder(customerId, items, status);
      return createResponse(order, true, 201);
    }
  } catch (error) {
    return createErrorResponse(getErrorMessage(error), 500);
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const updateSchema = z.object({
      orderId: z.number().int().positive(),
      status: z.string().nonempty(),
    });

    const validation = updateSchema.safeParse(body);
    if (!validation.success)
      return createErrorResponse("Invalid request data", 400);

    const { orderId, status } = validation.data;
    const order = await updateOrderStatus(orderId, status);

    return createResponse(order);
  } catch (error) {
    return createErrorResponse(getErrorMessage(error), 500);
  }
}
