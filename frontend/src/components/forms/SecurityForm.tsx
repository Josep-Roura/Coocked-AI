"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export type SecurityProfile = {
  twoFactorEnabled?: boolean;
};

export function SecurityForm({
  profile,
  onSave
}: {
  profile: SecurityProfile | null;
  onSave: (data: { twoFactorEnabled: boolean }) => void;
}) {
  const [twoFactor, setTwoFactor] = useState<boolean>(
    !!profile?.twoFactorEnabled
  );

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSave({
      twoFactorEnabled: twoFactor
    });
  }

  return (
    <form className="space-y-4 text-sm" onSubmit={handleSubmit}>
      <div className="flex items-center justify-between">
        <div>
          <div className="text-[var(--text-primary)] font-medium">
            Doble factor
          </div>
          <div className="text-[var(--text-secondary)] text-xs leading-relaxed">
            Te pediremos un código al iniciar sesión.
          </div>
        </div>
        <input
          type="checkbox"
          className="h-4 w-4 accent-[var(--text-primary)]"
          checked={twoFactor}
          onChange={(e) => setTwoFactor(e.target.checked)}
        />
      </div>

      <Button type="submit" className="w-full">
        Guardar seguridad
      </Button>
    </form>
  );
}
