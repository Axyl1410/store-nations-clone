import { createCustomer } from "@/lib/customers";
import {
  createErrorResponse,
  createResponse,
  getErrorMessage,
} from "@/lib/utils";
import { z } from "zod";

const registerSchema = z.object({
  firstName: z.string().nonempty(),
  lastName: z.string().nonempty(),
  email: z.string().nonempty(),
  password: z.string().nonempty(),
  phone: z.string().nonempty(),
  address: z.string().nonempty(),
});

type Register = z.infer<typeof registerSchema>;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validation = registerSchema.safeParse(body);

    if (!validation.success)
      return createErrorResponse("Invalid request data", 400);

    const Register = validation.data as Register;
    const result = await createCustomer(
      Register.firstName + " " + Register.lastName,
      Register.email,
      Register.password,
      Register.phone,
      Register.address,
    );

    if (result) return createResponse(result, true, 201);
    return createErrorResponse("Registration failed", 500);
  } catch (error) {
    return createErrorResponse(getErrorMessage(error), 500);
  }
}
