"use client";

import { Button } from "@/components/ui/button";

export default function MarketingLandingPage() {
  return (
    <section className="mx-auto max-w-content px-4 py-16 flex flex-col gap-16 text-[var(--text-primary)]">
      {/* Hero */}
      <header className="grid gap-8 lg:grid-cols-2 lg:items-center">
        <div className="space-y-6">
          <h1 className="text-3xl font-semibold leading-tight sm:text-4xl">
            Tu comida post-entreno,
            <br className="hidden sm:block" />
            optimizada por IA en 10 segundos.
          </h1>

          <p className="text-[var(--text-secondary)] text-base leading-relaxed max-w-lg">
            Cooked-AI analiza tu entreno, tu objetivo físico y tus
            preferencias alimentarias para decirte exactamente qué comer
            después de entrenar: receta, macros, y por qué eso acelera tu
            recuperación.
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              className="h-11 px-5 text-base font-medium"
              onClick={() => {
                window.location.href = "/login";
              }}
            >
              Probar la demo
            </Button>

            <Button
              variant="ghost"
              className="h-11 px-5 text-base font-medium text-[var(--text-primary)]"
              onClick={() => {
                window.location.href = "/login";
              }}
            >
              Entrar a mi panel →
            </Button>
          </div>

          <p className="text-[var(--text-secondary)] text-xs leading-relaxed">
            Sin tarjetas. Sólo responde a 5 preguntas sobre tu entreno de hoy.
          </p>
        </div>

        {/* Mini "screenshot" estilo preview del dashboard */}
        <div className="relative rounded-lg border border-border bg-surface shadow-lg p-4 text-sm max-w-md w-full mx-auto">
          <div className="text-xs text-[var(--text-secondary)] mb-2">
            Último plan generado
          </div>

          <div className="rounded-lg border border-border bg-white/60 dark:bg-white/5 p-4 shadow-sm">
            <div className="text-sm font-semibold text-[var(--text-primary)] leading-tight">
              Recuperación muscular alta en proteína
            </div>
            <div className="text-[var(--text-secondary)] text-xs leading-relaxed mt-1">
              Objetivo: ganar músculo
            </div>

            <div className="mt-4 text-[var(--text-primary)] text-sm leading-relaxed">
              Batido whey con agua + crema de arroz instantánea + frutos
              rojos. Tómalo en los próximos 30 minutos.
            </div>

            <ul className="mt-4 text-[var(--text-primary)] text-xs grid grid-cols-3 gap-2">
              <li className="rounded-md border border-border bg-surface p-2 text-center">
                <div className="font-semibold text-[var(--text-primary)]">
                  40g
                </div>
                <div className="text-[var(--text-secondary)]">Proteína</div>
              </li>
              <li className="rounded-md border border-border bg-surface p-2 text-center">
                <div className="font-semibold text-[var(--text-primary)]">
                  60g
                </div>
                <div className="text-[var(--text-secondary)]">Carbo</div>
              </li>
              <li className="rounded-md border border-border bg-surface p-2 text-center">
                <div className="font-semibold text-[var(--text-primary)]">
                  6g
                </div>
                <div className="text-[var(--text-secondary)]">Grasas</div>
              </li>
            </ul>
          </div>

          <div className="absolute -inset-1 -z-10 blur-2xl opacity-30 bg-[radial-gradient(circle_at_30%_30%,rgba(99,102,241,0.4),transparent_70%)] pointer-events-none" />
        </div>
      </header>

      {/* Beneficios rápidos */}
      <section className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        <FeatureCard
          title="Recupera mejor"
          desc="Evita perder músculo y baja la inflamación después de entrenar. Te damos la receta exacta, no teoría."
        />
        <FeatureCard
          title="Tu objetivo, no genérico"
          desc="Ganar músculo, quemar grasa o simplemente llegar fresco al siguiente entreno. Cambia el objetivo y cambia la comida."
        />
        <FeatureCard
          title="Sin pensar"
          desc="¿Acabas de salir del gym y no sabes qué comer? Lo generas en el móvil en 10 segundos."
        />
      </section>

      {/* CTA final */}
      <footer className="text-center space-y-4">
        <div className="text-xl font-semibold leading-tight">
          ¿Entrenas? Te decimos qué comer ahora mismo.
        </div>
        <Button
          className="h-11 px-5 text-base font-medium"
          onClick={() => {
            window.location.href = "/login";
          }}
        >
          Ir a la demo →
        </Button>
        <div className="text-[var(--text-secondary)] text-xs leading-relaxed max-w-md mx-auto">
          Beta privada. Algunas recomendaciones pueden variar según
          tolerancias personales. Consulta a un profesional si tienes
          condiciones médicas.
        </div>
      </footer>
    </section>
  );
}

function FeatureCard({
  title,
  desc
}: {
  title: string;
  desc: string;
}) {
  return (
    <div className="rounded-lg border border-border bg-surface p-4 shadow-sm">
      <div className="text-sm font-semibold text-[var(--text-primary)] leading-tight">
        {title}
      </div>
      <div className="text-[var(--text-secondary)] text-sm leading-relaxed mt-2">
        {desc}
      </div>
    </div>
  );
}
