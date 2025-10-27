"use client";

import { useResourceByIdQuery } from "@/lib/api/useResourceByIdQuery";
import { useParams, useRouter } from "next/navigation";
import { Loader } from "@/components/feedback/Loader";
import { Alert } from "@/components/feedback/Alert";
import { Button } from "@/components/ui/button";

export default function ResourceDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();

  const { data, isLoading, error } = useResourceByIdQuery(params?.id);

  if (isLoading) {
    return (
      <div className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
        <Loader />
        <span>Cargando plan...</span>
      </div>
    );
  }

  if (error) {
    return (
      <Alert
        variant="error"
        title="No se ha podido cargar el plan"
        description={error.message}
      />
    );
  }

  if (!data) {
    return (
      <div className="space-y-4">
        <Alert
          variant="error"
          title="Plan no encontrado"
          description="Este plan no existe o ya no está disponible."
        />
        <Button onClick={() => router.push("/app/resources")}>
          Volver al historial
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-xl">
      <header className="space-y-2">
        <Button
          variant="ghost"
          size="sm"
          className="px-0 text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
          onClick={() => router.push("/app/resources")}
        >
          ← Volver
        </Button>

        <h1 className="text-xl font-semibold leading-tight text-[var(--text-primary)]">
          {data.title}
        </h1>
        <p className="text-[var(--text-secondary)] text-sm leading-relaxed capitalize">
          Objetivo: {data.category}
        </p>
        <p className="text-[var(--text-secondary)] text-xs">
          {formatDate(data.createdAt)}
        </p>
      </header>

      <section className="space-y-4">
        <div>
          <h2 className="text-sm font-semibold text-[var(--text-primary)]">
            Qué comer ahora
          </h2>
          <p className="text-[var(--text-primary)] leading-relaxed">
            {data.meal}
          </p>
          <p className="text-[var(--text-secondary)] text-xs leading-relaxed mt-1">
            {data.timingNote}
          </p>
        </div>

        <div>
          <h2 className="text-sm font-semibold text-[var(--text-primary)]">
            Macros estimadas
          </h2>
          <ul className="text-sm text-[var(--text-primary)] leading-relaxed mt-2 space-y-1">
            <li>Proteína: {data.proteinGr} g</li>
            <li>Carbohidratos: {data.carbsGr} g</li>
            <li>Grasas: {data.fatsGr} g</li>
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-semibold text-[var(--text-primary)]">
            Por qué esto
          </h2>
          <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
            {data.rationale}
          </p>
        </div>
      </section>
    </div>
  );
}

function formatDate(iso: string) {
  const d = new Date(iso);
  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = d.getFullYear();
  const hours = String(d.getHours()).padStart(2, "0");
  const mins = String(d.getMinutes()).padStart(2, "0");
  return `${day}/${month}/${year} ${hours}:${mins}`;
}
