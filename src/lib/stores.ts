import { unstable_cache } from "next/cache";
import type { Store } from "@/types/store";
import {
  getSupabase,
  getSupabaseCoupons,
  SUPABASE_STORES_TABLE,
  SUPABASE_COUPONS_TABLE,
} from "./supabase-server";
import { slugify } from "./slugify";

const CACHE_REVALIDATE = 15; // seconds – balance freshness (after delete/add) vs Supabase load

function requireSupabase() {
  const supabase = getSupabase();
  if (!supabase) {
    throw new Error(
      "Supabase is not configured. Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local"
    );
  }
  return supabase;
}

async function getStoresRaw(): Promise<Store[]> {
  const supabase = getSupabase();
  if (!supabase) return [];
  const { data: rows, error } = await supabase
    .from(SUPABASE_STORES_TABLE)
    .select("data");
  if (error) {
    console.error("[stores] Supabase error:", error.message);
    return [];
  }
  const stores = (rows ?? [])
    .map((r: { data: Store }) => r.data)
    .filter(Boolean) as Store[];
  stores.sort((a, b) =>
    (b.createdAt ?? "").localeCompare(a.createdAt ?? "")
  );
  return stores;
}

export const getStores = unstable_cache(
  getStoresRaw,
  ["stores-list"],
  { revalidate: CACHE_REVALIDATE, tags: ["stores"] }
);

function requireSupabaseCoupons() {
  const supabase = getSupabaseCoupons();
  if (!supabase) {
    throw new Error(
      "Supabase is not configured for coupons. Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY, or COUPONS_SUPABASE_URL and COUPONS_SERVICE_ROLE_KEY in .env"
    );
  }
  return supabase;
}

/** Returns exact row count from DB (for correct admin total). */
export async function getCouponsCountFromDb(): Promise<number> {
  const supabase = getSupabaseCoupons();
  if (!supabase) return 0;
  const { count, error } = await supabase
    .from(SUPABASE_COUPONS_TABLE)
    .select("id", { count: "exact", head: true });
  if (error) {
    console.error("[coupons] count error:", error.message);
    return 0;
  }
  return typeof count === "number" ? count : 0;
}

export async function getCouponsRaw(): Promise<Store[]> {
  const supabase = getSupabaseCoupons();
  if (!supabase) return [];
  const { data: rows, error } = await supabase
    .from(SUPABASE_COUPONS_TABLE)
    .select("id, data");
  if (error) {
    console.error("[coupons] Supabase error:", error.message);
    return [];
  }
  const coupons = (rows ?? []).map((r: { id: string; data: Store | null }) => {
    const d = r?.data;
    const id = r?.id;
    if (!d || typeof d !== "object")
      return { id: id ?? "", name: "", logoUrl: "", description: "", expiry: "" } as Store;
    return { ...d, id: d.id ?? id };
  }) as Store[];
  coupons.sort((a, b) => {
    const pa = a.priority ?? 999;
    const pb = b.priority ?? 999;
    if (pa !== pb) return pa - pb;
    return (b.createdAt ?? "").localeCompare(a.createdAt ?? "");
  });
  return coupons;
}

export const getCoupons = unstable_cache(
  getCouponsRaw,
  ["coupons-list"],
  { revalidate: CACHE_REVALIDATE, tags: ["coupons"] }
);

export type SortByCoupons = "newest" | "popularity" | "ending_soon" | "expired";

export type CouponListType = "code" | "deal" | "all";

export type CouponsPaginatedOptions = {
  page: number;
  limit: number;
  status?: "all" | "enable" | "disable";
  search?: string;
  codesFirst?: boolean;
  sortBy?: SortByCoupons;
  type?: CouponListType;
};

function expiryToDate(expiry: string | undefined): Date {
  if (!expiry?.trim()) return new Date(864000000000000); // max date = "no expiry"
  const d = new Date(expiry.trim());
  return isNaN(d.getTime()) ? new Date(864000000000000) : d;
}

function hasCode(c: Store): boolean {
  const code = (c.couponCode ?? (c as Record<string, unknown>).coupon_code ?? "").toString().trim();
  return code.length > 0;
}

export async function getCouponById(id: string): Promise<Store | null> {
  if (!id?.trim()) return null;
  const all = await getCoupons();
  return all.find((c) => (c.id ?? "").trim() === id.trim()) ?? null;
}

export async function getCouponsPaginated(
  options: CouponsPaginatedOptions,
  useFreshData?: boolean
): Promise<{ coupons: Store[]; total: number }> {
  const all = useFreshData ? await getCouponsRaw() : await getCoupons();
  let list = all;
  if (options.status && options.status !== "all") {
    list = list.filter((c) => (c.status ?? "enable") === options.status);
  }
  if (options.type && options.type !== "all") {
    const wantDeal = options.type === "deal";
    list = list.filter((c) => {
      const t = (c.couponType ?? "code").toLowerCase();
      return wantDeal ? t === "deal" : t !== "deal";
    });
  }
  if (options.search?.trim()) {
    const q = options.search.trim().toLowerCase();
    list = list.filter(
      (c) =>
        (c.name ?? "").toLowerCase().includes(q) ||
        (c.id ?? "").toLowerCase().includes(q) ||
        (c.couponTitle ?? "").toLowerCase().includes(q) ||
        (c.couponCode ?? "").toLowerCase().includes(q)
    );
  }
  if (options.codesFirst && options.sortBy !== "expired" && options.sortBy !== "ending_soon") {
    list = [...list].sort((a, b) => (hasCode(b) ? 1 : 0) - (hasCode(a) ? 1 : 0));
  }
  const sortBy = options.sortBy ?? "newest";
  const now = new Date();
  if (sortBy === "expired") {
    list = list.filter((c) => expiryToDate(c.expiry).getTime() < now.getTime());
    list = [...list].sort((a, b) => expiryToDate(b.expiry).getTime() - expiryToDate(a.expiry).getTime());
  } else if (sortBy === "ending_soon") {
    list = list.filter((c) => expiryToDate(c.expiry).getTime() >= now.getTime());
    list = [...list].sort((a, b) => expiryToDate(a.expiry).getTime() - expiryToDate(b.expiry).getTime());
  } else if (sortBy === "popularity") {
    list = [...list].sort((a, b) => (b.priority ?? 0) - (a.priority ?? 0));
  } else {
    list = [...list].sort((a, b) =>
      (b.createdAt ?? "").localeCompare(a.createdAt ?? "")
    );
  }
  const totalFromList = list.length;
  const useDbCount =
    useFreshData &&
    !options.search?.trim() &&
    options.status !== "enable" &&
    options.status !== "disable";
  const total = useDbCount ? await getCouponsCountFromDb() : totalFromList;
  const totalToUse = typeof total === "number" && total >= 0 ? total : totalFromList;
  if (options.limit <= 0) return { coupons: list, total: totalToUse };
  const start = (options.page - 1) * options.limit;
  const coupons = list.slice(start, start + options.limit);
  return { coupons, total: totalToUse };
}

export async function deleteAllCoupons(): Promise<void> {
  const supabase = requireSupabaseCoupons();
  const { data: rows, error: selectErr } = await supabase
    .from(SUPABASE_COUPONS_TABLE)
    .select("id");
  if (selectErr) throw new Error(selectErr.message);
  const ids = (rows ?? []).map((r: { id: string }) => r.id).filter(Boolean);
  if (ids.length === 0) return;
  const { error } = await supabase.from(SUPABASE_COUPONS_TABLE).delete().in("id", ids);
  if (error) throw new Error(error.message);
}

export async function insertStore(store: Store): Promise<void> {
  const supabase = requireSupabase();
  const { error } = await supabase
    .from(SUPABASE_STORES_TABLE)
    .insert({ id: store.id, data: store });
  if (error) throw new Error(error.message);
}

export async function updateStore(id: string, store: Store): Promise<void> {
  const supabase = requireSupabase();
  const { error } = await supabase
    .from(SUPABASE_STORES_TABLE)
    .update({ data: store })
    .eq("id", id);
  if (error) throw new Error(error.message);
}

export async function deleteStore(id: string): Promise<void> {
  const supabase = requireSupabase();
  const { error } = await supabase
    .from(SUPABASE_STORES_TABLE)
    .delete()
    .eq("id", id);
  if (error) throw new Error(error.message);
}

export async function insertCoupon(coupon: Store): Promise<void> {
  const supabase = requireSupabaseCoupons();
  const { error } = await supabase
    .from(SUPABASE_COUPONS_TABLE)
    .insert({ id: coupon.id, data: coupon });
  if (error) throw new Error(error.message);
}

export async function updateCoupon(id: string, coupon: Store): Promise<void> {
  const supabase = requireSupabaseCoupons();
  const { error } = await supabase
    .from(SUPABASE_COUPONS_TABLE)
    .update({ data: coupon })
    .eq("id", id);
  if (error) throw new Error(error.message);
}

export async function deleteCoupon(id: string): Promise<void> {
  const supabase = requireSupabaseCoupons();
  const { error } = await supabase
    .from(SUPABASE_COUPONS_TABLE)
    .delete()
    .eq("id", id);
  if (error) throw new Error(error.message);
}

/**
 * Update all coupons that belong to a store (by name match) to use the given slug.
 * Call after updating a store's slug so store page continues to show those coupons.
 */
export async function updateCouponSlugsForStoreName(
  storeName: string,
  newSlug: string
): Promise<number> {
  const slug = (newSlug ?? "").trim();
  if (!slug) return 0;
  const nameKey = (storeName ?? "").trim().toLowerCase();
  if (!nameKey) return 0;
  const coupons = await getCouponsRaw();
  let updated = 0;
  for (const c of coupons) {
    if ((c.name ?? "").trim().toLowerCase() !== nameKey) continue;
    const currentSlug = (c.slug ?? slugify(c.name ?? "")).trim();
    if (currentSlug === slug) continue;
    await updateCoupon(c.id, { ...c, slug });
    updated++;
  }
  return updated;
}

/**
 * Sync every coupon's slug to its store's slug (match by store name).
 * Use after changing store slugs in admin so all coupons show on the correct store page.
 */
export async function syncCouponSlugsFromStores(): Promise<{ updated: number }> {
  const [stores, coupons] = await Promise.all([getStores(), getCouponsRaw()]);
  let updated = 0;
  for (const c of coupons) {
    const nameKey = (c.name ?? "").trim().toLowerCase();
    if (!nameKey) continue;
    const store = stores.find((s) => (s.name ?? "").trim().toLowerCase() === nameKey);
    if (!store) continue;
    const wantSlug = (store.slug ?? slugify(store.name ?? "")).trim();
    if (!wantSlug) continue;
    const currentSlug = (c.slug ?? slugify(c.name ?? "")).trim();
    if (currentSlug === wantSlug) continue;
    await updateCoupon(c.id, { ...c, slug: wantSlug });
    updated++;
  }
  return { updated };
}

export { slugify } from "./slugify";
export { hasCouponData } from "./store-utils";
