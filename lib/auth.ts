import { jwtVerify } from "jose";

export async function verifyAuthToken(token: string | undefined): Promise<{
  valid: boolean;
  error?: string;
}> {
  if (!token) return { valid: false, error: "No token provided" };

  try {
    const JWT_SECRET = new TextEncoder().encode(
      process.env.JWT_SECRET || "secret-key",
    );

    await jwtVerify(token, JWT_SECRET);

    return {
      valid: true,
    };
  } catch (error) {
    console.error("Token verification failed:", error);
    return {
      valid: false,
      error: error instanceof Error ? error.message : "Invalid token",
    };
  }
}
