import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { resetPassword, signIn, signUp } from '../../lib/auth'
import { useAuth } from './AuthProvider'
import styles from './auth.module.css'

export function LoginPage() {
  const { t } = useTranslation()
  const { user } = useAuth()
  const navigate = useNavigate()
  const [mode, setMode] = useState<'login' | 'signup' | 'forgot'>('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [info, setInfo] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)

  if (user) {
    navigate('/', { replace: true })
    return null
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError(null)
    setInfo(null)

    if (mode === 'signup' && password !== confirm) {
      setError(t('passwordsDontMatch'))
      return
    }

    if (mode === 'forgot') {
      setBusy(true)
      const { error: resetError } = await resetPassword(email)
      setBusy(false)
      // Supabase doesn't error for unknown emails, and neither do we, so this can't probe for accounts.
      if (resetError) setError(resetError.message)
      else setInfo(t('resetLinkSent'))
      return
    }

    setBusy(true)
    const { data, error: authError } =
      mode === 'login' ? await signIn(email, password) : await signUp(email, password)
    setBusy(false)

    if (authError) {
      // Show Supabase's actual message (e.g. "Email not confirmed", "User already registered") —
      // a generic message hides exactly what's failing and makes this impossible to diagnose.
      setError(authError.message)
      return
    }

    if (mode === 'signup' && !data.session) {
      // Project has "Confirm email" on: the account was created but isn't active yet.
      setInfo(t('accountCreatedCheckEmail'))
      return
    }

    navigate('/')
  }

  return (
    <div>
      <h1>{mode === 'login' ? t('login') : mode === 'signup' ? t('createAccount') : t('resetPassword')}</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label>
          {t('email')}
          <input
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        {mode !== 'forgot' && (
          <label>
            {t('password')}
            <input
              type="password"
              required
              minLength={6}
              autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
        )}
        {mode === 'signup' && (
          <label>
            {t('confirmPassword')}
            <input
              type="password"
              required
              autoComplete="new-password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
            />
          </label>
        )}
        {error && <p className={styles.error}>{error}</p>}
        {info && <p>{info}</p>}
        <button type="submit" className={styles.submit} disabled={busy}>
          {mode === 'login' ? t('login') : mode === 'signup' ? t('createAccount') : t('sendResetLink')}
        </button>
      </form>
      <div className={styles.links}>
        <button
          type="button"
          className={styles.switch}
          onClick={() => {
            setError(null)
            setInfo(null)
            setMode(mode === 'login' ? 'signup' : 'login')
          }}
        >
          {mode === 'login' ? t('needAccount') : mode === 'signup' ? t('haveAccount') : t('backToLogin')}
        </button>
        {mode === 'login' && (
          <button
            type="button"
            className={styles.switch}
            onClick={() => {
              setError(null)
              setInfo(null)
              setMode('forgot')
            }}
          >
            {t('forgotPassword')}
          </button>
        )}
      </div>
    </div>
  )
}
