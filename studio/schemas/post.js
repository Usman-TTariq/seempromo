import { defineType, defineField } from "sanity";

export default defineType({
  name: "post",
  type: "document",
  title: "Blog Post",
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "seo", title: "SEO & Meta" },
    { name: "settings", title: "Settings" },
  ],
  fields: [
    defineField({
      name: "title",
      type: "string",
      title: "Title",
      group: "content",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      title: "URL slug",
      group: "content",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "excerpt",
      type: "text",
      title: "Excerpt",
      group: "content",
      rows: 3,
      description: "Short summary for listings and meta description fallback.",
    }),
    defineField({
      name: "mainImage",
      type: "image",
      title: "Featured image",
      group: "content",
      options: { hotspot: true },
    }),
    defineField({
      name: "publishedAt",
      type: "datetime",
      title: "Published at",
      group: "settings",
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: "category",
      type: "reference",
      title: "Category",
      group: "settings",
      to: [{ type: "category" }],
    }),
    defineField({
      name: "author",
      type: "string",
      title: "Author name",
      group: "settings",
      initialValue: "SeemPromo",
    }),
    defineField({
      name: "body",
      type: "array",
      title: "Body",
      group: "content",
      of: [
        { type: "block" },
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            { name: "alt", type: "string", title: "Alt text" },
            { name: "caption", type: "string", title: "Caption" },
          ],
        },
      ],
    }),
    defineField({
      name: "metaTitle",
      type: "string",
      title: "Meta title",
      group: "seo",
      description: "Override for <title> and Open Graph. Leave blank to use post title.",
    }),
    defineField({
      name: "metaDescription",
      type: "text",
      title: "Meta description",
      group: "seo",
      rows: 2,
      description: "Override for meta description and OG. Leave blank to use excerpt.",
    }),
    defineField({
      name: "ogImage",
      type: "image",
      title: "OG image",
      group: "seo",
      description: "Override for social share image. Defaults to featured image.",
    }),
  ],
  orderings: [
    { title: "Published (new first)", name: "publishedAtDesc", by: [{ field: "publishedAt", direction: "desc" }] },
    { title: "Published (old first)", name: "publishedAtAsc", by: [{ field: "publishedAt", direction: "asc" }] },
  ],
  preview: {
    select: { title: "title", subtitle: "publishedAt", media: "mainImage" },
    prepare({ title, subtitle, media }) {
      return {
        title: title || "Untitled",
        subtitle: subtitle ? new Date(subtitle).toLocaleDateString() : "",
        media,
      };
    },
  },
});
