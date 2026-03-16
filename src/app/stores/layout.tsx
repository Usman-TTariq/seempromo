import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  title: "Stores – Shop Coupons by Store",
  description:
    "Find your favorite stores and their latest coupon codes, deals, and free shipping offers. Browse all stores at SeemPromo.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function StoresLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full max-w-[100vw] min-w-0 overflow-x-hidden">
      {children}
    </div>
  );
}
