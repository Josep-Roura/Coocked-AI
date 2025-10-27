"use client";

import { useEffect, useState, useCallback } from "react";

/**
 * Hook de sesión mock.
 * - Usa localStorage ("cookedai_auth" = "1") para persistir login.
 * - Expone { ready, isAuthenticated, login, logout }.
 *
 * Nota: `ready` indica "ya comprobé el entorno cliente".
 * Esto es útil para no redirigir demasiado pronto en SSR.
 */

function readInitialAuth(): boolean {
  if (typeof window === "undefined") {
    return false;
  }
  try {
    return window.localStorage.getItem("cookedai_auth") === "1";
  } catch {
    return false;
  }
}

export function useSession() {
  // hidratamos isAuthenticated directamente desde localStorage en primera renderización cliente
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    readInitialAuth
  );
  const [ready, setReady] = useState(false);

  // Marcamos que ya hemos evaluado en cliente
  useEffect(() => {
    // Este efecto ya no llama setIsAuthenticated() directamente
    // a menos que detectemos un desajuste raro.
    const currently = readInitialAuth();
    if (currently !== isAuthenticated) {
      setIsAuthenticated(currently);
    }
    setReady(true);
  }, [isAuthenticated]);

  const login = useCallback(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem("cookedai_auth", "1");
    }
    setIsAuthenticated(true);
  }, []);

  const logout = useCallback(() => {
    if (typeof window !== "undefined") {
      window.localStorage.removeItem("cookedai_auth");
    }
    setIsAuthenticated(false);
  }, []);

  return {
    ready,
    isAuthenticated,
    login,
    logout
  };
}
