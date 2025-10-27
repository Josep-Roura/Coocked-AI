// Registro en memoria de adherencia
// Cada entrada representa si el usuario siguió o no el plan recomendado ese día

export type AdherenceLog = {
  id: string;
  resourceId: string; // plan post-entreno al que hace referencia
  taken: boolean; // true = lo tomó, false = lo saltó
  createdAt: string; // ISO
};

// base en memoria
const ADHERENCE_DB: AdherenceLog[] = [];

// pequeña latencia simulada
function delay(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

// añadir log
export async function logAdherenceAPI(input: {
  resourceId: string;
  taken: boolean;
}): Promise<AdherenceLog> {
  await delay(300);

  const newLog: AdherenceLog = {
    id: crypto.randomUUID(),
    resourceId: input.resourceId,
    taken: input.taken,
    createdAt: new Date().toISOString()
  };

  ADHERENCE_DB.unshift(newLog);
  return newLog;
}

// obtener los logs recientes
export async function getAdherenceStatsLast7DaysAPI(): Promise<{
  total: number;
  takenCount: number;
  percent: number;
}> {
  await delay(300);

  const now = Date.now();
  const sevenDaysAgo = now - 7 * 24 * 60 * 60 * 1000;

  const recent = ADHERENCE_DB.filter((log) => {
    return new Date(log.createdAt).getTime() >= sevenDaysAgo;
  });

  const total = recent.length;
  const takenCount = recent.filter((l) => l.taken).length;
  const percent =
    total === 0 ? 0 : Math.round((takenCount / total) * 100);

  return {
    total,
    takenCount,
    percent
  };
}
