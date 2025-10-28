/**
 * Supabase client inicializado con credenciales de entorno.
 * Este módulo debe usarse en todo el frontend para interactuar con Supabase.
 */
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    "Supabase environment variables are not defined. API calls will fail until VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are provided."
  );
}

export const supabase = createClient(supabaseUrl ?? "", supabaseAnonKey ?? "");
