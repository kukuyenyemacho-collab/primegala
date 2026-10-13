import { NextResponse } from "next/server";
import { ADMIN_COOKIE, sameOrigin } from "@/lib/admin-auth";

export async function POST(req: Request) {
  if (!sameOrigin(req)) return NextResponse.json({ ok: false }, { status: 403 });
  const res = NextResponse.json({ ok: true });
  res.cookies.set({ name: ADMIN_COOKIE, value: "", path: "/", maxAge: 0 });
  return res;
}
