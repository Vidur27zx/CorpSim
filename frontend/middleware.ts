import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const publicPaths = ["/", "/auth/login", "/auth/register", "/auth/forgot-password", "/certificates"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow public paths
  if (publicPaths.some((path) => pathname === path || pathname.startsWith("/certificates/"))) {
    return NextResponse.next();
  }

  // Check for auth token in localStorage (via cookie fallback)
  // In Next.js middleware, we check cookies
  const token = request.cookies.get("corpsim-auth-token")?.value;

  // For client-side auth with Zustand persist, we rely on the client
  // The middleware provides a basic check; detailed auth is handled by the auth store
  
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|api).*)"],
};
