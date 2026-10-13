import { NextResponse } from "next/server";
import { adminConfigured, createSessionValue, passwordMatches, sameOrigin, sessionCookie } from "@/lib/admin-auth";

export async function POST(req: Request) {
  if (!sameOrigin(req)) return NextResponse.json({ ok: false, error: "Not allowed" }, { status: 403 });
  if (!adminConfigured()) {
    return NextResponse.json({ ok: false, error: "The dashboard password has not been set up yet." }, { status: 503 });
  }

  let password = "";
  try {
    const body = (await req.json()) as { password?: unknown };
    password = typeof body.password === "string" ? body.password.slice(0, 200) : "";
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request" }, { status: 400 });
  }

  if (!passwordMatches(password)) {
    // Slow down guessing.
    await new Promise((r) => setTimeout(r, 800));
    return NextResponse.json({ ok: false, error: "That password is not correct." }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(sessionCookie(createSessionValue()));
  return res;
}
