import { closeConnection, getAllCustomers } from "@/lib/mysql";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const result = await getAllCustomers();
    return NextResponse.json({ data: result }, { status: 200 });
  } catch (error) {
    console.error("Error getting customers:", error);
    return NextResponse.json(
      { success: false, message: "An error occurred during login" },
      { status: 500 },
    );
  } finally {
    await closeConnection();
  }
}
