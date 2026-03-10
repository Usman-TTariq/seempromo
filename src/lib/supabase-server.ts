import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let serverSupabase: SupabaseClient | null = null;
let serverSupabaseCoupons: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient | null {
  const url = (
    process.env.NEXT_PUBLIC_SUPABASE_URL ?? process.env.SUPABASE_URL
  )?.trim();
  const key = (
    process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.SUPABASE_ANON_KEY
  )?.trim();
  if (!url || !key) return null;
  if (!serverSupabase) {
    serverSupabase = createClient(url, key, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
        detectSessionInUrl: false,
      },
    });
  }
  return serverSupabase;
}

/**
 * Use a separate Supabase project for coupons if set in env.
 * Add to .env: COUPONS_SUPABASE_URL and COUPONS_SERVICE_ROLE_KEY (the project where you have 12 coupons).
 * If not set, uses same as getSupabase().
 */
export function getSupabaseCoupons(): SupabaseClient | null {
  const url = (process.env.COUPONS_SUPABASE_URL ?? process.env.NEXT_PUBLIC_COUPONS_SUPABASE_URL)?.trim();
  const key = (process.env.COUPONS_SERVICE_ROLE_KEY ?? process.env.COUPONS_SUPABASE_ANON_KEY)?.trim();
  if (url && key) {
    if (!serverSupabaseCoupons) {
      serverSupabaseCoupons = createClient(url, key, {
        auth: {
          persistSession: false,
          autoRefreshToken: false,
          detectSessionInUrl: false,
        },
      });
    }
    return serverSupabaseCoupons;
  }
  return getSupabase();
}

export const SUPABASE_STORES_TABLE = "stores";
export const SUPABASE_COUPONS_TABLE = "coupons";
