export default function LandingPage() {
  return (
    <section className="space-y-8">
      <div className="max-w-xl space-y-4">
        <h1 className="text-3xl font-semibold leading-tight text-[var(--text-primary)]">
          Bienvenido a Cooked-AI
        </h1>

        <p className="text-[var(--text-secondary)] text-base leading-relaxed">
          Explica en una frase clara qué problema resuelves y por qué eres
          diferente. Esto es lo primero que un cliente verá.
        </p>
      </div>

      <div
        id="features"
        className="grid gap-6 md:grid-cols-3"
      >
        <div className="rounded-lg border border-border bg-surface p-6 shadow-md">
          <h2 className="text-sm font-medium text-[var(--text-primary)]">
            Feature 1
          </h2>
          <p className="mt-2 text-sm text-[var(--text-secondary)]">
            Beneficio concreto que alguien pueda repetir en una demo.
          </p>
        </div>

        <div className="rounded-lg border border-border bg-surface p-6 shadow-md">
          <h2 className="text-sm font-medium text-[var(--text-primary)]">
            Feature 2
          </h2>
          <p className="mt-2 text-sm text-[var(--text-secondary)]">
            Qué haces que no hace la competencia.
          </p>
        </div>

        <div className="rounded-lg border border-border bg-surface p-6 shadow-md">
          <h2 className="text-sm font-medium text-[var(--text-primary)]">
            Feature 3
          </h2>
          <p className="mt-2 text-sm text-[var(--text-secondary)]">
            Qué gana el usuario en su día a día.
          </p>
        </div>
      </div>
    </section>
  );
}
