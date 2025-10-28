/**
 * Hook que mantiene sincronizada la sesión de Supabase en el store global.
 * Escucha cambios de autenticación y recupera el perfil del usuario.
 */
import { useEffect, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "../lib/supabaseClient";
import { useAuthStore, type UserProfile } from "../store/authStore";

export function useAuthSession() {
  const { setSession, setProfile, session, user } = useAuthStore();
  const [isLoadingSession, setIsLoadingSession] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function init() {
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        console.error("Error fetching session", error.message);
        if (isMounted) {
          setSession(null);
          setProfile(null);
          setIsLoadingSession(false);
        }
        return;
      }

      const currentSession = data.session ?? null;
      if (isMounted) {
        setSession(currentSession);
        setIsLoadingSession(false);
      }

      if (currentSession?.user && isMounted) {
        await hydrateProfile(currentSession, setProfile);
      }
    }

    init();

    const { data: authListener } = supabase.auth.onAuthStateChange(async (_event, newSession) => {
      setSession(newSession);
      if (newSession?.user) {
        await hydrateProfile(newSession, setProfile);
      } else {
        setProfile(null);
      }
    });

    return () => {
      isMounted = false;
      authListener.subscription.unsubscribe();
    };
  }, [setSession, setProfile]);

  return {
    isLoadingSession,
    session,
    user,
    userId: user?.id ?? null,
  } as const;
}

async function hydrateProfile(session: Session, setProfile: (profile: UserProfile | null) => void) {
  const { data, error } = await supabase
    .from("users")
    .select("id, email, name, language, two_factor_enabled")
    .eq("id", session.user.id)
    .maybeSingle();

  if (error) {
    console.error("Error loading user profile", error.message);
    setProfile(null);
    return;
  }

  if (data) {
    setProfile(data);
  }
}
