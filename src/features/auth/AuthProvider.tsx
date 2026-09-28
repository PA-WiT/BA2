import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import type { Session, User } from '@supabase/supabase-js'
import { supabase } from '../../lib/supabase'

interface Profile {
  id: string
  display_name: string | null
  role: 'student' | 'admin'
}

interface AuthState {
  session: Session | null
  user: User | null
  profile: Profile | null
  loading: boolean
}

const AuthContext = createContext<AuthState>({ session: null, user: null, profile: null, loading: true })

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>({ session: null, user: null, profile: null, loading: true })

  useEffect(() => {
    let cancelled = false

    async function loadProfile(session: Session | null) {
      if (!session?.user) {
        if (!cancelled) setState({ session: null, user: null, profile: null, loading: false })
        return
      }
      const { data: profile } = await supabase
        .from('profiles')
        .select('id, display_name, role')
        .eq('id', session.user.id)
        .single()
      if (!cancelled) setState({ session, user: session.user, profile: profile ?? null, loading: false })
    }

    supabase.auth.getSession().then(({ data }) => loadProfile(data.session))
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => loadProfile(session))

    return () => {
      cancelled = true
      sub.subscription.unsubscribe()
    }
  }, [])

  return <AuthContext.Provider value={state}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)
