import {
  createErrorResponse,
  createResponse,
  getErrorMessage,
} from "@/lib/utils";
import { createComment, getComment } from "@/services/comment";
import { z } from "zod";

const post = z.object({
  productID: z.number().positive(),
  customerID: z.number().positive(),
  content: z.string().min(1),
  fullname: z.string().min(1),
});

type CreateComment = z.infer<typeof post>;

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const productId = searchParams.get("productId");

    if (!productId) {
      return createErrorResponse("Missing customerId or productId", 400);
    }

    const result = await getComment({
      productID: Number(productId),
    });

    return createResponse(result);
  } catch (error) {
    return createErrorResponse(getErrorMessage(error), 500);
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validation = post.safeParse(body);

    if (!validation.success) {
      return createErrorResponse("Invalid request data", 400);
    }

    const comment = validation.data as CreateComment;
    const result = await createComment(comment);

    if (result) {
      return createResponse(result, true, 201);
    }

    return createErrorResponse("Comment creation failed", 500);
  } catch (error) {
    return createErrorResponse(getErrorMessage(error), 500);
  }
}
