"use client";

import { useState } from "react";

/**
 * Hook temporal que simula el estado de conexión con TrainingPeaks.
 * Más adelante:
 *  - Aquí guardaremos el access_token devuelto por OAuth TrainingPeaks.
 *  - Llamaremos a tu backend para sincronizar la planificación semanal real.
 */

export function useTrainingPeaksConnection() {
  // mock interno: inicialmente desconectado
  const [connected, setConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);

  function connect() {
    // En el futuro aquí redirigiremos al OAuth.
    // Por ahora simulamos una "conexión".
    setIsConnecting(true);

    // Simulación ligera tipo "éxito en 500ms"
    setTimeout(() => {
      setConnected(true);
      setIsConnecting(false);
    }, 500);
  }

  return {
    connected,
    isConnecting,
    connect
  };
}
