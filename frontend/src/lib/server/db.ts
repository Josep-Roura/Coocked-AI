// Esta "DB" vive en memoria del proceso Node.
// En producción real, esto sería Prisma/Postgres, etc.

export type StoredPlan = {
  id: string;
  title: string;
  category: string;
  description: string;
  createdAt: string;
};

export type AdherenceEntry = {
  planId: string;
  taken: boolean; // true = tomado, false = saltado
  timestamp: string;
};

export type WeekWorkout = {
  id: string;
  day: number; // 0 = Lunes ... 6 = Domingo
  start: string;
  end: string;
  type: string;
  intensity?: "baja" | "media" | "alta";
  nutrition: Array<{
    label: string;
    advice: string;
  }>;
};

// simulamos tablas
const plans: StoredPlan[] = [];
const adherenceLog: AdherenceEntry[] = [];

// este mockWeek lo usaremos para GET /api/week (igual que el dashboard)
let mockWeek: WeekWorkout[] = [
  {
    id: "w1",
    day: 0,
    start: "07:30",
    end: "08:30",
    type: "Fuerza tren superior",
    intensity: "alta",
    nutrition: [
      {
        label: "Pre-entreno (30 min antes)",
        advice:
          "20g whey aislado + 30g crema de arroz. Energía rápida y AA para evitar catabolismo."
      },
      {
        label: "Post-entreno inmediato",
        advice:
          "Batido 40g proteína + carbo rápido (fruta + arroz) en los próximos 30 minutos."
      }
    ]
  },
  {
    id: "w2",
    day: 2,
    start: "19:00",
    end: "19:45",
    type: "Rodaje Z2",
    intensity: "media",
    nutrition: [
      {
        label: "Pre-entreno",
        advice:
          "Plátano + 10g crema cacahuete. Evita grasa pesada justo antes."
      },
      {
        label: "Post-entreno",
        advice:
          "Arroz + pollo. Carbo complejo + proteína magra, baja en grasa."
      },
      {
        label: "Recuperación tarde",
        advice:
          "Antes de dormir: caseína 25g para soporte muscular nocturno."
      }
    ]
  },
  {
    id: "w3",
    day: 4,
    start: "18:30",
    end: "19:30",
    type: "HIIT piernas",
    intensity: "alta",
    nutrition: [
      {
        label: "Pre-entreno",
        advice:
          "Pan blanco + miel + electrolitos. Evita fibra para no molestar el estómago."
      },
      {
        label: "Post-entreno",
        advice:
          "Whey + bebida isotónica. Luego cena alta en carbo + sodio."
      }
    ]
  }
];

// helpers CRUD simulados
export const db = {
  // guardar plan nuevo
  createPlan(input: {
    title: string;
    category: string;
    description: string;
  }): StoredPlan {
    const plan: StoredPlan = {
      id: `plan_${Date.now()}`,
      title: input.title,
      category: input.category,
      description: input.description,
      createdAt: new Date().toISOString()
    };
    plans.unshift(plan); // lo metemos al principio
    return plan;
  },

  listPlans(): StoredPlan[] {
    return plans;
  },

  logAdherence(input: { planId: string; taken: boolean }): AdherenceEntry {
    const entry: AdherenceEntry = {
      planId: input.planId,
      taken: input.taken,
      timestamp: new Date().toISOString()
    };
    adherenceLog.push(entry);
    return entry;
  },

  getAdherenceSummaryLast7Days() {
    // Para demo: contamos últimos 7 registros
    const now = Date.now();
    const last7 = adherenceLog.filter((item) => {
      const t = new Date(item.timestamp).getTime();
      const diffMs = now - t;
      const diffDays = diffMs / (1000 * 60 * 60 * 24);
      return diffDays <= 7;
    });

    const total = last7.length;
    const takenCount = last7.filter((e) => e.taken).length;
    const percent = total === 0 ? 0 : Math.round((takenCount / total) * 100);

    return {
      total,
      takenCount,
      percent
    };
  },

  getWeek(): WeekWorkout[] {
    return mockWeek;
  },

  // para el futuro cuando venga TrainingPeaks:
  // podríamos reemplazar mockWeek aquí.
  setWeek(newWeek: WeekWorkout[]) {
    mockWeek = newWeek;
  }
};
