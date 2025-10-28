"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const fadeIn = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay,
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1]
    }
  })
};

export default function LandingPage() {
  return (
    <div className="flex flex-col gap-24">
      <HeroSection />
      <HowItWorksSection />
      <DataValidationSection />
      <IntegrationsSection />
      <TestimonialsSection />
      <FinalCTASection />
    </div>
  );
}

function HeroSection() {
  return (
    <motion.section
      initial="hidden"
      animate="visible"
      variants={fadeIn}
      className="overflow-hidden rounded-[32px] bg-gradient-to-br from-[#111111] via-[#1B1B1B] to-[#050505] px-8 py-16 text-white shadow-lg md:px-16 md:py-20"
    >
      <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-6">
          <h1 className="text-3xl font-semibold leading-tight sm:text-4xl">
            Tu plan diario nutricional,
            <br className="hidden sm:block" />
            optimizado por IA en 10 segundos.
          </h1>

          <p className="text-[var(--text-secondary)] text-base leading-relaxed max-w-lg">
            Cooked-AI analiza tu entreno, objetivo y preferencias para darte la
            nutrición completa de TODO el día: qué tomar antes, justo después,
            snacks, comidas principales y cena.
          </p>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button
              className="rounded-xl bg-[#4A90E2] px-6 py-3 text-base font-semibold text-white shadow-lg shadow-[#4A90E2]/40 transition hover:scale-[1.02] hover:bg-[#3b7ac0]"
              onClick={() => {
                window.location.href = "/signup";
              }}
            >
              Empieza gratis
            </Button>
            <Button
              variant="ghost"
              className="rounded-xl border border-white/30 bg-transparent px-6 py-3 text-base font-semibold text-white transition hover:scale-[1.02] hover:border-white"
              onClick={() => {
                window.location.href = "/dashboard";
              }}
            >
              Ver cómo funciona
            </Button>
          </div>

          <p className="text-xs text-white/50">
            Planes basados en ciencia deportiva y datos reales de recuperación muscular y glucógeno.
          </p>
        </div>

        {/* Mini "screenshot" estilo preview del dashboard */}
        <div className="relative rounded-lg border border-border bg-surface shadow-lg p-4 text-sm max-w-md w-full mx-auto">
          <div className="text-xs text-[var(--text-secondary)] mb-2">
            Último plan diario generado
          </div>
        </div>
      </div>
    </motion.section>
  );
}

          <div className="rounded-lg border border-border bg-white/60 dark:bg-white/5 p-4 shadow-sm">
            <div className="text-sm font-semibold text-[var(--text-primary)] leading-tight">
              Plan diario: ganar músculo y recuperar rápido
            </div>
            <div className="text-[var(--text-secondary)] text-xs leading-relaxed mt-1">
              Objetivo: ganar músculo
            </div>

            <ul className="mt-4 space-y-3 text-[var(--text-primary)] text-sm">
              <li className="rounded-md border border-border bg-surface p-3">
                <div className="text-xs uppercase tracking-wide text-[var(--text-secondary)]">
                  PRE · 30 min antes
                </div>
                Carbo rápido + electrolitos + 200mg cafeína ligera.
              </li>
              <li className="rounded-md border border-border bg-surface p-3">
                <div className="text-xs uppercase tracking-wide text-[var(--text-secondary)]">
                  POST · 0-30 min
                </div>
                Batido 40g whey + 70g arroz/jugo + sodio extra si sudaste mucho.
              </li>
              <li className="rounded-md border border-border bg-surface p-3">
                <div className="text-xs uppercase tracking-wide text-[var(--text-secondary)]">
                  COMIDA · 60-90 min
                </div>
                Arroz blanco + pollo + aceite de oliva + verduras fáciles.
              </li>
              <li className="rounded-md border border-border bg-surface p-3">
                <div className="text-xs uppercase tracking-wide text-[var(--text-secondary)]">
                  CENA · Antes de dormir
                </div>
                Huevos + verduras salteadas + caseína suave para la noche.
              </li>
            </ul>
          </div>
        ))}
      </div>
    </motion.section>
  );
}

function TestimonialsSection() {
  const testimonials = [
    {
      quote:
        "Antes improvisaba mi post-entreno. Ahora sé exactamente qué necesita mi cuerpo.",
      author: "Carla M., triatleta amateur"
    },
    {
      quote: "Simple, preciso y sin tonterías. La IA acierta.",
      author: "David P., entrenador personal"
    }
  ];

      {/* Beneficios rápidos */}
      <section className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        <FeatureCard
          title="Recupera mejor"
          desc="Evita perder músculo y baja la inflamación planificando cada comida crítica del día."
        />
        <FeatureCard
          title="Tu objetivo, no genérico"
          desc="Músculo, déficit o rendimiento. Adaptamos pre, post, snacks y cena a lo que necesitas."
        />
        <FeatureCard
          title="Sin pensar"
          desc="Sales del gym y sabes qué comer el resto del día en 10 segundos."
        />
      </section>

      {/* CTA final */}
      <footer className="text-center space-y-4">
        <div className="text-xl font-semibold leading-tight">
          ¿Entrenas? Te decimos qué comer en todo tu día.
        </div>
        <Button
          className="rounded-xl bg-[#4A90E2] px-6 py-3 text-base font-semibold text-white shadow-lg transition hover:scale-[1.02] hover:bg-[#3b7ac0]"
          onClick={() => {
            window.location.href = "/signup";
          }}
        >
          Empieza ahora
        </Button>
        <Button
          variant="ghost"
          className="rounded-xl border border-white/30 px-6 py-3 text-base font-semibold text-white transition hover:scale-[1.02] hover:border-white"
          onClick={() => {
            window.location.href = "/login";
          }}
        >
          Ya tengo cuenta
        </Button>
      </div>
    </motion.section>
  );
}
