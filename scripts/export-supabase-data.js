/**
 * Export full data from current (SOURCE) Supabase to a SQL file.
 * Run from project root: node scripts/export-supabase-data.js
 * Uses .env: NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY (source project).
 *
 * Then run the generated file in TARGET Supabase → SQL Editor.
 * Target must already have the same schema (run migrations or restore schema first).
 */

const fs = require('fs');
const path = require('path');

// Load .env from project root (no dotenv dependency). Tries cwd and script dir.
function loadEnv() {
  const roots = [process.cwd(), path.join(__dirname, '..')];
  for (const root of roots) {
    for (const name of ['.env', '.env.local']) {
      const envPath = path.join(root, name);
      if (fs.existsSync(envPath)) {
        const raw = fs.readFileSync(envPath, 'utf8').replace(/\r\n/g, '\n');
        raw.split('\n').forEach((line) => {
          const m = line.match(/^([^#=]+)=(.*)$/);
          if (m) {
            const key = m[1].trim();
            let val = (m[2] || '').trim().replace(/^["']|["']$/g, '');
            process.env[key] = val;
          }
        });
        return;
      }
    }
  }
}
loadEnv();

const { createClient } = require('@supabase/supabase-js');

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !key) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env');
  process.exit(1);
}

const supabase = createClient(url, key);

// Tables in FK-safe order (parent tables first). Use exact case as in DB.
const TABLE_ORDER = [
  'User',
  'PublisherProfile',
  'Advertiser',
  'PublisherBrandApplication',
  'PublisherAdvertiser',
  'PublisherPartnerizeApplication',
  'PublisherImpactApplication',
  'TrackingLink',
  'LinkClick',
  'Commission',
  'news',
  'stores',
  'blog_posts',
  'store_reviews',
  'coupon_clicks',
  'site_settings',
  'coupon_click_events',
  'admitad_referrals',
  'admitad_retag',
  'admitad_short_links',
  'admitad_user_info',
  'admitad_campaigns',
  'admitad_websites',
  'admitad_banners',
  'admitad_coupons',
  'admitad_announcements',
  'admitad_landings',
  'admitad_lost_orders',
  'admitad_news',
  'admitad_broker_applications',
  'admitad_aliexpress_commission',
  'admitad_categories',
  'admitad_sync_log',
  'coupons',
  'impact_campaigns',
];

function quoteIdent(name) {
  if (name === name.toLowerCase() && !name.includes(' ')) return name;
  return '"' + name.replace(/"/g, '""') + '"';
}

function sqlLiteral(val) {
  if (val === null || val === undefined) return 'NULL';
  if (typeof val === 'boolean') return val ? 'true' : 'false';
  if (typeof val === 'number' && !Number.isNaN(val)) return String(val);
  if (typeof val === 'object') return "'" + JSON.stringify(val).replace(/'/g, "''") + "'::jsonb";
  return "'" + String(val).replace(/'/g, "''") + "'";
}

async function fetchTable(tableName) {
  const { data, error } = await supabase.from(tableName).select('*');
  if (error) {
    console.warn(`Skip ${tableName}: ${error.message}`);
    return [];
  }
  return data || [];
}

async function main() {
  const outPath = path.join(__dirname, '..', 'supabase-full-data-export.sql');
  const lines = [
    '-- Supabase full data export. Run this in TARGET project SQL Editor.',
    '-- Target must have the same schema (run migrations first).',
    '-- Generated: ' + new Date().toISOString(),
    '',
  ];

  for (const tableName of TABLE_ORDER) {
    const rows = await fetchTable(tableName);
    if (rows.length === 0) continue;

    const cols = Object.keys(rows[0]);
    const idCol = cols.includes('id') ? 'id' : null;
    const conflictClause = idCol ? ` ON CONFLICT (${quoteIdent(idCol)}) DO NOTHING` : '';

    for (const row of rows) {
      const vals = cols.map((c) => sqlLiteral(row[c]));
      const sql = `INSERT INTO public.${quoteIdent(tableName)} (${cols.map(quoteIdent).join(', ')}) VALUES (${vals.join(', ')})${conflictClause};`;
      lines.push(sql);
    }
    lines.push('');
    console.log(`Exported ${rows.length} rows from ${tableName}`);
  }

  fs.writeFileSync(outPath, lines.join('\n'), 'utf8');
  console.log('\nDone. File: ' + outPath);
  console.log('Run this file in your TARGET Supabase project → SQL Editor.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
