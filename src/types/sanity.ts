/** Sanity document base. */
export interface SanityDocument {
  _id: string;
  _type: string;
  _rev?: string;
  _createdAt?: string;
  _updatedAt?: string;
}

/** Category from Sanity (reference resolved in GROQ). */
export interface SanityCategory {
  _type: "category";
  _id?: string;
  title?: string;
  slug?: { current: string };
}

/** Image asset reference / expanded. */
export interface SanityImageRef {
  _type: "image";
  asset?: { _ref: string; _type: string };
}

/** Blog post as returned by GROQ (listing). */
export interface SanityPostListing {
  _id: string;
  _type: "post";
  title: string | null;
  slug: { current: string } | null;
  excerpt: string | null;
  publishedAt: string | null;
  mainImage: SanityImageRef | null;
  metaTitle: string | null;
  metaDescription: string | null;
  category?: SanityCategory | null;
  author?: string | null;
}

/** Blog post single (with body for Portable Text). */
export interface SanityPostFull extends SanityPostListing {
  body: unknown[] | null;
  ogImage: SanityImageRef | null;
}

/** Normalized post for app (same shape as BlogPostMeta where possible). */
export interface SanityPostNormalized {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  excerpt: string;
  date: string;
  category: string;
  featuredImage: string | null;
  author: string;
}
