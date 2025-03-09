import { loginWithEmailAndPassword } from "@/lib/mysql";
import { NextResponse } from "next/server";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email().nonempty(),
  password: z.string().min(6).nonempty(),
});

//todo add jwt token

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const res = loginSchema.safeParse(body);

    if (!res.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Validation failed",
          errors: res.error.flatten().fieldErrors,
        },
        { status: 400 },
      );
    }

    const { email, password } = res.data;
    const result = await loginWithEmailAndPassword(email, password);

    return NextResponse.json({ data: result }, { status: 200 });
  } catch (error) {
    console.error("Error getting customers:", error);
    return NextResponse.json(
      { success: false, message: "An error occurred during login" },
      { status: 500 },
    );
  }
}
