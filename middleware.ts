import { NextRequest, NextResponse } from "next/server";
import { verifyAuthToken } from "./lib/auth";

const PUBLIC_PATHS = [
  "/login",
  "/sign-up",
  "/_next",
  "/favicon.ico",
  "/api/login",
  "/api/register",
  "/api/logout",
  ...(process.env.NODE_ENV === "development" ? ["/api"] : []),
];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (PUBLIC_PATHS.some((path) => pathname.startsWith(path)))
    return NextResponse.next();

  const token = request.cookies.get("authToken")?.value;

  const authResult = await verifyAuthToken(token);

  if (!authResult.valid) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // All paths except static files
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
