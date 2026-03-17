# Import existing blogs into Sanity

Site ke jo blogs ab code mein (static) hain, unhe Sanity Studio mein dikhane ke liye ye script chalao.

## 1. Sanity token banao

1. [sanity.io/manage](https://sanity.io/manage) → apna project **vcoir7t9** kholo  
2. **API** → **Tokens** → **Add API token**  
3. Name: `Import script`, Permission: **Editor** (taake create/update ho sake)  
4. Token copy karo  

## 2. .env mein token add karo

Project root ki `.env` ya `.env.local` mein add karo:

```
SANITY_API_WRITE_TOKEN=sk...paste_token_here...
```

## 3. Script chalao

```bash
node scripts/import-blogs-to-sanity.js
```

Ye script:

- Sanity mein **Categories** create karega (Store Guides, Saving Tips, Deals, etc.)
- **11 static blog posts** create karega (title, slug, excerpt, date, meta, category)

Uske baad Sanity Studio kholo — **Blog Post** list mein ye posts dikhni chahiye. Featured image aur full body ab bhi Studio mein ja kar add kar sakte ho.
