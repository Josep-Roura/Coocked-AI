import Link from "next/link";

const highlights = [
  {
    title: "Adherencia semanal",
    metric: "92%",
    description: "Registra si seguiste tu plan diario. Ajustamos cantidades y timing automáticamente."
  },
  {
    title: "Carga y calorías",
    metric: "3.240 kcal",
    description: "Visualiza lo que has consumido y lo que falta para completar tu recuperación."
  },
  {
    title: "Estado del músculo",
    metric: "Listo",
    description: "Detectamos cuándo empujar más o reducir intensidad según tu nutrición real."
  }
];

export default function DashboardMarketingPage() {
  return (
    <section className="space-y-16 text-[#2B2B2B]">
      <header className="space-y-4">
        <p className="text-sm uppercase tracking-[0.3em] text-[#4A90E2]">Vista previa</p>
        <h1 className="font-heading text-4xl text-[#111111]">Tu panel diario, sin ruido.</h1>
        <p className="max-w-3xl text-lg text-[#2B2B2B]/80">
          Diseñado para tomar decisiones rápidas: genera tu plan diario, marca adherencia y sincroniza tu semana desde TrainingPeaks en un par de clics.
        </p>
      </header>

      <div className="rounded-[32px] border border-[#E5E5E5] bg-white p-10 shadow-2xl">
        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          <div className="space-y-8">
            <section className="rounded-3xl bg-[#111111] p-8 text-white shadow-lg">
              <h2 className="font-heading text-2xl">Plan diario en un vistazo</h2>
              <p className="mt-4 text-sm text-white/70">
                Lo que comes antes, durante y después de entrenar define tu recuperación. Aquí tienes todo tu día planificado con recomendaciones accionables.
              </p>
              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-white/10 p-4">
                  <div className="text-xs uppercase tracking-[0.3em] text-[#34D399]">Pre</div>
                  <p className="mt-2 text-sm text-white/80">Bebida isotónica + cafeína suave + carbo rápido.</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/10 p-4">
                  <div className="text-xs uppercase tracking-[0.3em] text-[#4A90E2]">Post</div>
                  <p className="mt-2 text-sm text-white/80">40g proteína whey + fruta alta en glucosa + sodio.</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/10 p-4">
                  <div className="text-xs uppercase tracking-[0.3em] text-white/70">Snack</div>
                  <p className="mt-2 text-sm text-white/80">Yogur proteico + frutos rojos + frutos secos.</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/10 p-4">
                  <div className="text-xs uppercase tracking-[0.3em] text-white/70">Cena</div>
                  <p className="mt-2 text-sm text-white/80">Pescado blanco, verduras verdes y caseína nocturna.</p>
                </div>
              </div>
            </section>

            <section>
              <h3 className="font-heading text-xl text-[#111111]">Inteligencia nutricional en tiempo real</h3>
              <p className="mt-3 text-sm text-[#2B2B2B]/70">
                Coocked AI evalúa tu adherencia y ajusta los próximos planes diarios. Así priorizamos mejor cada comida crítica según tu carga de entrenamiento.
              </p>
            </section>
          </div>

          <div className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-3">
              {highlights.map((item) => (
                <div key={item.title} className="rounded-3xl border border-[#E5E5E5] bg-[#F5F5F5] p-6">
                  <p className="text-xs uppercase tracking-[0.3em] text-[#8E8E8E]">{item.title}</p>
                  <div className="mt-4 font-metric text-3xl text-[#111111]">{item.metric}</div>
                  <p className="mt-4 text-sm text-[#2B2B2B]/70">{item.description}</p>
                </div>
              ))}
            </div>

            <div className="rounded-3xl border border-[#E5E5E5] bg-white p-6 shadow-md">
              <h3 className="font-heading text-xl text-[#111111]">Conecta TrainingPeaks</h3>
              <p className="mt-3 text-sm text-[#2B2B2B]/70">
                Importa tus sesiones planificadas y genera automáticamente la nutrición de cada día alrededor de esas cargas.
              </p>
              <Link
                href="/login"
                className="mt-4 inline-flex items-center justify-center rounded-xl bg-[#4A90E2] px-4 py-3 text-sm font-semibold text-white transition hover:scale-[1.02] hover:bg-[#3b7ac0]"
              >
                Entra en la demo
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
