export default function ContactPage() {
  return (
    <section className="space-y-10 text-[#2B2B2B]">
      <header className="space-y-4 text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-[#4A90E2]">Contacto</p>
        <h1 className="font-heading text-4xl text-[#111111]">Estamos aquí para ayudarte.</h1>
        <p className="mx-auto max-w-2xl text-lg text-[#2B2B2B]/80">
          ¿Tienes dudas o quieres colaborar? Escríbenos a <a className="underline decoration-[#4A90E2] underline-offset-4" href="mailto:support@coocked.ai">support@coocked.ai</a> o únete a nuestra comunidad de atletas.
        </p>
      </header>

      <div className="rounded-[32px] border border-[#E5E5E5] bg-white p-10 shadow-xl">
        <div className="grid gap-8 md:grid-cols-2">
          <div className="space-y-5">
            <h2 className="font-heading text-2xl text-[#111111]">¿Cómo podemos sumar a tu entrenamiento?</h2>
            <p className="text-base text-[#2B2B2B]/70">
              Cuéntanos tus objetivos, la disciplina que practicas o si representas a un club o centro de alto rendimiento. Personalizamos la demo y preparamos recomendaciones específicas para tu equipo.
            </p>
            <p className="text-base text-[#2B2B2B]/70">
              También buscamos colaboradores que quieran aportar datos, validar protocolos de recuperación o explorar integraciones exclusivas.
            </p>
          </div>

          <form className="space-y-4">
            <div className="space-y-1">
              <label htmlFor="name" className="text-sm font-medium text-[#111111]">Nombre</label>
              <input
                id="name"
                className="w-full rounded-xl border border-[#E5E5E5] px-4 py-3 text-sm text-[#111111] focus:border-[#4A90E2] focus:outline-none focus:ring-2 focus:ring-[#4A90E2]/30"
                placeholder="Tu nombre"
              />
            </div>
            <div className="space-y-1">
              <label htmlFor="email" className="text-sm font-medium text-[#111111]">Email</label>
              <input
                id="email"
                type="email"
                className="w-full rounded-xl border border-[#E5E5E5] px-4 py-3 text-sm text-[#111111] focus:border-[#4A90E2] focus:outline-none focus:ring-2 focus:ring-[#4A90E2]/30"
                placeholder="tu@email.com"
              />
            </div>
            <div className="space-y-1">
              <label htmlFor="message" className="text-sm font-medium text-[#111111]">Mensaje</label>
              <textarea
                id="message"
                rows={4}
                className="w-full rounded-xl border border-[#E5E5E5] px-4 py-3 text-sm text-[#111111] focus:border-[#4A90E2] focus:outline-none focus:ring-2 focus:ring-[#4A90E2]/30"
                placeholder="Cuéntanos en qué podemos ayudarte"
              />
            </div>
            <button
              type="button"
              className="w-full rounded-xl bg-[#4A90E2] px-6 py-3 text-base font-semibold text-white shadow-lg transition hover:scale-[1.02] hover:bg-[#3b7ac0]"
            >
              Enviar mensaje
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
