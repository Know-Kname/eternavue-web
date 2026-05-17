import { createServerClient } from '@supabase/ssr'
import { createClient } from '@supabase/supabase-js'
import { cookies } from 'next/headers'
import { config } from './config'

// Browser-safe anon client (read-only operations from client components)
export function createBrowserClient() {
  return createClient(config.supabase.url, config.supabase.anonKey)
}

// Server Component client (uses cookies for auth context)
export async function createServerSupabaseClient() {
  const cookieStore = await cookies()
  return createServerClient(config.supabase.url, config.supabase.anonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll()
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options))
        } catch {
          // Cookies can't be set from Server Components — this is fine for read-only
        }
      },
    },
  })
}

// Service-role client for admin/cron operations (server-only)
export function createAdminClient() {
  if (!config.supabase.serviceRoleKey) {
    throw new Error('SUPABASE_SERVICE_ROLE_KEY is required for admin operations')
  }
  return createClient(config.supabase.url, config.supabase.serviceRoleKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  })
}
