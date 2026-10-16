import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { role, id } = (await req.json()) as { role: "estudiante" | "profesor" | "admin"; id: string };
  if (!role || !id) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
  const res = NextResponse.json({ ok: true });
  res.cookies.set("role", role, { httpOnly: true, sameSite: "lax", path: "/" });
  res.cookies.set("userId", id, { httpOnly: true, sameSite: "lax", path: "/" });
  return res;
}
