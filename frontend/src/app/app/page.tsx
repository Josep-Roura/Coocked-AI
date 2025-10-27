"use client";

import { useState } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { Alert } from "@/components/feedback/Alert";
import { useCreateResourceMutation } from "@/lib/api/useCreateResourceMutation";
import { CreatePostWorkoutPlanForm } from "@/components/forms/CreatePostWorkoutPlanForm";
import { useAdherenceStatsQuery } from "@/lib/api/useAdherenceStatsQuery";
import { useAdherenceMutation } from "@/lib/api/useAdherenceMutation";
import { MotionWrapper } from "@/components/motion-wrapper";
import { track } from "@/lib/analytics/track";
import { WeeklyCalendar } from "@/components/calendar/WeeklyCalendar";
import { WeeklyWorkout } from "@/lib/types/training";
import { useTrainingPeaksConnection } from "@/lib/api/useTrainingPeaksConnection";

export default function DashboardPage() {
  const [openPlanModal, setOpenPlanModal] = useState(false);
  const [openTpModal, setOpenTpModal] = useState(false);

  const [lastCreated, setLastCreated] = useState<
    | {
        id: string;
        title: string;
        category: string;
      }
    | undefined
  >(undefined);

  const { createResource, isLoading, error } = useCreateResourceMutation({
    onSuccess: (res) => {
      setLastCreated({
        id: res.id,
        title: res.title,
        category: res.category
      });

      // track conversión "plan creado"
      track("plan_created", {
        category: res.category
      });

      setOpenPlanModal(false);
    }
  });

  const { data: adherenceStats } = useAdherenceStatsQuery();

  const { markAdherence, isSaving: isSavingAdherence } =
    useAdherenceMutation();

  function handleGeneratePlan(data: {
    workoutType: string;
    durationMin: number;
    goal: string;
    weightKg: number;
    dietPrefs: string;
    notes: string;
  }) {
    const generatedTitle = buildPlanTitle(data);
    const category = data.goal;

    createResource({
      title: generatedTitle,
      description: data.notes || "",
      category,
      visibility: "private",
      planData: {
        workoutType: data.workoutType,
        durationMin: data.durationMin,
        goal: data.goal,
        weightKg: data.weightKg,
        dietPrefs: data.dietPrefs,
        notes: data.notes
      }
    });
  }

  function handleMark(taken: boolean) {
    if (!lastCreated) return;
    markAdherence({
      resourceId: lastCreated.id,
      taken
    });
  }

  function handleOpenPlanModal() {
    setOpenPlanModal(true);
    track("open_generate_plan_modal");
  }

  // -------- TrainingPeaks connection mock --------
  const { connected, isConnecting, connect } =
    useTrainingPeaksConnection();

  function handleConnectTp() {
    connect();
    // disparo track de intención de integrar TrainingPeaks
    track("tp_connect_clicked");
  }
  // -----------------------------------------------

  // MOCK de semana (esto luego vendrá de TrainingPeaks + IA)
  const mockWeek: WeeklyWorkout[] = [
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
            "20g whey aislado + 30g crema de arroz. Objetivo: energía rápida y aminoácidos para evitar catabolismo."
        },
        {
          label: "Post-entreno inmediato",
          advice:
            "Batido 40g proteína + carbo rápido (fruta + arroz). Tómatelo en los próximos 30 minutos."
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
            "Snack ligero: plátano + 10g crema cacahuete. Evita grasa pesada justo antes para no molestar el estómago."
        },
        {
          label: "Post-entreno",
          advice:
            "Carbo complejo + proteína magra (arroz + pollo). Mantén grasas bajas para acelerar recarga de glucógeno."
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
            "Carbo rápido (pan blanco + miel) + electrolitos. Evita fibra para no sobrecargar el estómago."
        },
        {
          label: "Post-entreno",
          advice:
            "Batido whey + bebida isotónica. En 60 min, cena con carbo alto + sodio para favorecer la recarga."
        }
      ]
    }
  ];

  return (
    <>
      {/* === BLOQUE SUPERIOR: Acción rápida / Último plan / Adherencia === */}
      <MotionWrapper keyId="dashboard-main">
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {/* Acción rápida */}
          <MotionWrapper keyId="quick-action">
            <Card>
              <CardHeader
                title="Acción rápida"
                description="Genera tu comida ideal post-entreno en menos de 10s"
              />
              <CardContent>
                <Button
                  className="w-full"
                  isLoading={isLoading}
                  onClick={handleOpenPlanModal}
                >
                  Generar plan post-entreno
                </Button>
              </CardContent>
            </Card>
          </MotionWrapper>

          {/* Último plan generado */}
          <MotionWrapper keyId="last-plan">
            <Card>
              <CardHeader
                title="Último plan generado"
                description="Resumen de tu recomendación más reciente"
              />
              <CardContent className="space-y-3">
                {lastCreated ? (
                  <Alert
                    variant="success"
                    title="Plan generado correctamente"
                    description={`${lastCreated.title} (${lastCreated.category}) ya está listo.`}
                  />
                ) : (
                  <ul className="text-sm leading-relaxed text-[var(--text-secondary)] space-y-1">
                    <li>• Aún no has generado ningún plan hoy</li>
                    <li>• Pulsa “Generar plan post-entreno”</li>
                    <li>• Lo guardaremos en tu historial</li>
                  </ul>
                )}
              </CardContent>
            </Card>
          </MotionWrapper>

          {/* Adherencia semanal */}
          <MotionWrapper keyId="adherence">
            <Card className="md:col-span-2 xl:col-span-1">
              <CardHeader
                title="Tu adherencia (últimos 7 días)"
                description="¿Te estás alimentando como tu objetivo necesita?"
              />
              <CardContent className="space-y-4">
                <AdherenceStatBlock
                  percent={adherenceStats?.percent ?? 0}
                  total={adherenceStats?.total ?? 0}
                  takenCount={adherenceStats?.takenCount ?? 0}
                />

                <AdherenceActionBlock
                  disabled={!lastCreated || isSavingAdherence}
                  onTaken={() => handleMark(true)}
                  onSkipped={() => handleMark(false)}
                />
              </CardContent>
            </Card>
          </MotionWrapper>
        </div>
      </MotionWrapper>

      {/* === NUEVA SECCIÓN: SINCRONIZACIÓN TRAININGPEAKS + CALENDARIO === */}
      <MotionWrapper keyId="weekly-plan">
        <Card className="mt-8">
          <CardHeader
            title="Plan semanal"
            description={
              connected
                ? "Entrenos sincronizados y nutrición recomendada por IA."
                : "Conecta TrainingPeaks para ver tus sesiones reales y la nutrición sugerida por IA."
            }
          />
          <CardContent className="space-y-4">
            {/* Header de acciones: conectar TrainingPeaks */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="text-[var(--text-secondary)] text-xs leading-relaxed">
                {connected
                  ? "TrainingPeaks conectado ✅"
                  : "Aún no conectado"}
              </div>

              <div className="flex gap-2">
                {!connected ? (
                  <Button
                    className="min-w-[180px]"
                    isLoading={isConnecting}
                    onClick={() => {
                      handleConnectTp();
                      setOpenTpModal(true);
                    }}
                  >
                    Conectar TrainingPeaks
                  </Button>
                ) : (
                  <Button
                    className="min-w-[180px]"
                    variant="ghost"
                    onClick={() => setOpenTpModal(true)}
                  >
                    Ver detalles de sincronización
                  </Button>
                )}
              </div>
            </div>

            {/* Calendario semanal */}
            <WeeklyCalendar week={mockWeek} />

            <p className="text-[var(--text-secondary)] text-[11px] leading-relaxed">
              Muy pronto: leeremos automáticamente tus entrenos planificados
              desde TrainingPeaks y generaremos para cada uno:
              pre-entreno → post-entreno → recuperación tarde. Sin que tengas
              que pensar qué comer.
            </p>
          </CardContent>
        </Card>
      </MotionWrapper>

      {/* === BLOQUE EDUCATIVO / SIGUIENTE PASO === */}
      <MotionWrapper keyId="next-steps">
        <div className="grid gap-6 md:grid-cols-2 mt-8">
          <Card>
            <CardHeader
              title="Próximos pasos"
              description="Recomendado para mejorar resultados:"
            />
            <CardContent>
              <ol className="list-decimal pl-4 text-sm text-[var(--text-primary)] space-y-2">
                <li>
                  {connected
                    ? "Sincroniza nuevos entrenos desde TrainingPeaks cuando cambie tu plan"
                    : "Conecta tu cuenta TrainingPeaks"}
                </li>
                <li>Activa recordatorios post-entreno</li>
                <li>Revisa tu recuperación (sueño, fatiga, dolor muscular)</li>
              </ol>
            </CardContent>
          </Card>

          <Card>
            <CardHeader
              title="Siguiente entreno"
              description="Cuando acabes tu próxima sesión, vuelve aquí y marca adherencia."
            />
            <CardContent className="text-sm text-[var(--text-secondary)] leading-relaxed">
              Cuanto más constante seas registrando si cumpliste (Tomado / Me
              lo salté), más precisa será tu adherencia y mejor podremos
              ajustar tus macros para la semana.
            </CardContent>
          </Card>
        </div>
      </MotionWrapper>

      {/* === MODAL: CREAR PLAN POST-ENTRENO === */}
      <Modal
        open={openPlanModal}
        onClose={() => setOpenPlanModal(false)}
        title="Plan post-entreno"
        description="Cuéntame tu entreno de hoy y te doy la comida ideal para recuperar mejor."
        size="md"
      >
        <CreatePostWorkoutPlanForm
          onSubmit={handleGeneratePlan}
          isLoading={isLoading}
          error={error?.message}
        />
      </Modal>

      {/* === MODAL: CONECTAR TRAININGPEAKS / INFO === */}
      <Modal
        open={openTpModal}
        onClose={() => setOpenTpModal(false)}
        title="Conectar TrainingPeaks (beta)"
        description={
          connected
            ? "Ya estás conectado. Pronto sincronizaremos automáticamente tu planning semanal."
            : "Autoriza acceso a tu TrainingPeaks para leer las sesiones de esta semana."
        }
        size="sm"
      >
        <div className="space-y-4 text-sm text-[var(--text-primary)] leading-relaxed">
          {!connected ? (
            <>
              <p>
                Te vamos a pedir permiso para leer tu plan de entrenos. Con esa
                info generaremos tu nutrición personalizada antes y después de
                cada sesión.
              </p>
              <p className="text-[var(--text-secondary)] text-xs leading-relaxed">
                Nunca publicamos nada en tu cuenta TrainingPeaks. Sólo leemos.
              </p>
            </>
          ) : (
            <>
              <p>
                Perfecto. Ya podemos usar tus entrenos programados para calcular
                cada comida crítica de la semana.
              </p>
              <p className="text-[var(--text-secondary)] text-xs leading-relaxed">
                Si cambias el plan en TrainingPeaks, lo verás reflejado aquí.
              </p>
            </>
          )}
        </div>
      </Modal>
    </>
  );
}

function AdherenceStatBlock({
  percent,
  total,
  takenCount
}: {
  percent: number;
  total: number;
  takenCount: number;
}) {
  return (
    <MotionWrapper keyId="adherence-stats">
      <div>
        <div className="text-3xl font-semibold text-[var(--text-primary)] leading-tight">
          {percent}%
        </div>
        <div className="text-[var(--text-secondary)] text-sm leading-relaxed">
          Adherencia nutricional tus últimos 7 días.
          <br />
          {takenCount} / {total} planes seguidos.
        </div>
      </div>
    </MotionWrapper>
  );
}

function AdherenceActionBlock({
  disabled,
  onTaken,
  onSkipped
}: {
  disabled: boolean;
  onTaken: () => void;
  onSkipped: () => void;
}) {
  return (
    <MotionWrapper keyId="adherence-actions">
      <div className="space-y-2">
        <div className="text-xs text-[var(--text-secondary)] leading-relaxed">
          ¿Has seguido el último plan recomendado?
        </div>

        <div className="flex flex-wrap gap-2">
          <Button
            className="flex-1 min-w-[120px]"
            disabled={disabled}
            onClick={onTaken}
          >
            Tomado ✅
          </Button>

          <Button
            className="flex-1 min-w-[120px]"
            variant="ghost"
            disabled={disabled}
            onClick={onSkipped}
          >
            Me lo salté ❌
          </Button>
        </div>

        {disabled && (
          <div className="text-[var(--text-secondary)] text-[11px]">
            Genera primero un plan post-entreno para registrar adherencia.
          </div>
        )}
      </div>
    </MotionWrapper>
  );
}

// Generador de título comercial del plan post-entreno
function buildPlanTitle(data: {
  workoutType: string;
  durationMin: number;
  goal: string;
  weightKg: number;
  dietPrefs: string;
  notes: string;
}) {
  if (data.goal === "musculo") return "Recuperación muscular alta en proteína";
  if (data.goal === "grasa") return "Recuperación ligera baja en carbo";
  if (data.goal === "rendimiento") return "Recarga glucógeno rápida";
  return "Plan post-entreno personalizado";
}
