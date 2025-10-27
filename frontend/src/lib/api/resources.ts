export type CreateResourceInput = {
  title: string;
  description: string;
  category: string;
  visibility: string;
  // añadimos opcionalmente un bloque "plan" si queremos pasar los datos crudos del entreno
  planData?: {
    workoutType: string;
    durationMin: number;
    goal: string;
    weightKg: number;
    dietPrefs: string;
    notes: string;
  };
};

export type CreatedResource = {
  id: string;
  title: string; // ej. "Recuperación muscular alta en proteína"
  category: string; // ej. "musculo" | "grasa" | "rendimiento"
  visibility: string; // "private" ahora mismo
  createdAt: string;

  // NUEVO: detalle de la recomendación nutricional
  meal: string; // "Batido whey + arroz jazmín + arándanos"
  proteinGr: number;
  carbsGr: number;
  fatsGr: number;
  timingNote: string; // "Tómalo en los próximos 30 min"
  rationale: string; // explicación corta
};

// BD en memoria
const RESOURCES_DB: CreatedResource[] = [
  {
    id: crypto.randomUUID(),
    title: "Recuperación muscular alta en proteína",
    category: "musculo",
    visibility: "team",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // hace 2h

    meal:
      "Batido whey + plátano + crema de arroz instantánea + arándanos.",
    proteinGr: 38,
    carbsGr: 55,
    fatsGr: 8,
    timingNote: "Idealmente en los próximos 30 minutos tras el entreno.",
    rationale:
      "Alta proteína de absorción rápida y carbohidratos de alto índice glucémico para reponer glucógeno y favorecer síntesis proteica."
  },
  {
    id: crypto.randomUUID(),
    title: "Recuperación ligera baja en carbo",
    category: "grasa",
    visibility: "private",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // hace 1 día

    meal:
      "Tortilla de claras + aguacate + espinacas salteadas.",
    proteinGr: 32,
    carbsGr: 9,
    fatsGr: 15,
    timingNote:
      "Come en la primera hora post-entreno. Mantén carbo controlado.",
    rationale:
      "Alta proteína magra para preservar masa muscular y grasas saludables para saciedad sin exceso de carbohidratos."
  }
];

// helper para latencia
function delay(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

// =========================================
// LISTAR planes creados
// =========================================
export async function listResourcesAPI(): Promise<CreatedResource[]> {
  await delay(600);
  return [...RESOURCES_DB];
}

// =========================================
// CREAR nuevo plan post-entreno
// =========================================
export async function createResourceAPI(
  data: CreateResourceInput
): Promise<CreatedResource> {
  await delay(800);

  if (data.title.toLowerCase().includes("error")) {
    throw new Error("El backend ha rechazado la creación.");
  }

  // Generamos un payload nutricional falso en base a la categoría (goal)
  const nutrientProfile = generateNutritionProfile(data);

  const newItem: CreatedResource = {
    id: crypto.randomUUID(),
    title: data.title.trim(),
    category: data.category,
    visibility: data.visibility,
    createdAt: new Date().toISOString(),

    meal: nutrientProfile.meal,
    proteinGr: nutrientProfile.proteinGr,
    carbsGr: nutrientProfile.carbsGr,
    fatsGr: nutrientProfile.fatsGr,
    timingNote: nutrientProfile.timingNote,
    rationale: nutrientProfile.rationale
  };

  RESOURCES_DB.unshift(newItem);

  return newItem;
}

// =========================================
// GET detalle por id
// =========================================
export async function getResourceByIdAPI(
  id: string
): Promise<CreatedResource | null> {
  await delay(400);
  const found = RESOURCES_DB.find((r) => r.id === id);
  return found ? { ...found } : null;
}

// -----------------------------------------
// Función auxiliar: simular nutrición IA
// -----------------------------------------
function generateNutritionProfile(data: CreateResourceInput) {
  // lógica simple basada en el objetivo
  if (data.category === "musculo") {
    return {
      meal:
        "Batido whey con agua + crema de arroz instantánea + arándanos + pizca de sal marina.",
      proteinGr: 40,
      carbsGr: 60,
      fatsGr: 6,
      timingNote: "Tómalo en los próximos 30 minutos post-entreno.",
      rationale:
        "Proteína rápida + carbo de rápida absorción = máxima síntesis proteica y recarga de glucógeno."
    };
  }

  if (data.category === "grasa") {
    return {
      meal:
        "Tortilla de claras con espinacas y aguacate, rociada con limón.",
      proteinGr: 32,
      carbsGr: 10,
      fatsGr: 18,
      timingNote:
        "Come en la primera hora para controlar hambre sin disparar insulina.",
      rationale:
        "Alta proteína magra para preservar músculo, grasas saludables para saciedad, carbo moderado para favorecer déficit."
    };
  }

  // rendimiento / recuperación
  return {
    meal:
      "Yogur griego 0% + miel + copos de avena + frutos rojos + plátano.",
    proteinGr: 28,
    carbsGr: 65,
    fatsGr: 8,
    timingNote:
      "Ingéstalo en los primeros 20-40 minutos para recargar glucógeno.",
    rationale:
      "Carbohidratos rápidos + proteína intermedia mejoran recuperación del sistema nervioso y reservas energéticas."
  };
}
