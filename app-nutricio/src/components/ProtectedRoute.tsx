/**
 * Protege rutas comprobando la existencia de sesión en Supabase.
 */
import { Navigate } from "react-router-dom";
import { useAuthSession } from "../hooks/useAuthSession";

interface ProtectedRouteProps {
  children: React.ReactElement;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isLoadingSession, userId } = useAuthSession();

  if (isLoadingSession) {
    return (
      <div className="flex h-full w-full items-center justify-center text-sm text-muted-foreground">
        Comprobando sesión…
      </div>
    );
  }

  if (!userId) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
