/**
 * Historial de adherencia y planes previos. Por ahora muestra placeholder hasta integrar queries reales.
 */
export function HistoryPage() {
  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold text-foreground">Historial</h1>
        <p className="text-sm text-muted-foreground">
          Próximamente: consulta tus planes diarios anteriores, adherencia y métricas clave.
        </p>
      </header>
      <div className="rounded-2xl border border-dashed border-border p-6 text-sm text-muted-foreground">
        Integraremos aquí el listado de planes guardados desde Supabase.
      </div>
    </div>
  );
}
