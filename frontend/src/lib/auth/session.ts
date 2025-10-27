"use client";

import { useState, useCallback } from "react";

/**
 * useSession
 *
 * - Lee el estado de autenticación desde localStorage ("cookedai_auth").
 * - Expone login() / logout() para actualizar estado.
 * - Expone ready para que la UI sepa si está en cliente.
 *
 * NOTA: evitamos useEffect con setState porque tu linter lo marca como error.
 */

function readAuthFromLocalStorage(): boolean {
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
  const isBrowser = typeof window !== "undefined";

  // estado inicial: si estamos en browser, leemos localStorage, si no false
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    isBrowser ? readAuthFromLocalStorage() : false
  );

  // ready = ya sabemos si hay window (estamos en el cliente)
  const ready = isBrowser;

  const login = useCallback(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem("cookedai_auth", "1");
      document.cookie = "cookedai_auth=1; path=/; SameSite=Lax";
    }
    setIsAuthenticated(true);
  }, []);

  const logout = useCallback(() => {
    if (typeof window !== "undefined") {
      window.localStorage.removeItem("cookedai_auth");
      document.cookie =
        "cookedai_auth=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax";
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
