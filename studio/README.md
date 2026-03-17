# SeemPromo Blog – Sanity Studio

Content for the blog is managed here. Project ID: **vcoir7t9**, dataset: **production**.

## Run locally (same URL as site: /studio)

**Dono cheezein chalao:**

1. **Next.js** (site) – jis port pe chala rahe ho, e.g. 3002:
   ```bash
   npm run dev
   ```
   (Port 3002 ke liye: `npm run dev -- -p 3002`)

2. **Sanity Studio** – alag terminal mein:
   ```bash
   npm run studio
   ```
   (ya `cd studio && npm run dev`) — ye **http://localhost:3333** par chalega.

Phir browser mein **http://localhost:3002/studio** kholo. Next.js is URL ko 3333 par chal rahe Studio se connect kar dega.

Sirf Studio kholna ho to: **http://localhost:3333/studio**.

## First-time setup

1. Go to [sanity.io/manage](https://sanity.io/manage) and open project **vcoir7t9** (or create it).
2. Create a dataset named **production**.
3. In Studio, create at least one **Category** (e.g. "Saving Tips"), then create **Blog Post** documents with title, slug (Generate from title), excerpt, body, and optional featured image and SEO fields.

## Schema

- **Category**: title, slug, description.
- **Post**: title, slug, excerpt, featured image, published date, category, author, body (Portable Text), and SEO (meta title, meta description, OG image).

## Deploy Studio (optional)

From the **studio** folder:

```bash
npm run deploy
```

Follow the prompts to host Studio at a URL like `https://your-project.sanity.studio`.
