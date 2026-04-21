import { createClient } from '@supabase/supabase-js';

// Accessing environment variables
const supabaseUrl = (import.meta as any).env?.VITE_SUPABASE_URL || (import.meta as any).env?.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = (import.meta as any).env?.VITE_SUPABASE_ANON_KEY || (import.meta as any).env?.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('⚠️ Supabase credentials not found in environment variables. Please configuring them in the Secrets menu.');
}

// Using fallback to prevent immediate crash, though auth will fail
export const supabase = createClient(
  supabaseUrl || 'https://missing-project.supabase.co',
  supabaseAnonKey || 'missing-key'
);
