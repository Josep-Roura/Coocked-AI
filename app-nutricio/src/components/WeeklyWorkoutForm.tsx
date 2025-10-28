/**
 * Formulario para registrar entrenamientos semanales en Supabase.
 * Integra hook de IA para generar nutrición recomendada pre/intra/post.
 */
import { useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { useAuthStore } from "../store/authStore";
import { getSessionNutritionPlan } from "../services/ai";

type NutritionPlan = Awaited<ReturnType<typeof getSessionNutritionPlan>>;

const DAYS = [
  { label: "Lunes", value: 0 },
  { label: "Martes", value: 1 },
  { label: "Miércoles", value: 2 },
  { label: "Jueves", value: 3 },
  { label: "Viernes", value: 4 },
  { label: "Sábado", value: 5 },
  { label: "Domingo", value: 6 },
];

const INTENSITIES = ["baja", "media", "alta"];

export function WeeklyWorkoutForm({ onSaved }: { onSaved?: () => void }) {
  const { user, profile } = useAuthStore();
  const [form, setForm] = useState({
    day_index: 0,
    start_time: "18:00",
    end_time: "19:00",
    session_type: "Entrenamiento de fuerza",
    intensity: "media",
    durationMin: 60,
  });
  const [nutrition, setNutrition] = useState<NutritionPlan | null>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "saving" | "error" | "success">("idle");
  const [message, setMessage] = useState<string | null>(null);

  function handleChange(event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = event.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "day_index" || name === "durationMin" ? Number(value) : value,
    }));
  }

  async function handleGenerateNutrition() {
    if (!profile) {
      setMessage("Necesitas un perfil cargado para generar nutrición.");
      setStatus("error");
      return;
    }

    setStatus("loading");
    setMessage(null);
    try {
      const plan = await getSessionNutritionPlan({
        session_type: form.session_type,
        intensity: form.intensity,
        durationMin: form.durationMin,
        userWeightKg: Number(profile?.weight_kg ?? 70),
      });
      setNutrition(plan);
      setStatus("idle");
    } catch (error) {
      console.error(error);
      setStatus("error");
      setMessage("No se pudo generar la nutrición. Intenta de nuevo.");
    }
  }

  async function handleSave() {
    if (!user) {
      setStatus("error");
      setMessage("Inicia sesión para guardar entrenos.");
      return;
    }

    if (!nutrition) {
      setStatus("error");
      setMessage("Genera la nutrición recomendada antes de guardar.");
      return;
    }

    setStatus("saving");
    setMessage(null);

    const { error } = await supabase.from("weekly_workouts").insert({
      user_id: user.id,
      day_index: form.day_index,
      start_time: form.start_time,
      end_time: form.end_time,
      session_type: form.session_type,
      intensity: form.intensity,
      nutrition_json: nutrition,
    });

    if (error) {
      console.error(error);
      setStatus("error");
      setMessage(error.message);
      return;
    }

    setStatus("success");
    setMessage("Sesión guardada correctamente.");
    setNutrition(null);
    onSaved?.();
  }

  return (
    <div className="rounded-2xl border border-border bg-card p-4 shadow-lg space-y-4">
      <h2 className="text-lg font-semibold text-foreground">Añadir entreno semanal</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1">
          <label htmlFor="day_index" className="text-sm font-medium text-foreground">
            Día de la semana
          </label>
          <select
            id="day_index"
            name="day_index"
            value={form.day_index}
            onChange={handleChange}
            className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"
          >
            {DAYS.map((day) => (
              <option key={day.value} value={day.value}>
                {day.label}
              </option>
            ))}
          </select>
        </div>
        <div className="space-y-1">
          <label htmlFor="session_type" className="text-sm font-medium text-foreground">
            Tipo de sesión
          </label>
          <input
            id="session_type"
            name="session_type"
            value={form.session_type}
            onChange={handleChange}
            className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"
          />
        </div>
        <div className="space-y-1">
          <label htmlFor="start_time" className="text-sm font-medium text-foreground">
            Hora inicio
          </label>
          <input
            id="start_time"
            name="start_time"
            type="time"
            value={form.start_time}
            onChange={handleChange}
            className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"
          />
        </div>
        <div className="space-y-1">
          <label htmlFor="end_time" className="text-sm font-medium text-foreground">
            Hora fin
          </label>
          <input
            id="end_time"
            name="end_time"
            type="time"
            value={form.end_time}
            onChange={handleChange}
            className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"
          />
        </div>
        <div className="space-y-1">
          <label htmlFor="intensity" className="text-sm font-medium text-foreground">
            Intensidad
          </label>
          <select
            id="intensity"
            name="intensity"
            value={form.intensity}
            onChange={handleChange}
            className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"
          >
            {INTENSITIES.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
        <div className="space-y-1">
          <label htmlFor="durationMin" className="text-sm font-medium text-foreground">
            Duración (minutos)
          </label>
          <input
            id="durationMin"
            name="durationMin"
            type="number"
            min={10}
            step={5}
            value={form.durationMin}
            onChange={handleChange}
            className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"
          />
        </div>
      </div>

      <div className="flex gap-3">
        <button
          type="button"
          onClick={handleGenerateNutrition}
          className="flex-1 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-white transition hover:scale-[1.02]"
        >
          {status === "loading" ? "Generando…" : "Generar nutrición recomendada"}
        </button>
        <button
          type="button"
          onClick={handleSave}
          disabled={status === "saving"}
          className="flex-1 rounded-xl border border-primary px-4 py-2 text-sm font-semibold text-primary transition hover:scale-[1.02] disabled:opacity-60"
        >
          {status === "saving" ? "Guardando…" : "Guardar sesión semanal"}
        </button>
      </div>

      {nutrition ? (
        <div className="rounded-xl border border-border bg-background p-4 text-sm text-foreground">
          <h3 className="text-sm font-semibold">Nutrición sugerida</h3>
          <div className="mt-2 space-y-3">
            <NutritionBlock title="Pre" data={nutrition.pre} />
            <NutritionBlock title="Intra" data={nutrition.intra} />
            <NutritionBlock title="Post" data={nutrition.post} />
          </div>
        </div>
      ) : null}

      {message ? (
        <p className={`text-sm ${status === "error" ? "text-destructive" : "text-green-500"}`}>{message}</p>
      ) : null}
    </div>
  );
}

function NutritionBlock({ title, data }: { title: string; data: NutritionPlan[keyof NutritionPlan] }) {
  return (
    <div>
      <div className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{title}</div>
      <ul className="mt-1 list-disc space-y-1 pl-4 text-xs text-foreground">
        {data.items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <p className="mt-1 text-[11px] text-muted-foreground">{data.notes}</p>
    </div>
  );
}
