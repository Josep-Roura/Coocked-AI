"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logAdherenceAPI } from "./adherence";

export function useAdherenceMutation() {
  const qc = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (payload: { resourceId: string; taken: boolean }) => {
      return logAdherenceAPI(payload);
    },
    onSuccess: () => {
      // invalidamos las métricas de adherencia para que se refresquen
      qc.invalidateQueries({
        queryKey: ["adherence", "stats7d"]
      });
    }
  });

  return {
    markAdherence: mutation.mutate,
    isSaving: mutation.isPending,
    error: mutation.error
  };
}
