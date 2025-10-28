"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useSession } from "@/lib/auth/session";
import { Button } from "@/components/ui/button";

export function PublicHeader() {
  const { isAuthenticated, ready } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  const navItems = [
    { href: "/", label: "Inicio" },
    { href: "/about", label: "Sobre nosotros" },
    { href: "/plans", label: "Planes" },
    { href: "/dashboard", label: "Dashboard" },
    { href: "/contact", label: "Contacto" }
  ];

  function goDashboard() {
    router.push("/app");
  }

  function goLogin() {
    router.push("/login");
  }

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#111111]/80 backdrop-blur">
      <div className="mx-auto flex w-full max-w-content items-center justify-between gap-6 px-4 py-4">
        <Link href="/" className="flex items-baseline gap-2 text-white">
          <span className="font-heading text-lg tracking-tight">Coocked AI</span>
          <span className="rounded-full bg-[#34D399] px-2 py-[2px] text-[10px] font-semibold uppercase text-black">
            Demo
          </span>
        </Link>

        <nav className="hidden items-center gap-6 text-sm text-white/70 md:flex">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`transition-colors hover:text-white ${
                  active ? "text-white" : ""
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          {!ready ? null : isAuthenticated ? (
            <Button
              className="rounded-xl bg-[#4A90E2] px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:scale-[1.02] hover:bg-[#3b7ac0]"
              onClick={goDashboard}
            >
              Ir al panel
            </Button>
          ) : (
            <Button
              className="rounded-xl border border-white/40 bg-transparent px-4 py-2 text-sm font-semibold text-white transition hover:scale-[1.02] hover:border-white"
              variant="ghost"
              onClick={goLogin}
            >
              Acceder
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
