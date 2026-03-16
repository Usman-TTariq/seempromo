import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Deals & Offers",
  description:
    "Browse the best deals and offers from top stores. Save more with verified deal links and limited-time offers at SeemPromo.",
};

export default function DealsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
