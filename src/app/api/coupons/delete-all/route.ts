import { NextRequest, NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import { deleteAllCoupons } from "@/lib/stores";

export async function POST(request: NextRequest) {
  try {
    await request.json().catch(() => ({}));
    await deleteAllCoupons();
    revalidateTag("coupons");
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("[api/coupons/delete-all] POST:", e);
    const msg = e instanceof Error ? e.message : "Failed to delete all coupons";
    const isConfig = /supabase|not configured|env\.local/i.test(msg);
    return NextResponse.json(
      { error: isConfig ? "Supabase not configured for local. Add NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY to .env.local (same as live)." : msg },
      { status: isConfig ? 503 : 500 }
    );
  }
}
