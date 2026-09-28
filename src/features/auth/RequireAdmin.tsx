import type { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from './AuthProvider'

/** Wraps a route so only signed-in admins (profiles.role === 'admin') can reach it.
 *  There is no self-serve "become admin" UI — promoting a user is a manual SQL step
 *  (see the supabase-setup skill), which is intentional: it isn't a feature to expose. */
export function RequireAdmin({ children }: { children: ReactNode }) {
  const { user, profile, loading } = useAuth()
  if (loading) return null
  if (!user || profile?.role !== 'admin') return <Navigate to="/" replace />
  return <>{children}</>
}
