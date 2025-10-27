"use client";

import { useState } from "react";

type MarkAdherenceInput = {
  resourceId: string;
  taken: boolean;
};

export function useAdherenceMutation() {
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function markAdherence(input: MarkAdherenceInput) {
    try {
      setIsSaving(true);
      setError(null);

      const res = await fetch("/api/adherence", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          planId: input.resourceId,
          taken: input.taken
        })
      });

      if (!res.ok) {
        throw new Error("Error guardando adherencia");
      }

      // Leemos y descartamos la respuesta sólo para asegurar que no explota
      await res.json();
    } catch (err) {
      const e = err instanceof Error ? err : new Error("Error desconocido");
      setError(e.message);
    } finally {
      setIsSaving(false);
    }
  }

  return { markAdherence, isSaving, error };
}
