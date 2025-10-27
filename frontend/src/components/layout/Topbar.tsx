"use client";

import { useAuth } from "@/hooks/useAuth";

export function Topbar() {
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-20 flex h-14 items-center justify-between border-b border-border bg-surface px-4">
      <div className="text-sm font-medium text-[var(--text-primary)]">
        Dashboard
      </div>

      <div className="flex items-center gap-3 text-sm text-[var(--text-secondary)]">
        <span className="truncate max-w-[140px]">{user.email}</span>

        <div className="h-8 w-8 rounded-full bg-primary text-white text-xs flex items-center justify-center font-medium">
          {user.name
            .split(" ")
            .map((p) => p[0]?.toUpperCase())
            .slice(0, 2)
            .join("")}
        </div>
      </div>
    </header>
  );
}
