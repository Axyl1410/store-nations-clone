import { createErrorResponse, getErrorMessage } from "@/lib/utils";
import { loginWithEmailAndPassword } from "@/services/customers";
import { sign } from "jsonwebtoken";
import { NextResponse } from "next/server";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email().nonempty(),
  password: z.string().min(6).nonempty(),
});

type Login = z.infer<typeof loginSchema>;

const JWT_SECRET = process.env.JWT_SECRET || "secret-key";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validation = loginSchema.safeParse(body);

    if (!validation.success)
      return createErrorResponse("Invalid request data", 400);

    const login = validation.data as Login;
    const result = await loginWithEmailAndPassword(login.email, login.password);

    if (result) {
      const expiresIn = 6 * 60 * 60; // 6 hours in seconds
      const expirationTime = Math.floor(Date.now() / 1000) + expiresIn;

      const token = sign(
        {
          exp: expirationTime,
        },
        JWT_SECRET,
      );

      const response = NextResponse.json({ result, token }, { status: 200 });

      const cookieOptions = {
        httpOnly: false,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict" as const,
        path: "/",
        maxAge: expiresIn,
      };

      response.cookies.set({
        name: "authToken",
        value: token,
        ...cookieOptions,
      });

      response.cookies.set({
        name: "idUser",
        value: result.CustomerID.toString(),
        ...cookieOptions,
      });

      response.cookies.set({
        name: "fullname",
        value: result.FullName,
        ...cookieOptions,
      });

      return response;
    }
    return createErrorResponse("Incorrect email or password", 401);
  } catch (error) {
    return createErrorResponse(getErrorMessage(error), 500);
  }
}
