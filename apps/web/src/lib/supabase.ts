import "server-only";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Server-side Supabase client using the SECRET key (bypasses row level security).
 * Never import this into a client component, and never expose SUPABASE_SECRET_KEY.
 *
 * NEXT_PUBLIC_SUPABASE_URL: project URL, e.g. https://<ref>.supabase.co
 * SUPABASE_SECRET_KEY:      Project Settings → API Keys → Secret key (sb_secret_…),
 *                           or the legacy service_role key.
 */
let client: SupabaseClient | null | undefined;

export function supabaseAdmin(): SupabaseClient | null {
  if (client !== undefined) return client;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  const key = (process.env.SUPABASE_SECRET_KEY ?? process.env.SUPABASE_SERVICE_ROLE_KEY)?.trim();
  client = url && key ? createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } }) : null;
  return client;
}

export const supabaseConfigured = () => supabaseAdmin() !== null;

/** Storage bucket for dashboard images (created by supabase/migrations). */
export const MEDIA_BUCKET = "media";
