import { getSupabase, getSupabaseCoupons, SUPABASE_STORES_TABLE, SUPABASE_COUPONS_TABLE } from "@/lib/supabase-server";
import { NextResponse } from "next/server";

/**
 * GET /api/debug-supabase
 * Returns whether Supabase is configured and connection status (no secrets).
 * Coupons use COUPONS_SUPABASE_URL + COUPONS_SERVICE_ROLE_KEY if set, else main URL/key.
 */
export async function GET() {
  const url = (
    process.env.NEXT_PUBLIC_SUPABASE_URL ?? process.env.SUPABASE_URL
  )?.trim();
  const hasKey = !!(
    process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.SUPABASE_ANON_KEY
  );
  const couponsUrl = (process.env.COUPONS_SUPABASE_URL ?? process.env.NEXT_PUBLIC_COUPONS_SUPABASE_URL)?.trim();
  const couponsHasKey = !!(process.env.COUPONS_SERVICE_ROLE_KEY ?? process.env.COUPONS_SUPABASE_ANON_KEY);
  const configured = !!(url && hasKey);
  const projectRef = url
    ? url.replace(/^https:\/\//, "").replace(/\.supabase\.co.*$/, "")
    : null;
  const couponsProjectRef = couponsUrl
    ? couponsUrl.replace(/^https:\/\//, "").replace(/\.supabase\.co.*$/, "")
    : null;

  const out: {
    configured: boolean;
    projectRef: string | null;
    couponsUseSeparateProject?: boolean;
    couponsProjectRef?: string | null;
    connectionOk?: boolean;
    storeCount?: number;
    couponCount?: number;
    error?: string;
    message?: string;
  } = { configured, projectRef };

  if (couponsUrl && couponsHasKey) {
    out.couponsUseSeparateProject = true;
    out.couponsProjectRef = couponsProjectRef;
  }

  if (!configured && !(couponsUrl && couponsHasKey)) {
    return NextResponse.json({
      ...out,
      message:
        "Supabase not configured. Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY. For coupons from a different project (e.g. 12 coupons), add COUPONS_SUPABASE_URL and COUPONS_SERVICE_ROLE_KEY.",
    });
  }

  const supabaseStores = getSupabase();
  const supabaseCoupons = getSupabaseCoupons();

  try {
    const storesRes = supabaseStores
      ? await supabaseStores.from(SUPABASE_STORES_TABLE).select("id", { count: "exact", head: true })
      : { count: 0, error: { message: "Stores: no client" } };
    const couponsRes = supabaseCoupons
      ? await supabaseCoupons.from(SUPABASE_COUPONS_TABLE).select("id", { count: "exact", head: true })
      : { count: 0, error: { message: "Coupons: no client" } };
    const storeError = storesRes.error;
    const couponError = couponsRes.error;
    out.connectionOk = !storeError && !couponError;
    out.storeCount = storeError ? undefined : (storesRes.count ?? 0);
    out.couponCount = couponError ? undefined : (couponsRes.count ?? 0);
    if (storeError) out.error = out.error ? `${out.error}; stores: ${storeError.message}` : storeError.message;
    if (couponError) out.error = out.error ? `${out.error}; coupons: ${couponError.message}` : couponError.message;
  } catch (e) {
    out.connectionOk = false;
    out.error = e instanceof Error ? e.message : "Connection failed";
  }

  return NextResponse.json(out);
}
