"use client";

import { useSidebarStore } from "@/lib/store/useSidebarStore";
import { cn } from "@/lib/utils";
import { Home, Settings, Folder } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Sidebar() {
  const { isOpen, toggle } = useSidebarStore();

  return (
    <aside
      className={cn(
        "border-r border-border bg-surface text-[var(--text-primary)] flex flex-col transition-all duration-200",
        isOpen ? "w-56" : "w-16"
      )}
    >
      <div className="flex h-14 items-center justify-between px-3">
        <span
          className={cn(
            "font-semibold text-sm transition-opacity",
            !isOpen && "opacity-0"
          )}
        >
          Cooked-AI
        </span>

        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0"
          onClick={toggle}
          aria-label="Toggle sidebar"
        >
          {isOpen ? "<" : ">"}
        </Button>
      </div>

      <nav className="flex flex-1 flex-col gap-1 px-2 text-sm">
        <a
          className="flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-black/5"
          href="/app"
        >
          <Home className="h-4 w-4" />
          {isOpen && <span>Dashboard</span>}
        </a>

        <a
          className="flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-black/5"
          href="/app/resources"
        >
          <Folder className="h-4 w-4" />
          {isOpen && <span>Resources</span>}
        </a>

        <a
          className="flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-black/5"
          href="/app/settings"
        >
          <Settings className="h-4 w-4" />
          {isOpen && <span>Settings</span>}
        </a>
      </nav>

      <div className="border-t border-border p-3 text-[var(--text-secondary)] text-xs">
        {isOpen && <p>Versión 0.0.1</p>}
      </div>
    </aside>
  );
}
