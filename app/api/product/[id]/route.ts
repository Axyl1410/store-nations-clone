import { getProductById } from "@/lib/mysql";
import { NextResponse } from "next/server";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id: idString } = await params;
    const id = parseInt(idString, 10);

    if (isNaN(id)) {
      return NextResponse.json(
        { success: false, message: "Invalid product ID" },
        { status: 400 },
      );
    }

    const product = await getProductById(id);

    if (!product) {
      return NextResponse.json(
        { success: false, message: "Product not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({ data: product }, { status: 200 });
  } catch (error) {
    console.error("Error getting product by ID:", error);
    return NextResponse.json(
      {
        success: false,
        message: "An error occurred while retrieving the product",
      },
      { status: 500 },
    );
  }
}
