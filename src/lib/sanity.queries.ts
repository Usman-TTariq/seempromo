/** GROQ: all published posts for listing, newest first. */
export const POSTS_LIST_QUERY = `*[_type == "post" && defined(publishedAt)] | order(publishedAt desc) {
  _id,
  _type,
  title,
  slug,
  excerpt,
  publishedAt,
  mainImage,
  metaTitle,
  metaDescription,
  author,
  "category": category->{
    _id,
    title,
    "slug": slug.current
  }
}`;

/** GROQ: single post by slug with body and OG image. */
export const POST_BY_SLUG_QUERY = `*[_type == "post" && slug.current == $slug][0] {
  _id,
  _type,
  title,
  slug,
  excerpt,
  publishedAt,
  mainImage,
  metaTitle,
  metaDescription,
  ogImage,
  author,
  body,
  "category": category->{
    _id,
    title,
    "slug": slug.current
  }
}`;

/** GROQ: all post slugs (for static params / sitemap). */
export const POST_SLUGS_QUERY = `*[_type == "post" && defined(slug.current)]{ "slug": slug.current }`;

/** GROQ: latest N posts (e.g. for home page). */
export function latestPostsQuery(limit: number) {
  return `*[_type == "post" && defined(publishedAt)] | order(publishedAt desc)[0...${limit}] {
  _id,
  _type,
  title,
  slug,
  excerpt,
  publishedAt,
  mainImage,
  metaTitle,
  metaDescription,
  author,
  "category": category->{ title, "slug": slug.current }
}`;
}
