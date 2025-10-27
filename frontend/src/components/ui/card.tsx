import * as React from "react";
import { cn } from "@/lib/utils";

export function Card({
  className,
  children
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "bg-surface text-[var(--text-primary)] rounded-lg shadow-md border border-border p-6",
        className
      )}
    >
      {children}
    </div>
  );
}

export function CardHeader({
  title,
  description
}: {
  title: string;
  description?: string;
}) {
  return (
    <header className="mb-4">
      <h2 className="text-lg font-semibold leading-tight">{title}</h2>
      {description && (
        <p className="text-sm text-[var(--text-secondary)] mt-1">
          {description}
        </p>
      )}
    </header>
  );
}

export function CardContent({
  children
}: {
  children: React.ReactNode;
}) {
  return <div className="text-sm">{children}</div>;
}
