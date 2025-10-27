"use client";

import { useState } from "react";

export type CreatedPlan = {
  id: string;
  title: string;
  category: string;
  description: string;
  createdAt: string;
};

type CreateResourceInput = {
  title: string;
  description: string;
  category: string;
  visibility: string;
  planData?: Record<string, unknown>;
};

export function useCreateResourceMutation(options?: {
  onSuccess?: (plan: CreatedPlan) => void;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  async function createResource(input: CreateResourceInput) {
    try {
      setIsLoading(true);
      setError(null);

      const res = await fetch("/api/plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: input.title,
          category: input.category,
          description: input.description
        })
      });

      if (!res.ok) {
        throw new Error("Error creando plan");
      }

      const json: { ok: boolean; plan: CreatedPlan } = await res.json();

      if (options?.onSuccess) {
        options.onSuccess(json.plan);
      }
    } catch (err) {
      const e = err instanceof Error ? err : new Error("Error desconocido");
      setError(e);
    } finally {
      setIsLoading(false);
    }
  }

  return { createResource, isLoading, error };
}
