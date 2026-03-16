"use client";

import Link from "next/link";
import { useState } from "react";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [countryOpen, setCountryOpen] = useState(false);

  return (
    <footer className="mt-auto border-t border-[#34C759] bg-[#34C759]/10">
      {/* Main footer – same green as border, light fill */}
      <div className="bg-[#34C759]/10 border-b border-[#34C759]">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10 lg:py-12">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
            {/* Logo + Country */}
            <div className="lg:col-span-1">
              <Link href="/" className="inline-flex items-center flex-shrink-0 mb-4 block" aria-label="SeemPromo Home">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/seempromo-logo.svg"
                  alt="SeemPromo"
                  className="h-11 sm:h-12 w-auto max-h-16 object-contain object-left max-w-[180px]"
                />
              </Link>
              <div>
                <p className="text-xs text-gray-500 mb-2">Change country:</p>
                <button
                  type="button"
                  onClick={() => setCountryOpen((o) => !o)}
                  className="inline-flex items-center gap-2 text-sm text-gray-700 hover:text-[#34C759] border border-gray-300 rounded-lg px-3 py-2 bg-white hover:border-[#34C759]/50 transition-colors"
                  aria-expanded={countryOpen}
                  aria-haspopup="listbox"
                >
                  <span aria-hidden>🌐</span>
                  <span aria-hidden>🇺🇸</span>
                  <span>United States</span>
                  <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Site Links */}
            <div>
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-4">Site Links</h3>
              <ul className="space-y-3 text-sm">
                <li><Link href="/about" className="text-gray-600 hover:text-[#34C759] transition-colors">About us</Link></li>
                <li><Link href="/privacy" className="text-gray-600 hover:text-[#34C759] transition-colors">Privacy Policy</Link></li>
                <li><Link href="/ccpa" className="text-gray-600 hover:text-[#34C759] transition-colors">CCPA Privacy Notice</Link></li>
                <li><Link href="/terms" className="text-gray-600 hover:text-[#34C759] transition-colors">Terms of Use</Link></li>
                <li><Link href="/accessibility" className="text-gray-600 hover:text-[#34C759] transition-colors">Accessibility</Link></li>
                <li><Link href="/categories" className="text-gray-600 hover:text-[#34C759] transition-colors">Categories</Link></li>
              </ul>
            </div>

            {/* Info & Tools */}
            <div>
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-4">Info & Tools</h3>
              <ul className="space-y-3 text-sm">
                <li><Link href="/research" className="text-gray-600 hover:text-[#34C759] transition-colors">Research & Data</Link></li>
                <li><Link href="/press" className="text-gray-600 hover:text-[#34C759] transition-colors">Press & Media Kit</Link></li>
                <li><Link href="/cently" className="text-gray-600 hover:text-[#34C759] transition-colors">Cently</Link></li>
                <li><Link href="/smilematic" className="text-gray-600 hover:text-[#34C759] transition-colors">Smilematic</Link></li>
                <li><Link href="/tools" className="text-gray-600 hover:text-[#34C759] transition-colors">Editorial Guidelines</Link></li>
              </ul>
            </div>

            {/* Get in Touch */}
            <div>
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-4">Get in Touch</h3>
              <ul className="space-y-3 text-sm">
                <li><Link href="/support" className="text-gray-600 hover:text-[#34C759] transition-colors">Support & Feedback</Link></li>
                <li><a href="https://x.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-[#34C759] transition-colors">X</a></li>
                <li><a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-[#34C759] transition-colors">Facebook</a></li>
                <li><Link href="/contact" className="text-gray-600 hover:text-[#34C759] transition-colors">Contact Us</Link></li>
                <li><Link href="/careers" className="text-gray-600 hover:text-[#34C759] transition-colors">Careers</Link></li>
              </ul>
            </div>

            {/* About */}
            <div className="sm:col-span-2 lg:col-span-1">
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-4">About</h3>
              <p className="text-sm text-gray-600 leading-relaxed max-w-sm">
                SeemPromo tracks coupon codes from online merchants to help consumers save money. We may earn a commission when you use one of our coupons/links to make a purchase. You should check any coupon or promo code of interest on the merchant website to ensure validity before making a purchase.
              </p>
              <Link href="/accessibility" className="mt-3 inline-block text-sm text-gray-600 hover:text-[#34C759] transition-colors">
                Open Accessibility Tools
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar – dark green */}
      <div className="bg-[#166534] text-green-100">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs sm:text-sm" suppressHydrationWarning>
          <span>Copyright © {currentYear} SeemPromo. All rights reserved.</span>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
            <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
