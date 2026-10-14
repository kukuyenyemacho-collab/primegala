import { NextResponse } from "next/server";
import { isAdmin, sameOrigin } from "@/lib/admin-auth";
import { setLeadStatus, type LeadStatus } from "@/lib/lead-store";

const STATUSES: LeadStatus[] = ["new", "contacted", "done"];

export async function PATCH(req: Request) {
  if (!sameOrigin(req)) return NextResponse.json({ ok: false }, { status: 403 });
  if (!(await isAdmin())) return NextResponse.json({ ok: false, error: "Please sign in again." }, { status: 401 });
  let body: { id?: unknown; status?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
  const id = typeof body.id === "string" && /^[0-9a-f-]{36}$/i.test(body.id) ? body.id : null;
  const status = STATUSES.find((s) => s === body.status);
  if (!id || !status) return NextResponse.json({ ok: false, error: "Invalid request" }, { status: 400 });
  try {
    await setLeadStatus(id, status);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[leads] status update failed", error);
    return NextResponse.json({ ok: false, error: "Could not update." }, { status: 500 });
  }
}
