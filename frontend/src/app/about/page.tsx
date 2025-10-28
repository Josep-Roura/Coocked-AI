export default function AboutPage() {
  return (
    <section className="space-y-12 text-[#2B2B2B]">
      <header className="space-y-4">
        <p className="text-sm uppercase tracking-[0.3em] text-[#4A90E2]">Nuestra visión</p>
        <h1 className="font-heading text-4xl text-[#111111]">Ciencia, rendimiento y precisión.</h1>
        <p className="max-w-3xl text-lg text-[#2B2B2B]/80">
          Somos un equipo de ingenieros, nutricionistas y deportistas con una misión clara: llevar la precisión científica de la élite a todos los atletas. Nuestra IA aprende de tus datos para mejorar tu rendimiento día tras día. No creemos en dietas genéricas, sino en decisiones inteligentes basadas en evidencia.
        </p>
      </header>

      <div className="grid gap-8 rounded-[32px] bg-gradient-to-br from-[#111111] via-[#1C1C1C] to-[#050505] p-10 text-white shadow-2xl lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-6">
          <h2 className="font-heading text-3xl">Por qué construimos Coocked AI</h2>
          <p className="text-base text-white/70">
            Los atletas profesionales cuentan con equipos completos de nutrición y rendimiento. Queremos poner esa precisión en manos de cualquiera que ame entrenar. Coocked AI analiza el contexto completo de tu sesión: intensidad, historial, adherencia y objetivos.
          </p>
          <p className="text-base text-white/70">
            El resultado: planes diarios claros, accionables y conectados con tus datos reales. Sabemos que la nutrición post-entreno es sólo el inicio; aquí planificamos todo el día para que cada comida tenga sentido dentro de tu ciclo de entrenamiento.
          </p>
        </div>

        <div className="grid gap-6">
          <div className="rounded-2xl border border-white/10 bg-white/10 p-6">
            <h3 className="font-heading text-xl text-white">IA entrenada con ciencia</h3>
            <p className="mt-3 text-sm text-white/70">
              Alimentamos nuestro modelo con estudios sobre recuperación muscular, carga de glucógeno y suplementación efectiva para diferentes disciplinas.
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/10 p-6">
            <h3 className="font-heading text-xl text-white">Diseño para atletas</h3>
            <p className="mt-3 text-sm text-white/70">
              Interfaz minimalista, datos claros y decisiones rápidas. Tu energía está en entrenar, no en interpretar hojas de cálculo interminables.
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/10 p-6">
            <h3 className="font-heading text-xl text-white">Privacidad primero</h3>
            <p className="mt-3 text-sm text-white/70">
              Tus datos son tuyos. En la demo guardamos sólo lo necesario para mejorar tu plan y nunca compartimos información sensible.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
