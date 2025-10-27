"use client";

// logger mínimo centralizado
export function logError(scope: string, details: unknown) {
  // En producción real: enviar a un servicio externo (Sentry, etc.)
  console.error(`[${scope}]`, details);
}
