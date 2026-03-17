/**
 * Import existing static blog posts into Sanity.
 * Run: node scripts/import-blogs-to-sanity.js
 * Requires: SANITY_API_WRITE_TOKEN in .env (create at sanity.io/manage → API → Tokens)
 */

const fs = require("fs");
const path = require("path");
function loadEnv(file) {
  const p = path.join(__dirname, "..", file);
  if (fs.existsSync(p)) {
    fs.readFileSync(p, "utf8").split("\n").forEach((line) => {
      const m = line.match(/^\s*([^#=]+)=(.*)$/);
      if (m) process.env[m[1].trim()] = m[2].trim().replace(/^["']|["']$/g, "");
    });
  }
}
loadEnv(".env.local");
loadEnv(".env");

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "vcoir7t9";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!token) {
  console.error("Missing SANITY_API_WRITE_TOKEN. Create a token at https://sanity.io/manage → API → Tokens, then add to .env");
  process.exit(1);
}

const staticPosts = [
  { slug: "stores-coupon-deals-guide-2026", title: "Best Stores for Coupons & Deals (Complete Guide 2026)", metaTitle: "Best Stores for Coupons & Deals – Complete Guide 2026", metaDescription: "Discover the best stores for coupon codes and deals in 2026. Shop smart with verified promo codes from top retailers.", excerpt: "Find where to shop for the best coupon codes and deals—by category, store, and tips to save more in 2026.", date: "2026-03-04", category: "Store Guides" },
  { slug: "seempromo-saving-tips-coupon-codes-guide-2026", title: "How to Save More with Coupon Codes & Deals (Complete Guide 2026)", metaTitle: "How to Save More with Coupon Codes & Deals – Complete Guide 2026", metaDescription: "Learn how to find working coupon codes, stack discounts, and save more when you shop. Verified tips and store guides for 2026.", excerpt: "Unlock savings with verified coupon codes and deals. Our guide shows you how to pay less online—no fake or expired codes, just working offers.", date: "2026-03-06", category: "Saving Tips" },
  { slug: "free-shipping-deals-guide-2026", title: "Free Shipping Deals & How to Get Free Delivery (Guide 2026)", metaTitle: "Free Shipping Deals – How to Get Free Delivery in 2026", metaDescription: "Find stores and tips for free shipping in 2026. Get free delivery on orders with verified promo codes and thresholds.", excerpt: "Save on delivery with free shipping offers from top stores. See minimum order tips and codes that waive shipping fees.", date: "2026-03-04", category: "Free Shipping" },
  { slug: "top-deals-coupons-guide-2026", title: "Top Deals & Coupon Codes (Best Offers Guide 2026)", metaTitle: "Top Deals & Coupon Codes – Best Offers Guide 2026", metaDescription: "Discover the best deals and working coupon codes in 2026. Verified promo codes and seasonal offers from top retailers.", excerpt: "Get the latest deals and coupon codes in one place. Verified offers so you pay less at checkout.", date: "2026-03-04", category: "Deals" },
  { slug: "fresh-finds-saving-tips-2026", title: "Fresh Finds & Saving Tips (Guide 2026)", metaTitle: "Fresh Finds & Saving Tips – SeemPromo Guide 2026", metaDescription: "Save on fresh finds and everyday essentials with verified coupon codes and deals in 2026.", excerpt: "Get the best deals on groceries and fresh finds. Verified codes and tips to save more.", date: "2026-03-04", category: "Saving Tips" },
  { slug: "seasonal-savings-guide-2026", title: "Seasonal Savings Guide (Best Deals 2026)", metaTitle: "Seasonal Savings Guide – Best Deals 2026", metaDescription: "Capture seasonal sales and limited-time offers. Verified coupon codes for every season in 2026.", excerpt: "Plan your shopping around seasonal sales. Working codes and deals for 2026.", date: "2026-03-04", category: "Deals" },
  { slug: "kitchen-coffee-deals-2026", title: "Kitchen & Coffee Deals (Savings Guide 2026)", metaTitle: "Kitchen & Coffee Deals – Savings Guide 2026", metaDescription: "Save on kitchen essentials and coffee with verified promo codes and deals in 2026.", excerpt: "Coupon codes for kitchen gear and coffee. Verified offers so you pay less.", date: "2026-03-04", category: "Home & Garden" },
  { slug: "travel-getaway-deals-2026", title: "Travel & Getaway Deals (Guide 2026)", metaTitle: "Travel & Getaway Deals – SeemPromo Guide 2026", metaDescription: "Find travel and getaway deals with verified coupon codes. Save on gear and bookings in 2026.", excerpt: "Deals for travel and outdoor getaways. Working codes for gear and more.", date: "2026-03-04", category: "Deals" },
  { slug: "home-garden-savings-2026", title: "Home & Garden Savings (Complete Guide 2026)", metaTitle: "Home & Garden Savings – Complete Guide 2026", metaDescription: "Save on home and garden with verified coupon codes and deals. Top retailers and tips for 2026.", excerpt: "Coupon codes for home and garden. Verified deals to spruce up your space for less.", date: "2026-03-04", category: "Home & Garden" },
  { slug: "fashion-outdoor-deals-2026", title: "Fashion & Outdoor Deals (Guide 2026)", metaTitle: "Fashion & Outdoor Deals – SeemPromo Guide 2026", metaDescription: "Save on fashion and outdoor gear with verified coupon codes and deals in 2026.", excerpt: "Deals on fashion and outdoor apparel. Working codes from top brands.", date: "2026-03-04", category: "Fashion & Beauty" },
  { slug: "touchtunes-coupon-codes-deals-discounts-2026", title: "TouchTunes Coupon Codes, Deals & Discounts (Complete Savings Guide 2026)", metaTitle: "Complete Savings Guide via TouchTunes Coupon Codes in 2026.", metaDescription: "Discover the latest TouchTunes coupon codes, verified TouchTunes discount codes, and special offers for jukebox credits to save big in 2026.", excerpt: "Unlock exclusive savings, free credits, and special promotional offers via credible TouchTunes coupon codes for your favorite jukebox songs. No catch—verified deals that work.", date: "2026-03-06", category: "Saving Tips" },
];

function categoryTitleToSlug(title) {
  return title.toLowerCase().replace(/\s*&\s*/g, "-and ").replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
}

async function main() {
  const { createClient } = require("@sanity/client");
  const client = createClient({
    projectId,
    dataset,
    apiVersion: "2024-01-01",
    token,
    useCdn: false,
  });

  const categories = [...new Set(staticPosts.map((p) => p.category))];
  const categoryIdMap = {};

  console.log("Creating categories...");
  for (const title of categories) {
    const slug = categoryTitleToSlug(title);
    const _id = `category-${slug}`;
    await client.createOrReplace({
      _id,
      _type: "category",
      title,
      slug: { _type: "slug", current: slug },
    });
    categoryIdMap[title] = _id;
    console.log("  ", title);
  }

  console.log("\nCreating blog posts...");
  for (const post of staticPosts) {
    const categoryId = categoryIdMap[post.category];
    const publishedAt = post.date ? `${post.date}T12:00:00.000Z` : new Date().toISOString();
    await client.createOrReplace({
      _id: `post-${post.slug}`,
      _type: "post",
      title: post.title,
      slug: { _type: "slug", current: post.slug },
      excerpt: post.excerpt,
      publishedAt,
      metaTitle: post.metaTitle || post.title,
      metaDescription: post.metaDescription || post.excerpt,
      author: "SeemPromo",
      ...(categoryId && { category: { _type: "reference", _ref: categoryId } }),
      body: [
        {
          _type: "block",
          _key: "intro",
          children: [{ _type: "span", _key: "1", text: post.excerpt }],
          markDefs: [],
          style: "normal",
        },
      ],
    });
    console.log("  ", post.slug);
  }

  console.log("\nDone. Open Sanity Studio to see the imported posts and add featured images/body if needed.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
