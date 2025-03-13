import { NextRequest, NextResponse } from "next/server";
import { verifyAuthToken } from "./lib/auth";

const PUBLIC_PATHS = ["/login", "/sign-up", "/_next", "/favicon.ico", "/api"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (PUBLIC_PATHS.some((path) => pathname.startsWith(path))) {
    return NextResponse.next();
  }

  // Check for auth token in cookie
  const token = request.cookies.get("authToken")?.value;

  // Verify the token
  const authResult = await verifyAuthToken(token);

  // If token is invalid or missing, redirect to login
  if (!authResult.valid) {
    const loginUrl = new URL("/login", request.url);
    // Add redirect parameter so login page can redirect back after successful login
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

// Configure which paths should trigger this middleware
export const config = {
  matcher: [
    // All paths except static files
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
