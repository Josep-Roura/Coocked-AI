/**
 * Dashboard principal: muestra resumen del último entreno, nutrición inmediata y accesos rápidos.
 */
import { useEffect, useState } from "react";
import { useAuthStore } from "../store/authStore";
import { getImmediatePostWorkoutNutrition } from "../services/ai";

const MOCK_LAST_WORKOUT = {
  workoutType: "Fuerza tren inferior",
  durationMin: 75,
  intensity: "alta",
  weightKg: 78,
};

export function DashboardPage() {
  const { profile } = useAuthStore();
  const [summary, setSummary] = useState<
    | {
        protein_g: number;
        carbs_g: number;
        fluids_ml: number;
        rationale: string;
      }
    | null
  >(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function loadNutrition() {
      setIsLoading(true);
      const data = await getImmediatePostWorkoutNutrition({
        ...MOCK_LAST_WORKOUT,
        weightKg: profile?.weight_kg ?? MOCK_LAST_WORKOUT.weightKg,
      });
      setSummary(data);
      setIsLoading(false);
    }

    loadNutrition();
  }, [profile]);

  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold text-foreground">Hola, {profile?.name ?? "atleta"}</h1>
        <p className="text-sm text-muted-foreground">
          Este es tu panel diario. Revisa qué comer justo después de tu sesión y mantén tu adherencia.
        </p>
      </header>

      <section className="rounded-2xl border border-border bg-card p-6 shadow-lg">
        <h2 className="text-lg font-semibold text-foreground">Nutrición inmediata post-entreno</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Basado en tu última sesión de {MOCK_LAST_WORKOUT.workoutType.toLowerCase()} ({MOCK_LAST_WORKOUT.durationMin} min, intensidad
          {" "}
          {MOCK_LAST_WORKOUT.intensity}).
        </p>
        {isLoading ? (
          <p className="mt-4 text-sm text-muted-foreground">Calculando recomendaciones…</p>
        ) : summary ? (
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            <NutritionMetric label="Proteína" value={`${summary.protein_g} g`} />
            <NutritionMetric label="Carbohidratos" value={`${summary.carbs_g} g`} />
            <NutritionMetric label="Hidratación" value={`${summary.fluids_ml} ml`} />
          </div>
        ) : (
          <p className="mt-4 text-sm text-destructive">No se pudo generar la recomendación.</p>
        )}
        {summary ? (
          <p className="mt-4 text-xs text-muted-foreground">{summary.rationale}</p>
        ) : null}
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <QuickLink title="Plan semanal" description="Introduce tus sesiones y planifica la nutrición alrededor" href="/weekly-plan" />
        <QuickLink title="Meal planner" description="Genera ideas rápidas post-entreno" href="/meal-planner" />
        <QuickLink title="Historial" description="Consulta planes anteriores y tu adherencia" href="/history" />
      </section>
    </div>
  );
}

function NutritionMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-border bg-background p-4">
      <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{label}</div>
      <div className="mt-2 text-2xl font-semibold text-foreground">{value}</div>
    </div>
  );
}

function QuickLink({ title, description, href }: { title: string; description: string; href: string }) {
  return (
    <a
      href={href}
      className="rounded-2xl border border-border bg-card p-4 shadow hover:scale-[1.01]"
      aria-label={title}
    >
      <div className="text-base font-semibold text-foreground">{title}</div>
      <p className="mt-2 text-sm text-muted-foreground">{description}</p>
    </a>
  );
}
