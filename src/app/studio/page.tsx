import Link from "next/link";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Sanity Studio | SeemPromo",
  robots: "noindex, nofollow",
};

function getStudioUrl(): string | null {
  const raw = process.env.NEXT_PUBLIC_SANITY_STUDIO_URL?.trim();
  if (!raw) return null;
  try {
    const u = new URL(raw);
    return u.origin && (u.protocol === "https:" || u.protocol === "http:") ? raw : null;
  } catch {
    return null;
  }
}

export default function StudioPage() {
  const studioUrl = getStudioUrl();
  if (studioUrl) {
    redirect(studioUrl);
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-100 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg border border-slate-200 p-8 text-center">
        <h1 className="text-xl font-bold text-slate-800 mb-2">Sanity Studio</h1>
        <p className="text-slate-600 text-sm mb-6">
          Studio.
        </p>
        <div className="bg-slate-50 rounded-xl p-4 text-left text-sm text-slate-700 font-mono mb-6">
          <p className="font-semibold text-slate-800 mb-2">Local par chalane ke liye:</p>
          <p>1. Terminal kholo</p>
          <p>2. <code className="bg-slate-200 px-1 rounded">npm run studio</code></p>
          <p>3. Browser mein open karo: <strong>http://localhost:3333/studio</strong></p>
        </div>
        <p className="text-slate-500 text-xs mb-6">
          Online host karna ho to <code className="bg-slate-100 px-1">studio</code> folder mein <code className="bg-slate-100 px-1">npm run deploy</code> chalao. Jo URL mile usko Vercel/env mein <code className="bg-slate-100 px-1">NEXT_PUBLIC_SANITY_STUDIO_URL</code> daal do — phir /studio kholte hi Studio khul jayega.
        </p>
        <Link
          href="/"
          className="inline-block text-[#34C759] font-medium hover:underline"
        >
          ← Wapas home
        </Link>
      </div>
    </div>
  );
}
