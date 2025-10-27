// placeholder/listo para conectar a backend real
export function useAuth() {
  // devolvemos usuario falso de momento
  return {
    user: {
      name: "Demo User",
      email: "demo@pdem.app"
    },
    isAuthenticated: true
  };
}
