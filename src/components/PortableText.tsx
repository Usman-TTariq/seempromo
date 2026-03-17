"use client";

import { PortableText as PortableTextReact, type PortableTextComponents, type PortableTextBlock } from "@portabletext/react";
import Link from "next/link";
import { sanityImageUrl } from "@/lib/sanity";

const components: PortableTextComponents = {
  block: {
    h1: ({ children }) => (
      <h1 className="text-3xl sm:text-4xl font-bold text-space mb-6 mt-8 first:mt-0">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-2xl font-bold text-space mt-10 mb-4">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl font-bold text-space mt-8 mb-3">{children}</h3>
    ),
    normal: ({ children }) => (
      <p className="text-space/90 text-base leading-relaxed mb-4">{children}</p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-rebecca/50 pl-4 py-2 my-4 text-space/90 italic">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc list-inside text-space/90 mb-4 space-y-1">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal list-inside text-space/90 mb-4 space-y-1">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li className="ml-2">{children}</li>,
    number: ({ children }) => <li className="ml-2">{children}</li>,
  },
  marks: {
    link: ({ children, value }) => {
      const href = value?.href ?? "#";
      const isExternal = href.startsWith("http");
      return isExternal ? (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-rebecca font-medium underline hover:no-underline"
        >
          {children}
        </a>
      ) : (
        <Link href={href} className="text-rebecca font-medium underline hover:no-underline">
          {children}
        </Link>
      );
    },
    strong: ({ children }) => <strong className="font-bold text-space">{children}</strong>,
  },
  types: {
    image: ({ value }) => {
      const url = sanityImageUrl(value);
      if (!url) return null;
      const alt = (value as { alt?: string }).alt ?? "";
      const caption = (value as { caption?: string }).caption;
      return (
        <figure className="my-6">
          <img
            src={url}
            alt={alt}
            className="w-full rounded-lg border border-gray-200 shadow-sm"
          />
          {caption && (
            <figcaption className="mt-2 text-sm text-space/70 text-center">{caption}</figcaption>
          )}
        </figure>
      );
    },
  },
};

type Props = { value: unknown[] };

export default function PortableText({ value }: Props) {
  if (!Array.isArray(value) || value.length === 0) return null;
  return (
    <div className="prose prose-slate max-w-none prose-headings:text-space prose-a:text-rebecca prose-a:no-underline hover:prose-a:underline">
      <PortableTextReact value={value as PortableTextBlock[]} components={components} />
    </div>
  );
}
