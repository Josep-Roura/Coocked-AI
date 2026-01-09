/**
 * Estado global de autenticación gestionado con Zustand.
 * Guarda sesión Supabase, perfil y expone helpers para login/logout.
 */
import { create } from "zustand";
import type { Session, User } from "@supabase/supabase-js";
import { supabase } from "../lib/supabaseClient";

export type UserProfile = {
  id: string;
  email: string;
  name: string;
  language: string;
  two_factor_enabled: boolean;
  weight_kg?: number | null;
};

type AuthState = {
  session: Session | null;
  user: User | null;
  profile: UserProfile | null;
  setSession: (session: Session | null) => void;
  clearSession: () => void;
  setProfile: (profile: UserProfile | null) => void;
  logout: () => Promise<void>;
};

export const useAuthStore = create<AuthState>((set) => ({
  session: null,
  user: null,
  profile: null,
  setSession: (session) =>
    set(() => ({
      session,
      user: session?.user ?? null,
    })),
  clearSession: () =>
    set(() => ({
      session: null,
      user: null,
      profile: null,
    })),
  setProfile: (profile) => set(() => ({ profile })),
  logout: async () => {
    await supabase.auth.signOut();
    set(() => ({ session: null, user: null, profile: null }));
    window.location.replace("/login");
  },
}));
