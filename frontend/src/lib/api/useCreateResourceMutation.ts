"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createResourceAPI,
  type CreateResourceInput,
  type CreatedResource
} from "./resources";

export function useCreateResourceMutation(opts?: {
  onSuccess?: (res: CreatedResource) => void;
  onError?: (err: Error) => void;
}) {
  const queryClient = useQueryClient();

  const mutation = useMutation<CreatedResource, Error, CreateResourceInput>({
    mutationFn: async (payload: CreateResourceInput) => {
      return createResourceAPI(payload);
    },
    onSuccess: (res) => {
      // invalidamos la lista para que /app/resources se actualice
      queryClient.invalidateQueries({
        queryKey: ["resources", "list"]
      });
      opts?.onSuccess?.(res);
    },
    onError: (err) => {
      opts?.onError?.(err);
    }
  });

  return {
    createResource: mutation.mutate,
    isLoading: mutation.isPending,
    error: mutation.error
  };
}
