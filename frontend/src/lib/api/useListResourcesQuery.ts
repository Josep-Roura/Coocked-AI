"use client";

import { useQuery } from "@tanstack/react-query";
import { listResourcesAPI, type CreatedResource } from "./resources";

export function useListResourcesQuery() {
  const query = useQuery<CreatedResource[], Error>({
    queryKey: ["resources", "list"],
    queryFn: async () => {
      return listResourcesAPI();
    },
    staleTime: 1000 * 30 // 30s - evita re-fetch agresivo si navegas entre páginas
  });

  return {
    data: query.data ?? [],
    isLoading: query.isLoading,
    error: query.error
  };
}
