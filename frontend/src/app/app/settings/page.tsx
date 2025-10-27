"use client";

import { useState } from "react";
import { Tabs } from "@/components/ui/tabs";
import { AccountForm } from "@/components/forms/AccountForm";
import { SecurityForm } from "@/components/forms/SecurityForm";
// Podemos añadir Notificaciones como placeholder por ahora.

export default function SettingsPage() {
  const [tab, setTab] = useState<"account" | "security" | "notifications">(
    "account"
  );

  return (
    <div className="space-y-6">
      {/* Header de la página */}
      <header className="space-y-1">
        <h1 className="text-xl font-semibold text-[var(--text-primary)] leading-tight">
          Ajustes de la cuenta
        </h1>
        <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
          Gestiona tus datos personales, seguridad y notificaciones.
        </p>
      </header>

      {/* Tabs */}
      <Tabs
        tabs={[
          { value: "account", label: "Cuenta" },
          { value: "security", label: "Seguridad" },
          { value: "notifications", label: "Notificaciones" }
        ]}
        value={tab}
        onChange={(val) =>
          setTab(val as "account" | "security" | "notifications")
        }
      />

      {/* Contenido dinámico */}
      <section className="pt-4">
        {tab === "account" && <AccountForm />}
        {tab === "security" && <SecurityForm />}
        {tab === "notifications" && (
          <div className="text-sm text-[var(--text-secondary)]">
            Próximamente: preferencias de correo, resumen diario, alertas push.
          </div>
        )}
      </section>
    </div>
  );
}
