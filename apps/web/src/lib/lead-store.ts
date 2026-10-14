import "server-only";
import type { Lead } from "@primegala/contracts";
import { leadReference } from "./leads";
import { supabaseAdmin } from "./supabase";

export type LeadStatus = "new" | "contacted" | "done";

export interface StoredLead {
  id: string;
  reference: string;
  type: string;
  full_name: string;
  phone: string;
  email: string | null;
  service: string | null;
  preferred_date: string | null;
  preferred_time: string | null;
  contact_channel: string | null;
  message: string | null;
  status: LeadStatus;
  created_at: string;
}

/**
 * Save a booking request to the `leads` table so the front desk sees it in the dashboard.
 * Returns "off" when Supabase is not configured, so callers can fall back to other channels.
 */
export async function storeLead(lead: Lead): Promise<"stored" | "failed" | "off"> {
  const db = supabaseAdmin();
  if (!db) return "off";
  const { error } = await db.from("leads").insert({
    id: lead.id,
    reference: leadReference(lead.id),
    type: lead.type,
    full_name: lead.contact.fullName,
    phone: lead.contact.phone,
    email: lead.contact.email ?? null,
    service: lead.request.service ?? null,
    preferred_date: lead.request.preferredDate ?? null,
    preferred_time: lead.request.preferredTime ?? null,
    contact_channel: lead.contact.preferredChannel,
    message: lead.request.message ?? null,
    payload: lead,
    created_at: lead.createdAt,
  });
  if (error) {
    // Unique id: a retried request that was already saved counts as saved.
    if (error.code === "23505") return "stored";
    console.error("[leads] could not save to Supabase", error.code, error.message);
    return "failed";
  }
  return "stored";
}

export async function listLeads(status?: LeadStatus, limit = 100): Promise<StoredLead[]> {
  const db = supabaseAdmin();
  if (!db) return [];
  let q = db
    .from("leads")
    .select(
      "id, reference, type, full_name, phone, email, service, preferred_date, preferred_time, contact_channel, message, status, created_at",
    )
    .order("created_at", { ascending: false })
    .limit(limit);
  if (status) q = q.eq("status", status);
  const { data, error } = await q;
  if (error) throw new Error(`leads: ${error.message}`);
  return (data ?? []) as StoredLead[];
}

export async function setLeadStatus(id: string, status: LeadStatus) {
  const db = supabaseAdmin();
  if (!db) throw new Error("Supabase is not configured");
  const { error } = await db.from("leads").update({ status, updated_at: new Date().toISOString() }).eq("id", id);
  if (error) throw new Error(`leads update: ${error.message}`);
}
