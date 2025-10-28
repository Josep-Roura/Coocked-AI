/**
 * Página de ajustes básicos para mostrar información del perfil cargado.
 */
import { useAuthStore } from "../store/authStore";

export function SettingsPage() {
  const { profile, logout } = useAuthStore();

  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold text-foreground">Configuración</h1>
        <p className="text-sm text-muted-foreground">
          Gestiona tu perfil y cierra sesión cuando termines.
        </p>
      </header>

      <section className="rounded-2xl border border-border bg-card p-6 shadow-lg">
        <h2 className="text-lg font-semibold text-foreground">Perfil</h2>
        <dl className="mt-4 grid gap-3 text-sm">
          <div>
            <dt className="font-medium text-muted-foreground">Nombre</dt>
            <dd className="text-foreground">{profile?.name ?? "Sin nombre"}</dd>
          </div>
          <div>
            <dt className="font-medium text-muted-foreground">Email</dt>
            <dd className="text-foreground">{profile?.email ?? "Sin email"}</dd>
          </div>
          <div>
            <dt className="font-medium text-muted-foreground">Idioma</dt>
            <dd className="text-foreground">{profile?.language ?? "es"}</dd>
          </div>
        </dl>
        <button
          type="button"
          onClick={logout}
          className="mt-6 inline-flex items-center justify-center rounded-xl border border-destructive px-4 py-2 text-sm font-semibold text-destructive transition hover:scale-[1.02]"
        >
          Cerrar sesión
        </button>
      </section>
    </div>
  );
}
