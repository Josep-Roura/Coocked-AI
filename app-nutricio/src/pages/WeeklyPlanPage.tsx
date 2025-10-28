/**
 * Página que lista los entrenamientos semanales guardados en Supabase.
 */
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { useAuthStore } from "../store/authStore";
import { WeeklyWorkoutForm } from "../components/WeeklyWorkoutForm";

type WeeklyWorkout = {
  id: string;
  day_index: number;
  start_time: string;
  end_time: string;
  session_type: string;
  intensity: string | null;
  nutrition_json: {
    pre: { items: string[]; notes: string };
    intra: { items: string[]; notes: string };
    post: { items: string[]; notes: string };
  };
};

const DAY_LABELS = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];

export function WeeklyPlanPage() {
  const { user } = useAuthStore();
  const [workouts, setWorkouts] = useState<WeeklyWorkout[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function fetchWeeklyWorkouts() {
    if (!user) return;
    setIsLoading(true);
    setError(null);

    const { data, error: fetchError } = await supabase
      .from("weekly_workouts")
      .select("id, day_index, start_time, end_time, session_type, intensity, nutrition_json")
      .eq("user_id", user.id)
      .order("day_index", { ascending: true });

    if (fetchError) {
      setError(fetchError.message);
      setIsLoading(false);
      return;
    }

    setWorkouts(data ?? []);
    setIsLoading(false);
  }

  useEffect(() => {
    fetchWeeklyWorkouts();
  }, [user]);

  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold text-foreground">Plan semanal</h1>
        <p className="text-sm text-muted-foreground">
          Introduce tus entrenos y deja que la IA te recuerde cómo comer antes, durante y después de cada sesión.
        </p>
      </header>

      <WeeklyWorkoutForm onSaved={fetchWeeklyWorkouts} />

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Sesiones guardadas</h2>
        {isLoading ? <p className="text-sm text-muted-foreground">Cargando…</p> : null}
        {error ? <p className="text-sm text-destructive">{error}</p> : null}
        {!isLoading && workouts.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border p-6 text-sm text-muted-foreground">
            Aún no has guardado entrenamientos. Añade uno con el formulario superior.
          </div>
        ) : null}
        <div className="grid gap-4">
          {workouts.map((workout) => (
            <article
              key={workout.id}
              className="rounded-2xl border border-border bg-card p-4 shadow-md"
            >
              <header className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <h3 className="text-base font-semibold text-foreground">
                    {DAY_LABELS[workout.day_index]} · {workout.session_type}
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    {workout.start_time} - {workout.end_time} · Intensidad {workout.intensity ?? "no especificada"}
                  </p>
                </div>
              </header>
              <div className="mt-3 grid gap-3 md:grid-cols-3">
                <NutritionBadge title="Pre" plan={workout.nutrition_json.pre} />
                <NutritionBadge title="Intra" plan={workout.nutrition_json.intra} />
                <NutritionBadge title="Post" plan={workout.nutrition_json.post} />
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

function NutritionBadge({
  title,
  plan,
}: {
  title: string;
  plan: { items: string[]; notes: string };
}) {
  return (
    <div className="rounded-xl border border-border bg-background p-3">
      <div className="text-xs font-semibold uppercase tracking-wide text-primary">{title}</div>
      <ul className="mt-2 list-disc space-y-1 pl-4 text-xs text-foreground">
        {plan.items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <p className="mt-1 text-[11px] text-muted-foreground">{plan.notes}</p>
    </div>
  );
}
