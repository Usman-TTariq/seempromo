import type { ReactNode } from "react";

export default function HomeLayout({ children }: { children: ReactNode }) {
  return (
    <div className="w-full max-w-[100vw] min-w-0 overflow-x-hidden">
      {children}
    </div>
  );
}
