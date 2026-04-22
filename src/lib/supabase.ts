import { createClient, SupabaseClient } from '@supabase/supabase-js';

let supabaseInstance: SupabaseClient | null = null;

export const getSupabase = (): SupabaseClient => {
  if (supabaseInstance) return supabaseInstance;

  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey || supabaseUrl === "" || !supabaseUrl.startsWith('http') || supabaseUrl.includes("your-project")) {
    console.warn('Supabase credentials missing or invalid. Authentication and database features will not work until you set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in settings.');
    // Return a dummy client that will fail gracefully on calls rather than crashing the whole app on boot
    return createClient('https://placeholder-only-for-boot.supabase.co', 'placeholder-key');
  }

  try {
    supabaseInstance = createClient(supabaseUrl, supabaseAnonKey);
    return supabaseInstance;
  } catch (error) {
    console.error('Failed to initialize Supabase client:', error);
    return createClient('https://placeholder-only-for-boot.supabase.co', 'placeholder-key');
  }
};

export const supabase = getSupabase();
