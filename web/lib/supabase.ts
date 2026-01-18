import { createClient as createSupabaseClient } from "@supabase/supabase-js";

export function createClient() {
  const url = "https://pmecrhlmynkpptpjiuhx.supabase.co";
  const key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBtZWNyaGxteW5rcHB0cGppdWh4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg0NTMwMjYsImV4cCI6MjA4NDAyOTAyNn0._mRzOK8UX1y5wccNNucvztJtlT0c0cMirwhGWEJvlDs";

  return createSupabaseClient(url, key, {
    auth: {
      persistSession: true,
      storageKey: 'vasta-auth-token',
      storage: typeof window !== 'undefined' ? window.localStorage : undefined,
      detectSessionInUrl: false,
      flowType: 'pkce',
      autoRefreshToken: true,
    }
  });
}
