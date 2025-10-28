import type { Metadata } from "next";
import "@/styles/globals.css";
import { PublicHeader } from "@/components/layout/PublicHeader";
import { AppProviders } from "@/components/AppProviders";
import { ThemeInit } from "@/components/ThemeInit";
import { Analytics } from "@/components/Analytics";

export const metadata: Metadata = {
  metadataBase: new URL("https://coocked.ai"),
  title: "Coocked AI – Cook smarter. Recover stronger.",
  description:
    "Coocked AI diseña planes de nutrición diarios personalizados con IA para maximizar tu recuperación y rendimiento tras cada entreno.",
  openGraph: {
    title: "Coocked AI",
    description:
      "Nutrición inteligente para atletas. Genera tu plan diario personalizado con IA.",
    url: "https://coocked.ai",
    siteName: "Coocked AI",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Coocked AI App Preview"
      }
    ],
    locale: "es_ES",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Coocked AI",
    description:
      "Planes diarios de nutrición post-entreno generados por IA.",
    images: ["/og-image.png"]
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png"
  },
  manifest: "/manifest.json"
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="bg-[var(--bg)]">
      <body className="text-[var(--text-primary)] bg-[var(--bg)] antialiased font-sans">
        <AppProviders>
          <ThemeInit />
          <Analytics />
          <PublicHeader />
          <main className="px-4 py-12">
            <div className="mx-auto max-w-content">{children}</div>
          </main>
        </AppProviders>
      </body>
    </html>
  );
}
