// Este archivo simula un backend temporalmente.
// Más adelante esto se sustituye por fetch() real al backend.

export type CreateResourceInput = {
  title: string;
  description: string;
  category: string;
  visibility: string;
};

export type CreatedResource = {
  id: string;
  title: string;
  category: string;
  visibility: string;
  createdAt: string;
};

// "BD" en memoria (se reinicia al recargar el browser en dev)
let RESOURCES_DB: CreatedResource[] = [
  {
    id: crypto.randomUUID(),
    title: "Informe IA semanal",
    category: "analisis",
    visibility: "team",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString() // hace 2h
  },
  {
    id: crypto.randomUUID(),
    title: "Checklist de despliegue",
    category: "documentacion",
    visibility: "private",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString() // hace 1 día
  }
];

// Utilidad para esperar (simula red)
function delay(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

// =========================================
// LISTAR recursos
// =========================================
export async function listResourcesAPI(): Promise<CreatedResource[]> {
  // Simulamos latencia
  await delay(600);

  // Simulamos error aleatorio minúsculo si quieres testear (puedes comentar esto)
  // if (Math.random() < 0.05) {
  //   throw new Error("No se han podido cargar los recursos.");
  // }

  // devolvemos copia
  return [...RESOURCES_DB];
}

// =========================================
// CREAR recurso
// =========================================
export async function createResourceAPI(
  data: CreateResourceInput
): Promise<CreatedResource> {
  await delay(800);

  // Simulamos un error servidor si el título contiene "error"
  if (data.title.toLowerCase().includes("error")) {
    throw new Error("El backend ha rechazado la creación.");
  }

  const newItem: CreatedResource = {
    id: crypto.randomUUID(),
    title: data.title.trim(),
    category: data.category,
    visibility: data.visibility,
    createdAt: new Date().toISOString()
  };

  // Persistimos en la "BD" en memoria
  RESOURCES_DB.unshift(newItem);

  return newItem;
}
