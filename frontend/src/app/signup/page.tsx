"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [discipline, setDiscipline] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setTimeout(() => {
      router.push(`/login?prefill=${encodeURIComponent(email)}`);
    }, 600);
  };

  return (
    <section className="mx-auto max-w-2xl space-y-10 text-[#2B2B2B]">
      <header className="space-y-4 text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-[#4A90E2]">Comienza hoy</p>
        <h1 className="font-heading text-4xl text-[#111111]">Prueba la demo privada.</h1>
        <p className="text-lg text-[#2B2B2B]/80">
          Déjanos tu email y disciplina para priorizar tu acceso. Te escribiremos con la demo interactiva y recomendaciones personalizadas.
        </p>
      </header>

      <form onSubmit={handleSubmit} className="space-y-4 rounded-[32px] border border-[#E5E5E5] bg-white p-8 shadow-xl">
        <div className="space-y-1">
          <label htmlFor="signup-email" className="text-sm font-medium text-[#111111]">
            Email
          </label>
          <input
            id="signup-email"
            type="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="w-full rounded-xl border border-[#E5E5E5] px-4 py-3 text-sm text-[#111111] focus:border-[#4A90E2] focus:outline-none focus:ring-2 focus:ring-[#4A90E2]/30"
            placeholder="tu@email.com"
          />
        </div>

        <div className="space-y-1">
          <label htmlFor="discipline" className="text-sm font-medium text-[#111111]">
            Disciplina principal
          </label>
          <input
            id="discipline"
            value={discipline}
            onChange={(event) => setDiscipline(event.target.value)}
            className="w-full rounded-xl border border-[#E5E5E5] px-4 py-3 text-sm text-[#111111] focus:border-[#4A90E2] focus:outline-none focus:ring-2 focus:ring-[#4A90E2]/30"
            placeholder="Triatlón, crossfit, ciclismo, fuerza..."
          />
        </div>

        <Button
          type="submit"
          isLoading={loading}
          className="w-full rounded-xl bg-[#4A90E2] px-6 py-3 text-base font-semibold text-white shadow-lg transition hover:scale-[1.02] hover:bg-[#3b7ac0]"
        >
          Solicitar acceso
        </Button>
        <p className="text-center text-xs text-[#8E8E8E]">
          Te contactaremos en menos de 24h con los pasos para activar tu cuenta demo.
        </p>
      </form>
    </section>
  );
}
