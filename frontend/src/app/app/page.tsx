"use client";

import { useEffect, useState } from "react";
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
import { useTrainingPeaksConnection } from "@/lib/api/useTrainingPeaksConnection";
import { useListResourcesQuery } from "@/lib/api/useListResourcesQuery";
import { useWeeklyPlanQuery } from "@/lib/api/useWeeklyPlanQuery";
import { Loader } from "@/components/feedback/Loader";

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

  const { data: planHistory, isLoading: isLoadingHistory } =
    useListResourcesQuery();

  useEffect(() => {
    if (planHistory.length === 0) {
      if (lastCreated) {
        setLastCreated(undefined);
      }
      return;
    }

    if (!lastCreated) {
      const newest = planHistory[0];
      setLastCreated({
        id: newest.id,
        title: newest.title,
        category: newest.category
      });
    }
  }, [lastCreated, planHistory]);

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
    createResource({
      workoutType: data.workoutType,
      durationMin: data.durationMin,
      goal: data.goal,
      weightKg: data.weightKg,
      dietPrefs: data.dietPrefs,
      notes: data.notes
    });
  }

  function handleMark(taken: boolean) {
    if (!lastCreated) return;
    markAdherence({
      planId: lastCreated.id,
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

  const { data: week, loading: loadingWeek, error: weekError } =
    useWeeklyPlanQuery();

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
                description="Genera tu plan diario completo en menos de 10s"
              />
              <CardContent>
                <Button
                  className="w-full"
                  isLoading={isLoading}
                  onClick={handleOpenPlanModal}
                >
                  Generar plan diario
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
                {isLoadingHistory ? (
                  <div className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
                    <Loader size="sm" />
                    <span>Cargando último plan...</span>
                  </div>
                ) : lastCreated ? (
                  <Alert
                    variant="success"
                    title="Plan generado correctamente"
                    description={`${lastCreated.title} (${lastCreated.category}) ya está listo.`}
                  />
                ) : (
                  <ul className="text-sm leading-relaxed text-[var(--text-secondary)] space-y-1">
                    <li>• Aún no has generado ningún plan hoy</li>
                    <li>• Pulsa “Generar plan diario”</li>
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
            {loadingWeek ? (
              <div className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
                <Loader size="sm" />
                <span>Cargando plan semanal...</span>
              </div>
            ) : week.length > 0 ? (
              <WeeklyCalendar week={week} />
            ) : weekError ? (
              <Alert
                variant="error"
                title="No se pudo cargar tu semana"
                description={weekError}
              />
            ) : (
              <div className="rounded-md border border-dashed border-border p-6 text-center text-sm text-[var(--text-secondary)]">
                Aún no tienes sesiones planificadas esta semana.
                <br />
                Conecta TrainingPeaks o añade entrenos manualmente para ver la
                nutrición recomendada alrededor de cada sesión.
              </div>
            )}

            <p className="text-[var(--text-secondary)] text-[11px] leading-relaxed">
              Muy pronto: leeremos automáticamente tus entrenos planificados
              desde TrainingPeaks y generaremos para cada uno la nutrición de
              todo el día.
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
        title="Plan diario personalizado"
        description="Cuéntame tu entreno de hoy y te doy la nutrición completa del día."
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
            Genera primero un plan diario para registrar adherencia.
          </div>
        )}
      </div>
    </MotionWrapper>
  );
}

