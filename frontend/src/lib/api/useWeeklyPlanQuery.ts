"use client";

import { useEffect, useState } from "react";
import { WeeklyWorkout } from "@/lib/types/training";

type WeeklyPlanResponse = {
  ok: boolean;
  week: WeeklyWorkout[];
};

export function useWeeklyPlanQuery() {
  const [data, setData] = useState<WeeklyWorkout[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | undefined>(undefined);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        setLoading(true);
        const res = await fetch("/api/week");
        if (!res.ok) {
          throw new Error("Error cargando semana");
        }
        const json = (await res.json()) as WeeklyPlanResponse;
        if (!cancelled) {
          setData(json.week || []);
          setError(undefined);
        }
      } catch (err) {
        if (!cancelled) {
          setError("No se pudo cargar el plan semanal");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  return { data, loading, error };
}
