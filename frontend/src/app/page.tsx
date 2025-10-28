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
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.24em] text-white/70">
            Cook smarter. Recover stronger.
          </div>

          <h1 className="font-heading text-4xl leading-tight md:text-5xl">
            Nutrición inteligente.
            <br />
            Rendimiento sin límites.
          </h1>

          <p className="max-w-xl text-base text-white/70 md:text-lg">
            Descubre el plan nutricional diario que tu cuerpo necesita después de cada entreno. Coocked AI analiza tu sesión, objetivo y metabolismo para entregar todas tus comidas clave: pre, post, snacks, comidas principales y noche.
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

        <div className="relative flex h-full w-full items-center justify-center">
          <div className="relative flex w-full max-w-md flex-col gap-4 rounded-3xl border border-white/10 bg-white/5 p-6 text-left shadow-2xl">
            <div className="font-heading text-sm uppercase tracking-wider text-white/70">
              Vista previa de tu día
            </div>
            <div className="rounded-2xl bg-black/40 p-5 backdrop-blur">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-[#34D399]">Objetivo</p>
                  <p className="font-heading text-lg text-white">Músculo + potencia</p>
                </div>
                <span className="font-metric text-2xl text-[#4A90E2]">92%</span>
              </div>
              <ul className="mt-6 space-y-4 text-sm text-white/80">
                <li className="rounded-2xl border border-white/10 bg-white/10 p-4">
                  <div className="flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-white/60">
                    <span className="rounded-full bg-[#34D399]/20 px-3 py-1 text-[#34D399]">Pre</span>
                    30 min antes
                  </div>
                  Carbo rápido + electrolitos + activación neuromuscular.
                </li>
                <li className="rounded-2xl border border-white/10 bg-white/10 p-4">
                  <div className="flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-white/60">
                    <span className="rounded-full bg-[#4A90E2]/20 px-3 py-1 text-[#4A90E2]">Post</span>
                    0-30 min
                  </div>
                  40g proteína, 70g carbo rápido, sodio y antioxidantes.
                </li>
                <li className="rounded-2xl border border-white/10 bg-white/10 p-4">
                  <div className="flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-white/60">
                    <span className="rounded-full bg-white/20 px-3 py-1 text-white">Cena</span>
                    21:30h
                  </div>
                  Huevos, verduras verdes, grasas buenas y caseína ligera.
                </li>
              </ul>
            </div>
            <div className="absolute -inset-10 -z-10 hidden rounded-[40px] bg-[#4A90E2]/40 blur-3xl md:block" />
          </div>
        </div>
      </div>
    </motion.section>
  );
}

function HowItWorksSection() {
  const steps = [
    {
      title: "Registra tu sesión",
      text: "Tipo de entreno, duración, intensidad y objetivo."
    },
    {
      title: "La IA analiza",
      text: "Procesamos tus datos y tu historial nutricional en segundos."
    },
    {
      title: "Recibes tu plan",
      text: "Comidas y suplementación para todo el día, listas para ejecutar."
    }
  ];

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={fadeIn}
      className="space-y-10"
    >
      <div className="space-y-3 text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-[#4A90E2]">Cómo funciona</p>
        <h2 className="font-heading text-3xl text-[#111111] md:text-4xl">Tu cuerpo. Tu entrenamiento. Tu plan.</h2>
        <p className="mx-auto max-w-2xl text-base text-[#2B2B2B]/70">
          Coocked AI analiza tu sesión de entrenamiento, tu composición corporal y tus objetivos para crear un plan nutricional exacto, en segundos.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {steps.map((step, index) => (
          <motion.div
            key={step.title}
            custom={0.2 + index * 0.1}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={fadeIn}
            className="rounded-3xl border border-[#E5E5E5] bg-white p-8 shadow-md"
          >
            <div className="font-metric text-2xl text-[#4A90E2]">{`0${index + 1}`}</div>
            <h3 className="mt-4 font-heading text-xl text-[#111111]">{step.title}</h3>
            <p className="mt-3 text-sm text-[#2B2B2B]/70">{step.text}</p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}

function DataValidationSection() {
  const stats = [
    { label: "+23% recuperación media", description: "Tras 4 semanas siguiendo recomendaciones diarias." },
    { label: "–15% fatiga acumulada", description: "Medido mediante variabilidad de ritmo y carga percibida." },
    { label: "+8% adherencia nutricional", description: "Los atletas siguen mejor lo que entienden en tiempo real." }
  ];

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={fadeIn}
      className="rounded-[32px] bg-[#111111] px-8 py-16 text-white shadow-xl md:px-16"
    >
      <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div className="space-y-5">
          <p className="text-sm uppercase tracking-[0.3em] text-[#34D399]">Validado por datos</p>
          <h2 className="font-heading text-3xl md:text-4xl">Diseñado por datos. Validado por resultados.</h2>
          <p className="text-base text-white/70">
            Cada recomendación se basa en evidencia científica sobre recuperación muscular, repleción de glucógeno y control de fatiga. Coocked AI aprende de cada sesión para ajustar cantidades, timing y suplementación.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-3">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center"
            >
              <div className="font-metric text-2xl text-white">{stat.label}</div>
              <p className="mt-3 text-xs text-white/60">{stat.description}</p>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}

function IntegrationsSection() {
  const integrations = ["Garmin", "Strava", "Apple Health", "MyFitnessPal"];

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={fadeIn}
      className="space-y-8"
    >
      <div className="space-y-3 text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-[#4A90E2]">Integraciones</p>
        <h2 className="font-heading text-3xl text-[#111111] md:text-4xl">Conecta tu mundo deportivo.</h2>
        <p className="mx-auto max-w-2xl text-base text-[#2B2B2B]/70">
          Sincroniza Coocked AI con tus apps y wearables favoritos.
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-6">
        {integrations.map((integration) => (
          <div
            key={integration}
            className="rounded-2xl border border-[#E5E5E5] bg-white px-8 py-4 text-sm font-semibold uppercase tracking-[0.3em] text-[#111111]/80 shadow-sm"
          >
            {integration}
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

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={fadeIn}
      className="grid gap-8 md:grid-cols-[0.8fr_1.2fr] md:items-center"
    >
      <div className="space-y-3">
        <p className="text-sm uppercase tracking-[0.3em] text-[#4A90E2]">Opiniones</p>
        <h2 className="font-heading text-3xl text-[#111111] md:text-4xl">
          Opiniones reales, resultados reales.
        </h2>
        <p className="text-base text-[#2B2B2B]/70">
          Atletas y entrenadores confían en Coocked AI para eliminar la incertidumbre nutricional después de cada entreno exigente.
        </p>
      </div>

      <div className="grid gap-6">
        {testimonials.map((testimonial) => (
          <blockquote
            key={testimonial.author}
            className="rounded-3xl border border-[#E5E5E5] bg-white p-8 shadow-md"
          >
            <p className="text-lg text-[#111111]/90">“{testimonial.quote}”</p>
            <footer className="mt-4 text-sm text-[#8E8E8E]">— {testimonial.author}</footer>
          </blockquote>
        ))}
      </div>
    </motion.section>
  );
}

function FinalCTASection() {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={fadeIn}
      className="rounded-[32px] bg-gradient-to-br from-[#111111] via-[#141414] to-[#050505] px-8 py-16 text-center text-white shadow-2xl md:px-16"
    >
      <h2 className="font-heading text-3xl md:text-4xl">Tu entrenamiento no termina al dejar el gimnasio.</h2>
      <p className="mt-4 text-base text-white/70">Empieza a recuperarte con ciencia.</p>
      <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
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
