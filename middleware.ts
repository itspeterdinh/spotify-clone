import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

// This function can be marked `async` if using `await` inside
export const middleware = async (request: NextRequest) => {
  // If user is logged in, token will exist
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const { pathname } = request.nextUrl;

  // Allow resquest if (1) token exist or
  // (2) it is a request for NextAuth session & provider or
  // (3) it is a request to '/_next/' (/_next/static/)

  if (token || pathname.includes("/api/auth") || pathname.includes("/_next")) {
    if (pathname === "/login") {
      return NextResponse.redirect(new URL("/", request.url));
    }

    return NextResponse.next();
  }

  if (!token && pathname !== "/login") {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
};
