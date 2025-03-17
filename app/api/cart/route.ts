import { createCart, getCartByCustomerId } from "@/lib/mysql";
import { NextResponse } from "next/server";
import { z } from "zod";

const getCartSchema = z.object({
  customerId: z.number().int().positive(),
});

const createCartSchema = z.object({
  customerId: z.number().int().positive(),
});

type Get = z.infer<typeof getCartSchema>;

type Create = z.infer<typeof createCartSchema>;

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const customerId = searchParams.get("customerId");
    const validation = getCartSchema.safeParse({
      customerId: Number(customerId),
    });

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

    const get = validation.data as Get;
    const cart = await getCartByCustomerId(get.customerId);

    return NextResponse.json({ cart }, { status: 200 });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    return NextResponse.json(
      { success: false, message: errorMessage },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const customerId = searchParams.get("customerId");
    const validation = createCartSchema.safeParse({
      customerId: Number(customerId),
    });

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

    const get = validation.data as Create;
    const cart = await createCart(get.customerId);

    return NextResponse.json({ cart }, { status: 200 });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    return NextResponse.json(
      { success: false, message: errorMessage },
      { status: 500 },
    );
  }
}

export async function PUT() {}

export async function DELETE() {}
