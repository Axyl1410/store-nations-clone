import { createCustomer } from "@/lib/mysql";
import { NextResponse } from "next/server";
import { z } from "zod";

const registerSchema = z.object({
  firstName: z.string().nonempty(),
  lastName: z.string().nonempty(),
  email: z.string().nonempty(),
  password: z.string().nonempty(),
  phone: z.string().nonempty(),
  address: z.string().nonempty(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validation = registerSchema.safeParse(body);

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

    const { firstName, lastName, email, password, phone, address } =
      validation.data;
    const result = await createCustomer(
      firstName + " " + lastName,
      email,
      password,
      phone,
      address,
    );

    if (result) {
      return NextResponse.json({ result }, { status: 200 });
    } else {
      return NextResponse.json(
        { success: false, message: "Registration failed" },
        { status: 401 },
      );
    }
  } catch (error) {
    console.error("Error getting customers:", error);
    return NextResponse.json(
      { success: false, message: "An error occurred during registration" },
      { status: 500 },
    );
  }
}
