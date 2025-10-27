"use client";

import {
  TableWrapper,
  THead,
  TBody,
  TR,
  TH,
  TD
} from "@/components/ui/table";
import { Alert } from "@/components/feedback/Alert";
import { Loader } from "@/components/feedback/Loader";
import { useListResourcesQuery } from "@/lib/api/useListResourcesQuery";

export default function ResourcesPage() {
  const { data, isLoading, error } = useListResourcesQuery();

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-xl font-semibold text-[var(--text-primary)] leading-tight">
          Tus recursos
        </h1>
        <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
          Aquí verás todo lo que has ido creando.
        </p>
      </header>

      {/* Estado: cargando */}
      {isLoading && (
        <div className="flex items-center gap-3 text-sm text-[var(--text-secondary)]">
          <Loader />
          <span>Cargando recursos...</span>
        </div>
      )}

      {/* Estado: error */}
      {error && (
        <Alert
          variant="error"
          title="No se han podido cargar los recursos"
          description={error.message}
        />
      )}

      {/* Estado: lista */}
      {!isLoading && !error && (
        <ResourcesTable rows={data} />
      )}
    </div>
  );
}

function ResourcesTable({
  rows
}: {
  rows: Array<{
    id: string;
    title: string;
    category: string;
    visibility: string;
    createdAt: string;
  }>;
}) {
  const isEmpty = rows.length === 0;

  return (
    <TableWrapper>
      <THead>
        <TR>
          <TH>Título</TH>
          <TH>Categoría</TH>
          <TH>Visibilidad</TH>
          <TH>Creado</TH>
        </TR>
      </THead>

      <TBody>
        {isEmpty ? (
          <TR>
            <TD
              className="py-10 text-center text-[var(--text-secondary)]"
              colSpan={4}
            >
              Aún no has creado nada.
              <br />
              Usa el botón Crear recurso desde el dashboard para empezar.
            </TD>
          </TR>
        ) : (
          rows.map((row) => (
            <TR key={row.id}>
              <TD className="font-medium">{row.title}</TD>
              <TD className="capitalize">{row.category}</TD>
              <TD className="capitalize text-[var(--text-secondary)]">
                {row.visibility === "team" ? "Equipo" : "Privado"}
              </TD>
              <TD className="text-[var(--text-secondary)] text-xs">
                {formatDate(row.createdAt)}
              </TD>
            </TR>
          ))
        )}
      </TBody>
    </TableWrapper>
  );
}

function formatDate(iso: string) {
  const d = new Date(iso);
  // dd/mm/yyyy hh:mm
  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = d.getFullYear();
  const hours = String(d.getHours()).padStart(2, "0");
  const mins = String(d.getMinutes()).padStart(2, "0");
  return `${day}/${month}/${year} ${hours}:${mins}`;
}
