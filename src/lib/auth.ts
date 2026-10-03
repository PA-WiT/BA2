import { supabase } from './supabase'

export const signUp = (email: string, password: string) => supabase.auth.signUp({ email, password })

export const signIn = (email: string, password: string) =>
  supabase.auth.signInWithPassword({ email, password })

export const signOut = () => supabase.auth.signOut()

export const updateEmail = (email: string) => supabase.auth.updateUser({ email })

export const updatePassword = (password: string) => supabase.auth.updateUser({ password })

export const resetPassword = (email: string) =>
  supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}${import.meta.env.BASE_URL}reset-password`,
  })
