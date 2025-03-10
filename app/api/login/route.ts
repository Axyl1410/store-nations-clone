import { loginWithEmailAndPassword } from "@/lib/mysql";
import { sign } from "jsonwebtoken";
import { NextResponse } from "next/server";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email().nonempty(),
  password: z.string().min(6).nonempty(),
});

const JWT_SECRET = process.env.JWT_SECRET || "secret-key";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const Validation = loginSchema.safeParse(body);

    if (!Validation.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Validation failed",
          errors: Validation.error.flatten().fieldErrors,
        },
        { status: 400 },
      );
    }

    const { email, password } = Validation.data;
    const result = await loginWithEmailAndPassword(email, password);

    if (result) {
      const expiresIn = 6 * 60 * 60; // 6 hours in seconds
      const expirationTime = Math.floor(Date.now() / 1000) + expiresIn;

      const token = sign(
        {
          exp: expirationTime,
        },
        JWT_SECRET,
      );
      return NextResponse.json({ result, token }, { status: 200 });
    } else {
      return NextResponse.json(
        { success: false, message: "Login failed" },
        { status: 401 },
      );
    }
  } catch (error) {
    console.error("Error getting customers:", error);
    return NextResponse.json(
      { success: false, message: "An error occurred during login" },
      { status: 500 },
    );
  }
}
