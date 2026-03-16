"use client";

import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  DEFAULT_BLOG_POST_URL,
  STORES_BLOG_POST_URL,
  FREE_SHIPPING_BLOG_POST_URL,
  DEALS_BLOG_POST_URL,
  FOOTER_TILE_BLOG_URLS,
  FOOTER_TILE_TITLES,
} from "@/lib/blog-posts";

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

export default function HomeNirvanaContent() {
  return (
    <div className="min-h-screen w-full min-w-0 bg-gray-50 flex flex-col overflow-x-hidden max-w-[100vw]">
      <Header />

      <main className="flex-1 w-full min-w-0 px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        {/* Hero – 3 cards, new shape & layout */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-10" aria-label="Featured">
          {HERO_CARDS.map(({ img, title, href }) => (
            <Link
              key={title}
              href={href}
              className="group relative block aspect-[4/3] sm:aspect-[3/2] rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow"
            >
              <img
                src={img}
                alt={title}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
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
            <img
              src={IMG_950[0]}
              alt="Blog post"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
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
            <img
              src={IMG_950[1]}
              alt="Trending"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
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
            <img src={IMG_634[0]} alt="" className="absolute inset-0 w-full h-full object-cover" />
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
            <img
              src={IMG_950[0]}
              alt="Stores"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
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
            <img
              src={IMG_950[1]}
              alt="Coupons"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
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
            <img
              src={IMG_FULLWIDTH}
              alt="Blog"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
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
            <img
              src={IMG_950[2]}
              alt="Free Shipping"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
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
            <img
              src={IMG_950[3]}
              alt="Deals"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-5">
              <h2 className="text-xl font-bold text-white">Deals</h2>
              <p className="text-sm text-white/90 mt-1">by SeemPromo · Coupons</p>
            </div>
          </Link>
        </section>

        {/* Footer tiles – 6 images, new grid & shape */}
        <section className="rounded-2xl bg-white border border-gray-200 shadow-sm p-6 sm:p-8" aria-label="More guides">
          <h2 className="text-lg font-bold text-gray-900 mb-4">More guides</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            {FOOTER_TILE_TITLES.map((title, i) => (
              <Link
                key={i}
                href={FOOTER_TILE_BLOG_URLS[i]}
                className="group block rounded-xl overflow-hidden border border-gray-200 hover:border-[#34C759]/50 hover:shadow-md transition-all aspect-square"
              >
                <img
                  src={IMG_190[i]}
                  alt=""
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <span className="block p-2 text-xs font-medium text-gray-700 group-hover:text-[#34C759] text-center truncate">
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
