import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const req = request;
  const token = await getToken({ req, secret: process.env.JWT_SECRET });
  const { pathname } = request.nextUrl;

  if (!token && pathname !== "/login") {
    return NextResponse.rewrite(new URL("/login", request.url));
  }

  if (token && pathname.startsWith("/")) {
    return NextResponse.next();
  }
}

export const config = {
  matcher: ["/login/", "/api/auth", "/"],
};
