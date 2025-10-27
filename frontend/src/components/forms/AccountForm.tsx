"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export type UserProfile = {
  name?: string;
  email?: string;
  language?: string;
};

export function AccountForm({
  profile,
  onSave
}: {
  profile: UserProfile | null;
  onSave: (data: { name: string; email: string; language: string }) => void;
}) {
  // estado local inicializado una vez desde profile
  const [localName, setLocalName] = useState<string>(profile?.name ?? "");
  const [localEmail, setLocalEmail] = useState<string>(profile?.email ?? "");
  const [language, setLanguage] = useState<string>(
    profile?.language ?? "es"
  );

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSave({
      name: localName,
      email: localEmail,
      language
    });
  }

  return (
    <form className="space-y-4 text-sm" onSubmit={handleSubmit}>
      <div className="space-y-1">
        <label className="block text-[var(--text-primary)] font-medium">
          Nombre
        </label>
        <input
          className="w-full rounded-md border border-border bg-transparent px-3 py-2 text-[var(--text-primary)] outline-none focus:ring-2 focus:ring-[var(--text-primary)]/20"
          value={localName}
          onChange={(e) => setLocalName(e.target.value)}
        />
      </div>

      <div className="space-y-1">
        <label className="block text-[var(--text-primary)] font-medium">
          Email
        </label>
        <input
          className="w-full rounded-md border border-border bg-transparent px-3 py-2 text-[var(--text-primary)] outline-none focus:ring-2 focus:ring-[var(--text-primary)]/20"
          value={localEmail}
          onChange={(e) => setLocalEmail(e.target.value)}
          type="email"
        />
      </div>

      <div className="space-y-1">
        <label className="block text-[var(--text-primary)] font-medium">
          Idioma
        </label>
        <select
          className="w-full rounded-md border border-border bg-transparent px-3 py-2 text-[var(--text-primary)] outline-none focus:ring-2 focus:ring-[var(--text-primary)]/20"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        >
          <option value="es">Español</option>
          <option value="en">English</option>
        </select>
      </div>

      <Button type="submit" className="w-full">
        Guardar cambios
      </Button>
    </form>
  );
}
