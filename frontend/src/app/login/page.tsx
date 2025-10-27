"use client";

import { useState } from "react";
import { FormField } from "@/components/ui/form-field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert } from "@/components/feedback/Alert";
import { Loader } from "@/components/feedback/Loader";
import { useLoginMutation } from "@/lib/api/useLoginMutation";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("demo@cooked.ai");
  const [password, setPassword] = useState("123456");

  const { login, isLoading, error } = useLoginMutation({
    onSuccess: () => {
      // si login ok -> vamos al dashboard interno
      router.push("/app");
    }
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    login({ email, password });
  }

  return (
    <section className="mx-auto max-w-sm space-y-8">
      <header className="space-y-2 text-center">
        <h1 className="text-2xl font-semibold leading-tight text-[var(--text-primary)]">
          Iniciar sesión
        </h1>
        <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
          Accede a tu panel. Usa el usuario demo para probar:
          <br />
          demo@cooked.ai / 123456
        </p>
      </header>

      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <Alert
            variant="error"
            title="No se pudo iniciar sesión"
            description={error.message}
          />
        )}

        <FormField id="email" label="Email">
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormField>

        <FormField id="password" label="Contraseña">
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormField>

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full h-11 text-base font-medium"
        >
          {isLoading ? (
            <>
              <Loader size="sm" className="mr-2" />
              Entrando...
            </>
          ) : (
            "Entrar"
          )}
        </Button>
      </form>

      <footer className="text-center text-xs text-[var(--text-secondary)] leading-relaxed">
        Al iniciar sesión aceptas los Términos y la Política de Privacidad.
      </footer>
    </section>
  );
}
