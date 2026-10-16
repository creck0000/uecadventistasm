import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const url = new URL("/login", req.url);
  const res = NextResponse.redirect(url, 303);
  res.cookies.set("role", "", { httpOnly: true, expires: new Date(0), path: "/" });
  res.cookies.set("userId", "", { httpOnly: true, expires: new Date(0), path: "/" });
  return res;
}
