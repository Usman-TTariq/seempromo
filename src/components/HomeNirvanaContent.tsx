"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StoreLogo from "@/components/StoreLogo";
import {
  DEFAULT_BLOG_POST_URL,
  STORES_BLOG_POST_URL,
  FREE_SHIPPING_BLOG_POST_URL,
  DEALS_BLOG_POST_URL,
  FOOTER_TILE_BLOG_URLS,
  FOOTER_TILE_TITLES,
} from "@/lib/blog-posts";
import type { Store } from "@/types/store";

function LatestCouponsSection() {
  const [coupons, setCoupons] = useState<Store[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/coupons?page=1&limit=8&status=all&codes_first=1&fresh=1", { cache: "no-store" })
      .then((r) => r.json())
      .then((d) => {
        const list: Store[] = d?.coupons ?? (Array.isArray(d) ? d : []);
        setCoupons(list.filter((c) => c.status !== "disable"));
      })
      .catch(() => setCoupons([]))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <section className="mb-8 sm:mb-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">Latest Coupons</h2>
          <Link href="/coupons" className="text-sm font-medium text-[#34C759] hover:underline">View all →</Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="animate-pulse bg-white rounded-xl border border-gray-200 p-4 h-28" />
          ))}
        </div>
      </section>
    );
  }

  if (coupons.length === 0) return null;

  return (
    <section className="mb-8 sm:mb-10">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-900">Latest Coupons</h2>
        <Link href="/coupons" className="text-sm font-medium text-[#34C759] hover:underline">View all →</Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {coupons.map((c) => {
          const code = (c.couponCode ?? "").trim();
          const slug = c.slug || (c.name ?? "").toLowerCase().replace(/\s+/g, "-");
          const title = c.couponTitle?.trim() || c.description?.trim() || "Deal";
          return (
            <Link
              key={c.id}
              href={`/stores/${encodeURIComponent(slug)}`}
              className="group bg-white rounded-xl border border-gray-200 p-4 hover:border-[#34C759]/60 hover:shadow-md transition-all flex flex-col gap-2"
            >
              <div className="flex items-center gap-3">
                <StoreLogo name={c.name ?? "?"} logoUrl={c.logoUrl} size="md" rounded="lg" />
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-gray-900 truncate">{c.name}</p>
                  <p className="text-xs text-gray-500 truncate">{title}</p>
                </div>
              </div>
              {code ? (
                <div className="mt-auto flex items-center gap-2 bg-gray-50 border border-dashed border-gray-300 rounded-lg px-3 py-1.5">
                  <span className="text-xs font-mono font-bold text-gray-800 uppercase tracking-wider truncate flex-1">{code}</span>
                  <span className="text-[10px] font-semibold text-[#34C759] shrink-0">COPY</span>
                </div>
              ) : (
                <div className="mt-auto bg-[#34C759] text-white text-xs font-semibold text-center rounded-lg py-1.5">
                  Get Deal
                </div>
              )}
            </Link>
          );
        })}
      </div>
    </section>
  );
}

const HERO_IMGS = ["/img01.jpg", "/img03.jpg", "/img04.jpg"];
const IMG_FULLWIDTH = "/img06.jpg";
const IMG_950 = ["/img05.jpg", "/img07.jpg", "/img10.jpg", "/img31.jpg"];
const IMG_634 = ["/img02.jpg", "/img08.jpg", "/img09.jpg"];
const IMG_190 = ["/img13.jpg", "/img14.jpg", "/img15.jpg", "/img16.jpg", "/img17.jpg", "/img18.jpg"];

const HERO_CARDS = [
  { img: HERO_IMGS[0], title: "Featured", href: DEFAULT_BLOG_POST_URL },
  { img: HERO_IMGS[1], title: "Saving tips", href: DEFAULT_BLOG_POST_URL },
  { img: HERO_IMGS[2], title: "Coupon codes", href: DEFAULT_BLOG_POST_URL },
];

function CoverImage({
  src,
  alt,
  sizes,
  priority,
  quality = 68,
  className = "object-cover group-hover:scale-105 transition-transform duration-300",
}: {
  src: string;
  alt: string;
  sizes: string;
  priority?: boolean;
  quality?: number;
  className?: string;
}) {
  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      quality={quality}
      className={className}
    />
  );
}

export default function HomeNirvanaContent() {
  return (
    <div className="min-h-screen w-full min-w-0 bg-gray-50 flex flex-col overflow-x-hidden max-w-[100vw]">
      <Header />

      <main className="flex-1 w-full min-w-0 px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        {/* Hero – 3 cards, new shape & layout */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-10" aria-label="Featured">
          {HERO_CARDS.map(({ img, title, href }, i) => (
            <Link
              key={title}
              href={href}
              className="group relative block aspect-[4/3] sm:aspect-[3/2] rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow"
            >
              <CoverImage
                src={img}
                alt={title}
                sizes="(max-width: 767px) 100vw, 33vw"
                priority={i === 0}
                quality={65}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
                <h2 className="text-lg sm:text-xl font-bold text-white">{title}</h2>
                <p className="text-xs sm:text-sm text-white/90 mt-0.5">by SeemPromo · Blog</p>
              </div>
            </Link>
          ))}
        </section>

        {/* Two cols – gallery + trending */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-8 sm:mb-10">
          <Link
            href={DEFAULT_BLOG_POST_URL}
            className="group relative block aspect-[16/10] rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow"
          >
            <CoverImage
              src={IMG_950[0]}
              alt="Blog post"
              sizes="(max-width: 1023px) 100vw, 50vw"
              quality={65}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-5">
              <h2 className="text-xl font-bold text-white">Blog post</h2>
              <p className="text-sm text-white/90 mt-1">by SeemPromo · Blog</p>
            </div>
          </Link>
          <Link
            href={DEFAULT_BLOG_POST_URL}
            className="group relative block aspect-[16/10] rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow"
          >
            <CoverImage
              src={IMG_950[1]}
              alt="Trending"
              sizes="(max-width: 1023px) 100vw, 50vw"
              quality={65}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-5 flex items-end justify-between">
              <div>
                <h2 className="text-xl font-bold text-white">Trending</h2>
                <p className="text-sm text-white/90 mt-1">by SeemPromo · Blog</p>
              </div>
              <span className="rounded-full bg-[#34C759] p-2.5 text-white" aria-hidden>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" /></svg>
              </span>
            </div>
          </Link>
        </section>

        {/* Three cols – quote, stores, coupons */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-10">
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-md">
            <CoverImage
              src={IMG_634[0]}
              alt=""
              sizes="(max-width: 767px) 100vw, 33vw"
              quality={68}
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center p-6">
              <blockquote className="text-center">
                <p className="text-white font-medium italic">&ldquo;Saving tips &amp; deals&rdquo;</p>
                <cite className="mt-2 block text-sm text-white/90 not-italic">— SeemPromo</cite>
              </blockquote>
            </div>
          </div>
          <Link
            href={STORES_BLOG_POST_URL}
            className="group relative block aspect-[4/3] rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow"
          >
            <CoverImage
              src={IMG_950[0]}
              alt="Stores"
              sizes="(max-width: 767px) 100vw, 33vw"
              quality={65}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <h3 className="text-lg font-bold text-white">Stores</h3>
              <p className="text-sm text-white/90">by SeemPromo · Stores</p>
            </div>
          </Link>
          <Link
            href={DEFAULT_BLOG_POST_URL}
            className="group relative block aspect-[4/3] rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow"
          >
            <CoverImage
              src={IMG_950[1]}
              alt="Coupons"
              sizes="(max-width: 767px) 100vw, 33vw"
              quality={65}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <h3 className="text-lg font-bold text-white">Coupons</h3>
              <p className="text-sm text-white/90">by SeemPromo · Coupons</p>
            </div>
          </Link>
        </section>

        {/* Fullwidth */}
        <section className="mb-8 sm:mb-10">
          <Link
            href={DEFAULT_BLOG_POST_URL}
            className="group relative block aspect-[21/9] rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow"
          >
            <CoverImage
              src={IMG_FULLWIDTH}
              alt="Blog"
              sizes="100vw"
              quality={62}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-white">Blog</h2>
              <p className="text-white/90 mt-1">by SeemPromo · Blog</p>
            </div>
          </Link>
        </section>

        {/* Two cols – free shipping, deals */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-10 sm:mb-12">
          <Link
            href={FREE_SHIPPING_BLOG_POST_URL}
            className="group relative block aspect-[16/10] rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow"
          >
            <CoverImage
              src={IMG_950[2]}
              alt="Free Shipping"
              sizes="(max-width: 1023px) 100vw, 50vw"
              quality={65}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-5">
              <h2 className="text-xl font-bold text-white">Free Shipping</h2>
              <p className="text-sm text-white/90 mt-1">by SeemPromo · Free Shipping</p>
            </div>
          </Link>
          <Link
            href={DEALS_BLOG_POST_URL}
            className="group relative block aspect-[16/10] rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow"
          >
            <CoverImage
              src={IMG_950[3]}
              alt="Deals"
              sizes="(max-width: 1023px) 100vw, 50vw"
              quality={68}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-5">
              <h2 className="text-xl font-bold text-white">Deals</h2>
              <p className="text-sm text-white/90 mt-1">by SeemPromo · Coupons</p>
            </div>
          </Link>
        </section>

        {/* Latest Coupons from DB */}
        <LatestCouponsSection />

        {/* Footer tiles – 6 images, new grid & shape */}
        <section className="rounded-2xl bg-white border border-gray-200 shadow-sm p-6 sm:p-8" aria-label="More guides">
          <h2 className="text-lg font-bold text-gray-900 mb-4">More guides</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            {FOOTER_TILE_TITLES.map((title, i) => (
              <Link
                key={i}
                href={FOOTER_TILE_BLOG_URLS[i]}
                className="group relative flex flex-col aspect-square rounded-xl overflow-hidden border border-gray-200 hover:border-[#34C759]/50 hover:shadow-md transition-all"
              >
                <div className="relative flex-1 min-h-0 w-full">
                  <CoverImage
                    src={IMG_190[i]}
                    alt=""
                    sizes="(max-width: 639px) 50vw, (max-width: 1023px) 33vw, 17vw"
                    quality={72}
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <span className="relative z-10 flex-shrink-0 block p-2 text-xs font-medium text-gray-700 group-hover:text-[#34C759] text-center truncate bg-white border-t border-gray-100">
                  {title}
                </span>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
