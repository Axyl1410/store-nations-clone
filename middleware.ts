import { NextRequest, NextResponse } from "next/server";

const PUBLIC_PATHS = [
  "/login",
  "/signup",
  "/api/login",
  "/api/signup",
  "/_next",
  "/favicon.ico",
  "/api/public",
];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (PUBLIC_PATHS.some((path) => pathname.startsWith(path))) {
    return NextResponse.next();
  }

  // const token = request.cookies.get("authToken")?.value;

  return NextResponse.next();
}

// Configure which paths should trigger this middleware
export const config = {
  matcher: [
    // All paths except static files
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
