/**
 * Página de login conectada con Supabase Auth.
 * Incluye flujo correcto de autenticación sin redirecciones prematuras.
 */
import { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import { useAuthStore } from "../store/authStore";

export function LoginPage() {
  const navigate = useNavigate();
  const { setSession, setProfile, session } = useAuthStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (session) {
      navigate("/dashboard", { replace: true });
    }
  }, [session, navigate]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    if (!email || !password) {
      setError("Introduce email y contraseña");
      return;
    }

    setIsSubmitting(true);
    const { data, error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (signInError) {
      setError(signInError.message);
      setIsSubmitting(false);
      return;
    }

    if (!data.session) {
      setError("No se pudo iniciar sesión.");
      setIsSubmitting(false);
      return;
    }

    setSession(data.session);

    const { data: profile, error: profileError } = await supabase
      .from("users")
      .select("id, email, name, language, two_factor_enabled")
      .eq("id", data.session.user.id)
      .maybeSingle();

    if (profileError) {
      setError(profileError.message);
      setIsSubmitting(false);
      return;
    }

    if (profile) {
      setProfile(profile);
    }

    setIsSubmitting(false);
    navigate("/dashboard", { replace: true });
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-12">
      <div className="w-full max-w-sm rounded-2xl border border-border bg-card p-6 shadow-lg">
        <h1 className="text-xl font-semibold text-foreground">Bienvenido de nuevo</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Accede para ver tus planes diarios personalizados y registrar tu adherencia.
        </p>
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label htmlFor="email" className="text-sm font-medium text-foreground">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
              className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div>
            <label htmlFor="password" className="text-sm font-medium text-foreground">
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
              className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          {error ? <p className="text-sm text-destructive">{error}</p> : null}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-white transition hover:scale-[1.02] disabled:opacity-60"
          >
            {isSubmitting ? "Iniciando sesión…" : "Entrar"}
          </button>
        </form>
        <p className="mt-6 text-center text-xs text-muted-foreground">
          ¿Aún no tienes cuenta?{' '}
          <button
            type="button"
            onClick={() => navigate("/register")}
            className="font-medium text-primary underline"
          >
            Crear cuenta
          </button>
        </p>
      </div>
    </div>
  );
}
