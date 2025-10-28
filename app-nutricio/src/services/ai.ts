/**
 * Stubs para integrar futuros modelos de IA encargados de generar nutrición personalizada.
 * Todas las funciones devuelven datos deterministas hasta que se conecte el LLM real.
 */
export async function getImmediatePostWorkoutNutrition(input: {
  workoutType: string;
  durationMin: number;
  intensity: string;
  weightKg: number;
}): Promise<{ protein_g: number; carbs_g: number; fluids_ml: number; rationale: string }> {
  // IA: llamar a modelo con prompt especializado para post-entreno inmediato.
  // TODO: implementar llamada real al LLM.
  const baseProtein = input.intensity === "alta" ? 35 : 25;
  const baseCarbs = Math.round(input.durationMin * 1.2);
  const fluids = input.intensity === "alta" ? 750 : 500;
  return {
    protein_g: baseProtein,
    carbs_g: baseCarbs,
    fluids_ml: fluids,
    rationale:
      "Recomendación placeholder calculada localmente. Sustituir por respuesta del modelo cuando esté disponible.",
  };
}

export async function getSessionNutritionPlan(input: {
  session_type: string;
  intensity: string;
  durationMin: number;
  userWeightKg: number;
}): Promise<{
  pre: { items: string[]; notes: string };
  intra: { items: string[]; notes: string };
  post: { items: string[]; notes: string };
}> {
  // IA: prompt para generar nutrición pre, intra y post sesión semanal.
  // TODO: implementar llamada real al LLM.
  return {
    pre: {
      items: ["1 plátano", "agua con electrolitos"],
      notes: "Toma carbo fácil y sodio ligero antes de la sesión.",
    },
    intra: {
      items: ["Bebida isotónica 30g CH/h"],
      notes: "Mantén energía constante según tu intensidad.",
    },
    post: {
      items: ["Batido proteína 30g", "500ml agua fría"],
      notes: "Reponer proteína y fluidos inmediatamente tras acabar.",
    },
  };
}

export async function getQuickMealSuggestions(input: {
  workoutType: string;
  intensity: string;
  weightKg: number;
  dietaryPrefs?: string;
}): Promise<
  Array<{ title: string; protein_g: number; carbs_g: number; kcal: number; description: string }>
> {
  // IA: prompt para comidas rápidas post-entreno.
  // TODO: implementar llamada real al LLM.
  const suggestions = [
    {
      title: "Tortilla de claras + hummus + pan pita",
      protein_g: 28,
      carbs_g: 45,
      kcal: 430,
      description: "Listo en 7 minutos. Proteína rápida y carbo complejo para reponer glucógeno.",
    },
    {
      title: "Yogur griego + granola + frutos rojos",
      protein_g: 25,
      carbs_g: 55,
      kcal: 410,
      description: "Alta densidad nutricional y antioxidantes para mejorar la recuperación.",
    },
    {
      title: "Wrap integral de pavo y aguacate",
      protein_g: 32,
      carbs_g: 38,
      kcal: 480,
      description: "Proteína magra con grasas saludables para saciedad prolongada.",
    },
  ];

  if (input.dietaryPrefs?.includes("veg")) {
    suggestions.push({
      title: "Tofu marinado con arroz jazmín",
      protein_g: 27,
      carbs_g: 60,
      kcal: 520,
      description: "Opción vegana rica en proteínas completas gracias a la combinación tofu + arroz.",
    });
  }

  return suggestions;
}
