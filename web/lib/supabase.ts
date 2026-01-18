import { createClient as createSupabaseClient } from "@supabase/supabase-js";

// Security: Use environment variables instead of hardcoded values
const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Validate at runtime - fail fast if misconfigured
if (!url || !key) {
  throw new Error(
    "[Security] Missing Supabase environment variables. " +
    "Ensure NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are set."
  );
}

let client: ReturnType<typeof createSupabaseClient> | undefined;

export function createClient() {
  if (client) return client;

  client = createSupabaseClient(url, key, {
    auth: {
      persistSession: true,
      storageKey: 'vasta-auth-token',
      storage: typeof window !== 'undefined' ? window.localStorage : undefined,
      detectSessionInUrl: false,
      flowType: 'pkce',
      autoRefreshToken: true,
    }
  });

  return client;
}
