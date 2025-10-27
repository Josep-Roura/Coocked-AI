"use client";

import { AppLayout } from "@/components/layout/AppLayout";
import { QueryClientProvider } from "@tanstack/react-query";
import { getQueryClient } from "@/lib/queryClient";
import { ReactNode, useState } from "react";

export default function InternalLayout({
  children
}: {
  children: ReactNode;
}) {
  // Creamos un QueryClient que se mantenga estable
  // por cada render del layout
  const [queryClient] = useState(() => getQueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <AppLayout>{children}</AppLayout>
    </QueryClientProvider>
  );
}
