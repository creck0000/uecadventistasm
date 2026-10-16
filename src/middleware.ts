import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PROTECTED: Record<string, string> = {
  "/estudiante": "estudiante",
  "/profesor": "profesor",
  "/admin": "admin",
};

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const neededRole = Object.entries(PROTECTED).find(([route]) =>
    pathname === route || pathname.startsWith(`${route}/`)
  )?.[1];
  if (!neededRole) return NextResponse.next();

  const role = req.cookies.get("role")?.value;
  if (role !== neededRole) {
    const url = new URL("/login", req.url);
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/estudiante/:path*", "/profesor/:path*", "/admin/:path*"],
};
