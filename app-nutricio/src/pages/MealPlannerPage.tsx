/**
 * Página para sugerir comidas rápidas post-entreno usando IA.
 */
import { useState } from "react";
import { getQuickMealSuggestions } from "../services/ai";

export function MealPlannerPage() {
  const [form, setForm] = useState({
    workoutType: "HIIT",
    intensity: "alta",
    weightKg: 72,
    dietaryPrefs: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<Awaited<ReturnType<typeof getQuickMealSuggestions>>>([]);

  function handleChange(event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = event.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "weightKg" ? Number(value) : value,
    }));
  }

  async function handleGenerate() {
    setIsLoading(true);
    const data = await getQuickMealSuggestions(form);
    setResults(data);
    setIsLoading(false);
  }

  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold text-foreground">Meal planner post-entreno</h1>
        <p className="text-sm text-muted-foreground">
          Indica tu sesión y obtén ideas de comidas rápidas para tu recuperación inmediata.
        </p>
      </header>

      <div className="rounded-2xl border border-border bg-card p-6 shadow-lg space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="text-sm font-medium text-foreground" htmlFor="workoutType">
              Tipo de entreno
            </label>
            <input
              id="workoutType"
              name="workoutType"
              value={form.workoutType}
              onChange={handleChange}
              className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground" htmlFor="intensity">
              Intensidad
            </label>
            <select
              id="intensity"
              name="intensity"
              value={form.intensity}
              onChange={handleChange}
              className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"
            >
              <option value="baja">Baja</option>
              <option value="media">Media</option>
              <option value="alta">Alta</option>
            </select>
          </div>
          <div>
            <label className="text-sm font-medium text-foreground" htmlFor="weightKg">
              Peso (kg)
            </label>
            <input
              id="weightKg"
              name="weightKg"
              type="number"
              value={form.weightKg}
              min={40}
              max={150}
              onChange={handleChange}
              className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground" htmlFor="dietaryPrefs">
              Preferencias dietéticas
            </label>
            <input
              id="dietaryPrefs"
              name="dietaryPrefs"
              value={form.dietaryPrefs}
              onChange={handleChange}
              placeholder="sin lactosa, vegano..."
              className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"
            />
          </div>
        </div>
        <button
          type="button"
          onClick={handleGenerate}
          className="w-full rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-white transition hover:scale-[1.02]"
        >
          {isLoading ? "Generando…" : "Generar con IA"}
        </button>
      </div>

      <section className="grid gap-4 sm:grid-cols-2">
        {results.map((item) => (
          <article key={item.title} className="rounded-2xl border border-border bg-card p-4 shadow">
            <h3 className="text-base font-semibold text-foreground">{item.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{item.description}</p>
            <div className="mt-3 flex gap-3 text-xs text-muted-foreground">
              <span>Proteína: {item.protein_g} g</span>
              <span>Carbohidratos: {item.carbs_g} g</span>
              <span>Energía: {item.kcal} kcal</span>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
