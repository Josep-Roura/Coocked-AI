import type { Metadata } from "next";
import "@/styles/globals.css";
import { PublicHeader } from "@/components/layout/PublicHeader";

export const metadata: Metadata = {
  title: "Cooked-AI",
  description: "Cooked-AI: descripción corta del producto aquí."
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="bg-[var(--bg)]">
      <body>
        <PublicHeader />
        <main className="px-4 py-12 text-[var(--text-primary)]">
          <div className="mx-auto max-w-content">{children}</div>
        </main>
      </body>
    </html>
  );
}
