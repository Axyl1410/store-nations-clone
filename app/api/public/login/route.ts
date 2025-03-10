import { loginWithEmailAndPassword } from "@/lib/mysql";
import { sign } from "jsonwebtoken";
import { NextResponse } from "next/server";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email("Invalid email format").nonempty("Email is required"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .nonempty("Password is required"),
});

const JWT_SECRET = process.env.JWT_SECRET || "secret-key";

export async function POST(request: Request) {
  try {
    // Attempt to parse the request body
    let body;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid request body - JSON parsing failed",
        },
        { status: 400 },
      );
    }

    // Validate the request data
    const validation = loginSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Validation failed",
          errors: validation.error.format(),
        },
        { status: 400 },
      );
    }

    // Attempt authentication
    const { email, password } = validation.data;
    try {
      const result = await loginWithEmailAndPassword(email, password);

      if (!result) {
        return NextResponse.json(
          {
            success: false,
            message: "Invalid email or password",
          },
          { status: 401 },
        );
      }

      // Authentication successful
      const expiresIn = 6 * 60 * 60; // 6 hours in seconds
      const expirationTime = Math.floor(Date.now() / 1000) + expiresIn;

      const token = sign(
        {
          exp: expirationTime,
          userId: result.id, // Add user ID to token if available in result
          email: result.email,
        },
        JWT_SECRET,
      );

      // Set the token as an HTTP-only cookie and return user data
      const response = NextResponse.json(
        {
          success: true,
          message: "Login successful",
          user: {
            id: result.id,
            email: result.email,
            name: result.name,
            // Exclude sensitive fields like password
          },
        },
        { status: 200 },
      );

      // Set auth token as HTTP-only cookie
      response.cookies.set({
        name: "authToken",
        value: token,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
        maxAge: expiresIn,
      });

      return response;
    } catch (authError) {
      console.error("Authentication error:", authError);
      return NextResponse.json(
        {
          success: false,
          message: "Authentication service error",
          detail:
            process.env.NODE_ENV === "development"
              ? authError instanceof Error
                ? authError.message
                : String(authError)
              : undefined,
        },
        { status: 500 },
      );
    }
  } catch (error) {
    console.error("Login route error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "An unexpected error occurred",
        requestId: crypto.randomUUID(), // For tracking in logs
      },
      { status: 500 },
    );
  }
}
