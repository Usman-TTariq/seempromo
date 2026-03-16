# Supabase: poora data dusre project mein copy karna

## Step 1: Target project mein schema banao

Dusre (target) Supabase project mein pehle **same schema** hona chahiye:

- **Option A:** Target project par wahi migrations run karo jo source par hain.  
  (Agar migrations ka history source Supabase Dashboard se mil jaye ya repo mein ho.)
- **Option B:** Source project → **Database** → **Backups** se backup download karke dekh lo (schema + data dono hota hai).
- **Option C:** Source project → **SQL Editor** → koi bhi table pe right‑click → **Definition** / “Create script” jaisa option (agar ho) use karke schema copy karo.

## Step 2: Source se data export karo

1. `.env` mein **source** Supabase set ho:
   - `NEXT_PUBLIC_SUPABASE_URL` = jis project se data copy karna hai
   - `SUPABASE_SERVICE_ROLE_KEY` = usi project ka service role key

2. Project root se script chalao:

```bash
node scripts/export-supabase-data.js
```

3. Script `supabase-full-data-export.sql` bana degi (project root ke paas).

## Step 3: Target project mein data daalo

1. **Target** Supabase project kholo → **SQL Editor**.
2. `supabase-full-data-export.sql` ka **pura content** copy karke paste karo.
3. **Run** karo.

Agar target par pehle se data hai aur tum overwrite nahi karna chahte, to export file mein `ON CONFLICT (id) DO NOTHING` already hai — duplicate id wali rows skip ho jayengi.

---

**Summary:** Pehle target par schema banao, phir source se ye script chala kar SQL file banao, phir wohi file target ke SQL Editor mein run karo.
