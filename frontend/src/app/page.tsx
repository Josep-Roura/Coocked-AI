"use client";

import { MotionWrapper } from "@/components/motion-wrapper";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import Link from "next/link";

export default function MarketingHomePage() {
  return (
    <div className="flex flex-col gap-24 pb-24">
      {/* ====================================================== */}
      {/* HERO / ABOVE THE FOLD */}
      {/* ====================================================== */}
      <section className="pt-16 text-center">
        <MotionWrapper keyId="hero-block">
          <div className="mx-auto max-w-2xl space-y-8">
            {/* Badge beta */}
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-[var(--surface)] px-3 py-1 text-[10px] font-medium text-[var(--text-secondary)] shadow-sm">
              <span className="inline-block h-2 w-2 rounded-full bg-[hsl(142,70%,40%)]"></span>
              <span>Beta privada · atletas y entrenadores</span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-4xl font-semibold leading-tight text-[var(--text-primary)]">
              Nutrición post-entreno diseñada para tu sesión de hoy, no para
              “una persona como tú”.
            </h1>

            {/* Subcopy */}
            <p className="text-[var(--text-secondary)] text-base leading-relaxed">
              Cooked-AI genera al instante tu comida ideal justo después de
              entrenar: cantidades, timing, y opciones reales que puedes comer.
              Conecta tu calendario de entrenos y deja de improvisar.
            </p>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row sm:justify-center gap-3 sm:gap-4">
              <Link href="/login" className="w-full sm:w-auto">
                <Button className="w-full text-sm px-5 py-3 font-medium">
                  Empieza ahora
                </Button>
              </Link>

              <a
                className="w-full sm:w-auto"
                href="#como-funciona"
              >
                <Button
                  variant="ghost"
                  className="w-full text-sm px-5 py-3 font-medium"
                >
                  Ver cómo funciona ↓
                </Button>
              </a>
            </div>

            {/* Mini trust indicators */}
            <div className="text-[11px] text-[var(--text-secondary)] leading-relaxed">
              <p>
                Sin cálculos de macros. Sin excusas tipo “no sé qué comer”.
              </p>
              <p>Te lo damos masticado. Literalmente.</p>
            </div>
          </div>
        </MotionWrapper>

        {/* Mock UI preview section */}
        <MotionWrapper keyId="hero-preview">
          <div className="mx-auto max-w-5xl mt-16">
            <div className="rounded-xl border border-border bg-[var(--surface)] shadow-lg overflow-hidden">
              <div className="border-b border-border bg-[var(--bg)] px-4 py-2 text-left text-[10px] text-[var(--text-secondary)] flex items-center gap-2">
                <div className="flex gap-1">
                  <span className="h-2 w-2 rounded-full bg-red-400"></span>
                  <span className="h-2 w-2 rounded-full bg-yellow-400"></span>
                  <span className="h-2 w-2 rounded-full bg-green-400"></span>
                </div>
                <span className="truncate">
                  dashboard.cooked-ai.app/app (vista previa)
                </span>
              </div>

              <div className="grid gap-6 p-6 md:grid-cols-3 text-left text-[var(--text-primary)] text-sm leading-relaxed">
                <div className="rounded-lg border border-border bg-[var(--bg)] p-4 shadow-sm flex flex-col gap-2">
                  <div className="text-[11px] uppercase text-[var(--text-secondary)] font-medium leading-none">
                    Último plan post-entreno
                  </div>
                  <div className="text-[var(--text-primary)] font-semibold leading-snug">
                    Recarga glucógeno rápida
                  </div>
                  <div className="text-[11px] text-[var(--text-secondary)] leading-relaxed">
                    Batido 40g proteína + carbo rápido (plátano + arroz blanco)
                    en los próximos 30 min.
                  </div>
                  <div className="text-[11px] text-[var(--text-secondary)] leading-relaxed">
                    Cena alta en carbo y sodio 2-3h después.
                  </div>
                </div>

                <div className="rounded-lg border border-border bg-[var(--bg)] p-4 shadow-sm flex flex-col gap-2">
                  <div className="text-[11px] uppercase text-[var(--text-secondary)] font-medium leading-none">
                    Adherencia últimos 7 días
                  </div>
                  <div className="text-3xl font-semibold leading-tight text-[var(--text-primary)]">
                    82%
                  </div>
                  <div className="text-[11px] text-[var(--text-secondary)] leading-relaxed">
                    Has seguido 9 / 11 comidas clave recomendadas.
                  </div>
                  <div className="flex gap-2 text-[11px]">
                    <div className="px-2 py-[4px] rounded-md border border-border text-[var(--text-primary)] cursor-default">
                      Tomado ✅
                    </div>
                    <div className="px-2 py-[4px] rounded-md border border-border text-[var(--text-primary)] cursor-default">
                      Me lo salté ❌
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border border-border bg-[var(--bg)] p-4 shadow-sm flex flex-col gap-2">
                  <div className="text-[11px] uppercase text-[var(--text-secondary)] font-medium leading-none">
                    Esta semana
                  </div>
                  <div className="text-[var(--text-primary)] font-semibold leading-snug">
                    HIIT piernas · intensidad alta
                  </div>
                  <div className="text-[11px] text-[var(--text-secondary)] leading-relaxed">
                    Pre: pan blanco + miel + electrolitos.
                    <br />
                    Post: whey + bebida isotónica.
                  </div>
                  <div className="text-[11px] text-[var(--text-secondary)] leading-relaxed">
                    Te lo damos antes de cada sesión.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </MotionWrapper>
      </section>

      {/* ====================================================== */}
      {/* CÓMO FUNCIONA */}
      {/* ====================================================== */}
      <section
        id="como-funciona"
        className="mx-auto max-w-content px-4 space-y-12"
      >
        <div className="text-center space-y-3">
          <MotionWrapper keyId="how-head">
            <h2 className="text-2xl font-semibold leading-tight text-[var(--text-primary)]">
              Cómo funciona
            </h2>
            <p className="text-[var(--text-secondary)] text-sm leading-relaxed max-w-lg mx-auto">
              Cada entreno tiene un objetivo (potencia, Z2, fuerza, HIIT…).
              Nosotros traducimos ese objetivo en nutrición práctica al minuto.
            </p>
          </MotionWrapper>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {/* Paso 1 */}
          <MotionWrapper keyId="how-1">
            <Card className="h-full">
              <CardHeader
                title="1. Dinos qué has hecho"
                description="Tipo de entreno, duración, objetivo (quemar grasa, rendir más, ganar músculo)."
              />
              <CardContent className="text-[var(--text-secondary)] text-sm leading-relaxed space-y-3">
                <p>
                  También podrás conectar TrainingPeaks para que lo
                  detectemos automáticamente de tu planificación semanal.
                </p>
                <p className="text-[11px] leading-relaxed">
                  Ejemplo: “HIIT piernas 45 min alta intensidad”.
                </p>
              </CardContent>
            </Card>
          </MotionWrapper>

          {/* Paso 2 */}
          <MotionWrapper keyId="how-2">
            <Card className="h-full">
              <CardHeader
                title="2. Recibe tu comida ideal"
                description="En segundos te damos: qué comer, cuánto y cuándo."
              />
              <CardContent className="text-[var(--text-secondary)] text-sm leading-relaxed space-y-3">
                <ul className="list-disc pl-4 space-y-1">
                  <li>Batido/post-entreno inmediato</li>
                  <li>Comida sólida 1-2h después</li>
                  <li>Recuperación antes de dormir</li>
                </ul>
                <p className="text-[11px] leading-relaxed">
                  Adaptado a tus preferencias (ej. vegano, sin lactosa,
                  baja en carbo).
                </p>
              </CardContent>
            </Card>
          </MotionWrapper>

          {/* Paso 3 */}
          <MotionWrapper keyId="how-3">
            <Card className="h-full">
              <CardHeader
                title="3. Marca si lo cumpliste"
                description="Tomado ✅ / Me lo salté ❌"
              />
              <CardContent className="text-[var(--text-secondary)] text-sm leading-relaxed space-y-3">
                <p>
                  Calculamos tu adherencia real. Si estás a 50%, ajustamos
                  expectativas. Si estás a 90%, subimos el listón.
                </p>
                <p className="text-[11px] leading-relaxed">
                  Esto es lo que quieres enseñarle a tu entrenador.
                </p>
              </CardContent>
            </Card>
          </MotionWrapper>
        </div>
      </section>

      {/* ====================================================== */}
      {/* BENEFICIOS / WHY IT MATTERS */}
      {/* ====================================================== */}
      <section className="mx-auto max-w-content px-4 grid gap-8 md:grid-cols-2">
        {/* Bloque izquierda */}
        <MotionWrapper keyId="benefit-left">
          <div className="space-y-6">
            <div className="space-y-3">
              <h2 className="text-2xl font-semibold leading-tight text-[var(--text-primary)]">
                Esto no es “come pollo y arroz”
              </h2>
              <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
                Es nutrición contextual. Lo que comes 30 minutos después de un
                HIIT no es lo mismo que tras Z2 suave. Tampoco es lo mismo si tu
                objetivo es rendir mañana o perder grasa.
              </p>
            </div>

            <div className="rounded-lg border border-border bg-[var(--surface)] shadow-sm p-4 space-y-4 text-sm leading-relaxed">
              <div>
                <div className="text-[11px] uppercase text-[var(--text-secondary)] font-medium leading-none mb-1">
                  Antes
                </div>
                <div className="text-[var(--text-primary)]">
                  “He acabado el entreno… ¿qué como ahora?”
                </div>
              </div>

              <div>
                <div className="text-[11px] uppercase text-[var(--text-secondary)] font-medium leading-none mb-1">
                  Después
                </div>
                <div className="text-[var(--text-primary)]">
                  “Tómate este batido exacto ahora, come esto en 90 min, cena
                  esto. Aquí tienes cantidades.”
                </div>
              </div>
            </div>

            <div className="text-[11px] text-[var(--text-secondary)] leading-relaxed">
              Jugadores, ciclistas, gente que entrena fuerza a las 7:00 antes
              de ir a trabajar. No necesitas un chef privado. Necesitas claridad.
            </div>
          </div>
        </MotionWrapper>

        {/* Bloque derecha */}
        <MotionWrapper keyId="benefit-right">
          <div className="space-y-6">
            <Card>
              <CardHeader
                title="Tu 82% de adherencia vale más que tus macros teóricas"
                description="Si no puedes ejecutarlo en la vida real, no sirve."
              />
              <CardContent className="text-[var(--text-secondary)] text-sm leading-relaxed space-y-3">
                <p>
                  Los planes de papel asumen que siempre comes perfecto.
                  Nosotros asumimos que tienes vida.
                </p>
                <p>
                  Si vas flojo 3 días seguidos, bajamos exigencia. Si vienes
                  fuerte, apretamos.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader
                title="Modo entrenador"
                description="Comparte tus planes y adherencia con tu coach."
              />
              <CardContent className="text-[var(--text-secondary)] text-sm leading-relaxed space-y-3">
                <p>
                  “Te dije que comieras algo después del HIIT y no lo hiciste”.
                  Ahora se puede medir.
                </p>
                <p className="text-[11px] leading-relaxed">
                  Próximamente: panel para entrenadores con visión semanal
                  de todos sus atletas.
                </p>
              </CardContent>
            </Card>
          </div>
        </MotionWrapper>
      </section>

      {/* ====================================================== */}
      {/* CTA FINAL */}
      {/* ====================================================== */}
      <section className="mx-auto max-w-content px-4">
        <MotionWrapper keyId="cta-final">
          <div className="rounded-xl border border-border bg-[var(--surface)] shadow-md p-8 md:p-12 text-center space-y-6">
            <div className="space-y-3">
              <h2 className="text-2xl font-semibold leading-tight text-[var(--text-primary)]">
                Empieza gratis en beta
              </h2>
              <p className="text-[var(--text-secondary)] text-sm leading-relaxed max-w-md mx-auto">
                Genera tu comida post-entreno personalizada hoy mismo. Marca si
                la has cumplido. Mide tu adherencia real esta semana.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
              <Link href="/login" className="w-full sm:w-auto">
                <Button className="w-full text-sm px-5 py-3 font-medium">
                  Crear mi primer plan →
                </Button>
              </Link>
              <Link
                href="/login?redirectTo=/app"
                className="w-full sm:w-auto"
              >
                <Button
                  variant="ghost"
                  className="w-full text-sm px-5 py-3 font-medium"
                >
                  Ver el panel en vivo
                </Button>
              </Link>
            </div>

            <div className="text-[11px] text-[var(--text-secondary)] leading-relaxed">
              Sin tarjeta. Sin contratos. Esto está hecho para que lo pruebes
              entrenando mañana.
            </div>
          </div>
        </MotionWrapper>
      </section>

      {/* ====================================================== */}
      {/* FOOTER */}
      {/* ====================================================== */}
      <footer className="border-t border-border/60 bg-[var(--bg)]">
        <div className="mx-auto max-w-content px-4 py-12 grid gap-8 md:grid-cols-3 text-[11px] leading-relaxed">
          <div className="space-y-2 text-[var(--text-secondary)]">
            <div className="text-[var(--text-primary)] font-semibold text-sm leading-tight">
              Cooked-AI
            </div>
            <div>
              Nutrición post-entreno con contexto real:
              tu sesión, tu objetivo, tu vida.
            </div>
          </div>

          <div className="space-y-2 text-[var(--text-secondary)]">
            <div className="text-[var(--text-primary)] font-semibold text-sm leading-tight">
              Producto
            </div>
            <ul className="space-y-1">
              <li>
                <Link
                  className="hover:text-[var(--text-primary)]"
                  href="/login?redirectTo=/app"
                >
                  Panel demo
                </Link>
              </li>
              <li>
                <a
                  className="hover:text-[var(--text-primary)]"
                  href="#como-funciona"
                >
                  Cómo funciona
                </a>
              </li>
              <li className="text-[var(--text-secondary)]">
                Entrenadores (muy pronto)
              </li>
            </ul>
          </div>

          <div className="space-y-2 text-[var(--text-secondary)]">
            <div className="text-[var(--text-primary)] font-semibold text-sm leading-tight">
              Legal
            </div>
            <ul className="space-y-1">
              <li className="text-[var(--text-secondary)]">
                Política de privacidad
              </li>
              <li className="text-[var(--text-secondary)]">
                Términos de uso
              </li>
              <li className="text-[var(--text-secondary)]">
                No es consejo médico
              </li>
            </ul>
          </div>
        </div>

        <div className="text-[10px] text-[var(--text-secondary)] text-center pb-8 leading-relaxed">
          © {new Date().getFullYear()} Cooked-AI. Todos los derechos reservados.
        </div>
      </footer>
    </div>
  );
}
