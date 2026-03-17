import { createClient } from "@sanity/client";
import { createImageUrlBuilder } from "@sanity/image-url";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "vcoir7t9";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion: "2024-01-01",
  useCdn: process.env.NODE_ENV === "production",
});

const builder = createImageUrlBuilder(sanityClient);

/** Sanity image ref se URL banane ke liye (e.g. blog featured images). */
export function sanityImageUrl(source: { _ref?: string; _type?: string } | null | undefined) {
  return source ? builder.image(source).url() : null;
}
