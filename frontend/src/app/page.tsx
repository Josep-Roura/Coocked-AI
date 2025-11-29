"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import React from "react";

const fadeIn = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay,
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

// ---------------------------------------------
// PAGE
// ---------------------------------------------
export default function LandingPage() {
  return (
    <div className="flex flex-col gap-24 pb-24">
      <HeroSection />
      <HowItWorksSection />
      <DataValidationSection />
      <IntegrationsSection />
      <TestimonialsSection />
      <FinalCTASection />
    </div>
  );
}

// ---------------------------------------------
// HERO
// ---------------------------------------------
function HeroSection() {
  return (
    <motion.section
      initial="hidden"
      animate="visible"
      variants={fadeIn}
      className="overflow-hidden rounded-[32px] bg-gradient-to-br from-[#111111] via-[#1B1B1B] to-[#050505] px-8 py-16 text-white shadow-lg md:px-16 md:py-20"
    >
      <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        {/* TEXTO IZQUIERDA */}
        <div className="space-y-6">
          <h1 className="text-3xl font-semibold leading-tight sm:text-4xl">
            Tu plan diario nutricional,
            <br className="hidden sm:block" />
            optimizado por IA en 10 segundos.
          </h1>

          <p className="text-[var(--text-secondary)] text-base leading-relaxed max-w-lg text-white/70">
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
            Planes basados en ciencia deportiva y datos reales de recuperación
            muscular y glucógeno.
          </p>
        </div>

        {/* PREVIEW DERECHA */}
        <DashboardPreview />
      </div>
    </motion.section>
  );
}

// Mini preview tipo "último plan generado"
function DashboardPreview() {
  return (
    <div className="relative rounded-lg border border-border bg-white/5 text-white shadow-lg p-4 text-sm max-w-md w-full mx-auto backdrop-blur-md">
      <div className="text-xs text-white/60 mb-2">
        Último plan diario generado
      </div>

      <div className="rounded-lg border border-white/10 bg-white/10 p-4 shadow-sm">
        <div className="text-sm font-semibold text-white leading-tight">
          Plan diario: ganar músculo y recuperar rápido
        </div>
        <div className="text-white/60 text-xs leading-relaxed mt-1">
          Objetivo: ganar músculo
        </div>

        <ul className="mt-4 space-y-3 text-white text-sm">
          <li className="rounded-md border border-white/10 bg-white/5 p-3">
            <div className="text-[10px] uppercase tracking-wide text-white/40">
              PRE · 30 min antes
            </div>
            Carbo rápido + electrolitos + 200mg cafeína ligera.
          </li>
          <li className="rounded-md border border-white/10 bg-white/5 p-3">
            <div className="text-[10px] uppercase tracking-wide text-white/40">
              POST · 0-30 min
            </div>
            Batido 40g whey + 70g arroz/jugo + sodio extra si sudaste mucho.
          </li>
          <li className="rounded-md border border-white/10 bg-white/5 p-3">
            <div className="text-[10px] uppercase tracking-wide text-white/40">
              COMIDA · 60-90 min
            </div>
            Arroz blanco + pollo + aceite de oliva + verduras fáciles.
          </li>
          <li className="rounded-md border border-white/10 bg-white/5 p-3">
            <div className="text-[10px] uppercase tracking-wide text-white/40">
              CENA · Antes de dormir
            </div>
            Huevos + verduras salteadas + caseína suave para la noche.
          </li>
        </ul>
      </div>
    </div>
  );
}

// ---------------------------------------------
// HOW IT WORKS
// ---------------------------------------------
function HowItWorksSection() {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={fadeIn}
      className="px-8 md:px-16"
    >
      <div className="max-w-5xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-semibold text-[var(--text-primary)] leading-tight">
            ¿Cómo funciona?
          </h2>
          <p className="text-[var(--text-secondary)] max-w-xl mx-auto text-sm leading-relaxed">
            Literalmente 3 pasos. Sin tener que pesar comida ni hacer Excel.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <StepCard
            step="1"
            title="Nos dices tu entreno"
            desc="‘Ciclismo 2h Z2’, ‘Gimnasio pierna pesada’, ‘Series 8x400’. Lo que haces de verdad."
          />
          <StepCard
            step="2"
            title="Objetivo del día"
            desc="Recuperar rápido, mantener peso o déficit controlado."
          />
          <StepCard
            step="3"
            title="Te damos TODO el día"
            desc="Pre, post, comida, snack tarde y cena antes de dormir. Con cantidades."
          />
        </div>
      </div>
    </motion.section>
  );
}

function StepCard(props: { step: string; title: string; desc: string }) {
  return (
    <div className="rounded-2xl border border-border bg-surface p-6 shadow-sm">
      <div className="text-xs font-mono text-[var(--text-secondary)] mb-2">
        Paso {props.step}
      </div>
      <div className="text-[var(--text-primary)] font-semibold leading-tight mb-2">
        {props.title}
      </div>
      <div className="text-[var(--text-secondary)] text-sm leading-relaxed">
        {props.desc}
      </div>
    </div>
  );
}

// ---------------------------------------------
// DATA VALIDATION / SCIENCE CLAIM
// ---------------------------------------------
function DataValidationSection() {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={fadeIn}
      className="px-8 md:px-16"
    >
      <div className="max-w-4xl mx-auto rounded-2xl border border-border bg-white/60 dark:bg-white/5 p-8 shadow-sm space-y-6">
        <div className="space-y-2">
          <h2 className="text-xl font-semibold text-[var(--text-primary)] leading-tight">
            Basado en fisiología real, no en frases motivacionales
          </h2>
          <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
            Ajustamos timing de proteína, carbohidrato y sodio según volumen,
            intensidad y sudoración. Optimizamos resíntesis de glucógeno y
            protección muscular post-entreno.
          </p>
        </div>

        <ul className="text-sm grid gap-4 sm:grid-cols-2 text-[var(--text-primary)]">
          <li className="rounded-lg border border-border bg-surface p-4">
            Recuperación de glucógeno con ventana de 0-30 min tras esfuerzo largo.
          </li>
          <li className="rounded-lg border border-border bg-surface p-4">
            Ratio prot/carb ajustado a tu objetivo (déficit vs. hipertrofia).
          </li>
          <li className="rounded-lg border border-border bg-surface p-4">
            Reposición de electrolitos según sudor y calor.
          </li>
          <li className="rounded-lg border border-border bg-surface p-4">
            Carga proteica nocturna para reducir catabolismo.
          </li>
        </ul>

        <p className="text-[var(--text-secondary)] text-xs leading-relaxed">
          Y no es solo “come pollo con arroz”: te damos opciones reales, rápidas
          y que puedes comprar en el súper normal.
        </p>
      </div>
    </motion.section>
  );
}

// ---------------------------------------------
// INTEGRATIONS
// ---------------------------------------------
function IntegrationsSection() {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={fadeIn}
      className="px-8 md:px-16"
    >
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="space-y-3 text-center">
          <h2 className="text-2xl font-semibold text-[var(--text-primary)] leading-tight">
            Se conecta contigo
          </h2>
          <p className="text-[var(--text-secondary)] max-w-xl text-sm leading-relaxed mx-auto">
            Estamos preparando integraciones con reloj / Strava / Garmin para
            que no tengas ni que escribir tu entreno.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <FeatureCard
            title="Importa tu sesión"
            desc="Leemos duración, tipo de sesión e intensidad."
          />
          <FeatureCard
            title="Ajuste automático"
            desc="Más carbs si ha sido largo / más sodio si has reventado sudando."
          />
          <FeatureCard
            title="Sin tracking loco"
            desc="No te pedimos pesar el jamón dulce ni contar almendras una por una."
          />
        </div>
      </div>
    </motion.section>
  );
}

function FeatureCard(props: { title: string; desc: string }) {
  return (
    <div className="rounded-2xl border border-border bg-surface p-6 shadow-sm">
      <div className="text-[var(--text-primary)] font-semibold leading-tight mb-2">
        {props.title}
      </div>
      <div className="text-[var(--text-secondary)] text-sm leading-relaxed">
        {props.desc}
      </div>
    </div>
  );
}

// ---------------------------------------------
// TESTIMONIOS
// ---------------------------------------------
function TestimonialsSection() {
  const testimonials = [
    {
      quote:
        "Antes improvisaba mi post-entreno. Ahora sé exactamente qué necesita mi cuerpo.",
      author: "Carla M., triatleta amateur",
    },
    {
      quote: "Simple, preciso y sin tonterías. La IA acierta.",
      author: "David P., entrenador personal",
    },
  ];

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={fadeIn}
      className="px-8 md:px-16"
    >
      <div className="max-w-5xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-semibold text-[var(--text-primary)] leading-tight">
            Lo que dice la gente que entrena
          </h2>
          <p className="text-[var(--text-secondary)] max-w-xl mx-auto text-sm leading-relaxed">
            Atletas recreativos, no pros. Vida normal, curro, entreno y ya.
          </p>
        </div>

        {/* Cards de testimonios */}
        <div className="grid gap-6 sm:grid-cols-2">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="rounded-2xl border border-border bg-surface p-6 shadow-sm"
            >
              <div className="text-[var(--text-primary)] text-sm leading-relaxed">
                “{t.quote}”
              </div>
              <div className="text-[var(--text-secondary)] text-xs mt-4">
                {t.author}
              </div>
            </div>
          ))}
        </div>

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
      </div>
    </motion.section>
  );
}

// ---------------------------------------------
// CTA FINAL
// ---------------------------------------------
function FinalCTASection() {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={fadeIn}
      className="px-8 md:px-16"
    >
      <div className="max-w-xl mx-auto text-center space-y-6 rounded-2xl border border-border bg-gradient-to-br from-[#111111] via-[#1B1B1B] to-[#050505] p-10 text-white shadow-xl">
        <div className="text-xl font-semibold leading-tight">
          ¿Entrenas? Te decimos qué comer en todo tu día.
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
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

        <p className="text-[10px] text-white/40 leading-relaxed max-w-sm mx-auto">
          Sin tarjeta. Te pedimos tus entrenos, objetivos y preferencias
          alimentarias. Te devolvemos tu día nutricional entero en 10 segundos.
        </p>
      </div>
    </motion.section>
  );
}
