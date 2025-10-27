"use client";

import { Button } from "@/components/ui/button";

export function PublicHeader() {
  return (
    <header className="border-b border-border bg-surface">
      <div className="mx-auto flex max-w-content items-center justify-between px-4 py-4">
        <div className="text-base font-semibold text-[var(--text-primary)]">
          Cooked-AI
        </div>

        <nav className="flex items-center gap-4 text-sm text-[var(--text-secondary)]">
          <a className="hover:text-[var(--text-primary)]" href="#features">
            Features
          </a>
          <a className="hover:text-[var(--text-primary)]" href="#pricing">
            Pricing
          </a>
          <Button size="sm" className="min-w-[80px]">
            Entrar
          </Button>
        </nav>
      </div>
    </header>
  );
}
