import { cn } from "@/lib/utils";

export function TableWrapper({
  children,
  className
}: {
  children: React.ReactNode;
  className?: string;
}) {
  // overflow-x-auto: si hay muchas columnas, permite scroll horizontal
  // shadow-sm/border: da look "real dashboard"
  return (
    <div
      className={cn(
        "rounded-lg border border-border bg-surface shadow-sm overflow-x-auto",
        className
      )}
    >
      <table className="min-w-full text-sm text-left text-[var(--text-primary)]">
        {children}
      </table>
    </div>
  );
}

export function THead({ children }: { children: React.ReactNode }) {
  return (
    <thead className="bg-[rgba(0,0,0,0.03)] text-[var(--text-secondary)] text-xs uppercase tracking-wide">
      {children}
    </thead>
  );
}

export function TBody({ children }: { children: React.ReactNode }) {
  return <tbody className="divide-y divide-border">{children}</tbody>;
}

export function TR({ children }: { children: React.ReactNode }) {
  return <tr className="hover:bg-black/5">{children}</tr>;
}

export function TH({
  children,
  className
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <th className={cn("px-4 py-3 font-medium whitespace-nowrap", className)}>
      {children}
    </th>
  );
}

export function TD({
  children,
  className
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <td className={cn("px-4 py-3 align-middle text-[var(--text-primary)]", className)}>
      {children}
    </td>
  );
}
